import { copyFile, mkdir, readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";
import sharp, { type AvifOptions, type ResizeOptions } from "sharp";

const rootDir = resolve(import.meta.dirname, "..");

const articlesDir = resolve(rootDir, "docs", "news");
const publicDir = resolve(rootDir, "public", "news");

const convertAvifIfImage = async (
	srcPath: string,
	destPath: string,
	resizeOption?: ResizeOptions,
	avifoption?: AvifOptions,
) => {
	// 画像ファイルの場合、 AVIF 画像を生成
	// sharp は JPEG, PNG, WebP, GIF, AVIF, TIFF and SVG images に対応
	// ref: https://sharp.pixelplumbing.com/, https://developer.mozilla.org/ja/docs/Web/Media/Guides/Formats/Image_types
	const imgExt = [
		".jpg",
		".jpeg",
		".jfif",
		".pjpeg",
		".pjp",
		".png",
		".webp",
		".gif",
		".tiff",
		".svg",
	];

	// 画像ファイルでない場合はスキップ
	if (!imgExt.some((ext) => srcPath.toLowerCase().endsWith(ext))) return;

	// sharp で変換
	await sharp(srcPath).resize(resizeOption).avif(avifoption).toFile(destPath);

	console.log(
		`[CONVERT] ${relative(rootDir, srcPath)} -> ${relative(rootDir, destPath)}`,
	);
};

const copyDirectoryDeep = async (src: string, dest: string) => {
	return readdir(src, { withFileTypes: true })
		.then((entries) =>
			Promise.all(
				entries.map(async (entry) => {
					const srcPath = resolve(src, entry.name);
					const destPath = resolve(dest, entry.name);
					if (entry.isDirectory()) {
						await mkdir(destPath, { recursive: true });
						await copyDirectoryDeep(srcPath, destPath);
						return;
					}
					// index.md はスキップ
					if (srcPath.includes("index.md")) {
						console.log(`[SKIP] ${relative(rootDir, srcPath)}`);
						return;
					}

					await Promise.all([
						(async () => {
							await copyFile(srcPath, destPath);
							console.log(`[COPY] ${relative(rootDir, srcPath)}`);
						})(),
						(async () => {
							// 末尾の .~~~ を .avif に置換
							const avifDestPath = destPath.replace(/\.[^/.]+$/, ".avif");
							// avif 生成
							await convertAvifIfImage(
								srcPath,
								avifDestPath,
								{ width: 1024 }, // 横幅は高々 1024px なのでそれで良い
								{ quality: 80, effort: 8 },
							);
							// サムネイル画像も生成
							const thumbDestPath = destPath.replace(
								/\.[^/.]+$/,
								"-thumb.avif",
							);
							await convertAvifIfImage(
								srcPath,
								thumbDestPath,
								// サムネイルは横幅 414px
								// ref: card root.tsx (width: md = 28rem = 448px, padding が左右あわせて 2rem = 32px)
								{ width: 414 },
								{ quality: 80, effort: 8 },
							);
						})(),
					]);
				}),
			),
		)
		.catch((err) => {
			console.error(`Error copying directory: ${err}`);
			throw err;
		});
};

const main = async () => {
	try {
		await copyDirectoryDeep(articlesDir, publicDir);
		console.log("Assets built successfully.");
	} catch (err) {
		console.error("Error building assets:", err);
	}
};

main();
