import { valibotResolver } from "@hookform/resolvers/valibot";
import { parseMarkdownToHTML } from "@saitamau-maximum/markdown-processor/server";
import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import {
	Code,
	Eye,
	File,
	Folder,
	GitBranch,
	Image,
	Plus,
	RefreshCw,
	Save,
} from "react-feather";
import { useForm } from "react-hook-form";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { css, cx } from "styled-system/css";
import { unified } from "unified";
import * as v from "valibot";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import { ArticleCard } from "~/components/article-card";
import { ArticleHeader } from "~/components/article-header";
import { ButtonLike } from "~/components/button-like";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3, H4 } from "~/components/heading";
import { UnorderedList } from "~/components/unordered-list";
import { newsArticleFrontmatterSchema } from "~/utils/articles";
import { ErrorBox } from "./internal/components/error-box";
import { SimpleCodeBlock } from "./internal/components/simple-code-block";
import { StatusText } from "./internal/components/status-text";
import { useDebounce } from "./internal/hooks/use-debounce";

const STATUS_CHECKING = 0 as const;
const STATUS_OPEN_REPO = 1 as const;
const STATUS_REPO_OPENED = 2 as const;
const STATUS_ON_MAIN_BRANCH = 3 as const;
const STATUS_READY = 4 as const;

type StatusNumber =
	| typeof STATUS_CHECKING
	| typeof STATUS_OPEN_REPO
	| typeof STATUS_REPO_OPENED
	| typeof STATUS_ON_MAIN_BRANCH
	| typeof STATUS_READY;

const InputContainerBaseStyle = css({
	display: "flex",
	gap: 2,
	flexWrap: "wrap",
	alignItems: "center",
});

const InputBaseStyle = css({
	borderColor: "gray.300",
	borderWidth: 1,
	borderStyle: "solid",
	borderRadius: 4,
	padding: 2,
	maxWidth: "full",
});

const TextWithIconStyle = css({
	display: "flex",
	alignItems: "center",
	gap: 1,
});

const parseFrontmatter = (content: string) => {
	try {
		const vfile = new VFile(content);
		matter(vfile);
		const { matter: data } = vfile.data;

		return v.safeParse(newsArticleFrontmatterSchema, data);
	} catch {
		return {
			success: false,
			output: null,
			issues: [],
		};
	}
};

const md2html = async (markdown: string) => {
	const vfile = new VFile(markdown);
	matter(vfile, { strip: true }); // frontmatter 部分を取り除く
	const content = String(vfile.value);
	const { content: html } = await parseMarkdownToHTML(content);
	return html;
};

const FormSchema = v.object({
	year: v.pipe(v.string(), v.regex(/^\d{4}$/, "年の形式がおかしいです")), // 4 桁の数字
	slug: v.pipe(
		v.string(),
		v.nonEmpty("slug は必須です"),
		v.regex(
			/^[a-z0-9-]+$/,
			"slug は英数小文字とハイフンのみ含めることができます",
		),
	), // 小文字の英数字とハイフンのみ
	content: v.pipe(
		v.string(),
		v.nonEmpty("記事の内容が入力されていません"),
		v.rawCheck(({ addIssue, dataset }) => {
			if (!dataset.typed) return;

			// frontmatter check
			const { issues } = parseFrontmatter(dataset.value);
			if (issues && issues.length > 0) {
				for (const issue of issues) {
					addIssue({
						input: issue.input,
						message: `frontmatter.${issue.path?.at(0)?.key}: ${issue.message}`,
					});
				}
			}
		}),
	),
});

export default function UtilsArticles() {
	const [status, setStatus] = useState<StatusNumber>(STATUS_CHECKING);
	const [error, setError] = useState<string | null>(null);
	const [supported, setSupported] = useState<boolean>(true);
	const [currentBranch, setCurrentBranch] = useState<string>("");
	const [articleContent, setArticleContent] = useState<ReactNode>(<Fragment />);
	const [articleAssets, setArticleAssets] = useState<Record<string, string>>(
		{},
	); // ファイル名 -> object URL

	const directoryHandler = useRef<FileSystemDirectoryHandle>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		// ここで使う機能がブラウザでサポートされているかのチェック
		let res = true;
		if (!("showDirectoryPicker" in window)) res = false;

		setSupported(res);
		setStatus(res ? STATUS_OPEN_REPO : STATUS_CHECKING);
	}, []);

	const {
		register,
		watch,
		setValue,
		trigger,
		formState: { errors: formErrors, isValid: isFormValid },
	} = useForm({
		resolver: valibotResolver(FormSchema),
		defaultValues: {
			year: new Date().getFullYear().toString(),
			slug: "",
			content: "",
		},
		mode: "all",
	});

	const year = watch("year");
	const slug = watch("slug");
	const content = watch("content");

	// 多少負荷を軽減するために、 content の更新が止まってから 500ms 後に frontmatter のパースと Markdown -> HTML の処理をする
	const debouncedContent = useDebounce(content, 500);
	const frontmatterRes = parseFrontmatter(debouncedContent);
	const frontmatter = frontmatterRes.success ? frontmatterRes.output : null;

	// 各ボタンの状態をリセットするために、初期状態でも trigger しておく
	// ex: 初期状態だと slug が空だが、 Open/Create が推せるようになってしまうので
	useEffect(() => {
		if (status === STATUS_READY) trigger();
	}, [trigger, status]);

	useEffect(() => {
		setArticleContent(<p>Loading...</p>);

		const fn = async () => {
			let html = await md2html(debouncedContent);

			// img タグの src を object URL に置き換える
			const parser = new DOMParser().parseFromString(html, "text/html");
			const imgElements = parser.querySelectorAll("img");
			imgElements.forEach((img) => {
				const src = img.getAttribute("src")?.split("/").slice(-1)[0];
				const lastDotIndex = src?.lastIndexOf(".");
				const name = lastDotIndex === -1 ? src : src?.slice(0, lastDotIndex);
				if (name && articleAssets[name]) {
					img.setAttribute("src", articleAssets[name]);
				}
			});
			html = parser.body.innerHTML;

			const articleElem = await unified()
				.use(rehypeParse, { fragment: true })
				.use(rehypeReact, {
					Fragment,
					jsx,
					jsxs,
					components: {
						h2: H2,
						h3: H3,
						h4: H4,
						a: ExternalLink,
					},
				})
				.process(html);

			setArticleContent(articleElem.result);
		};

		void fn();
	}, [debouncedContent, articleAssets]);

	const refreshArticleAssets = async () => {
		if (!directoryHandler.current) return;
		// object url を revoke する
		for (const url of Object.values(articleAssets)) URL.revokeObjectURL(url);

		const docsDirHandler =
			await directoryHandler.current.getDirectoryHandle("docs");
		const newsDirHandler = await docsDirHandler.getDirectoryHandle("news");
		const yearDirHandler = await newsDirHandler.getDirectoryHandle(year);
		const articleDirHandler = await yearDirHandler.getDirectoryHandle(slug);

		for await (const entry of articleDirHandler.values()) {
			if (entry.kind === "file") {
				const file = await entry.getFile();
				// 画像のみ対象
				if (file.type.startsWith("image/")) {
					const lastDotIndex = file.name.lastIndexOf(".");
					const name =
						lastDotIndex === -1 ? file.name : file.name.slice(0, lastDotIndex);
					const url = URL.createObjectURL(file);
					setArticleAssets((prev) => ({ ...prev, [name]: url }));
				}
			}
		}
	};

	const handleRefreshBranch = async () => {
		setError(null);
		if (!directoryHandler.current) return;

		try {
			// main ブランチにいるかチェック
			const headFile = await directoryHandler.current
				.getDirectoryHandle(".git")
				.then((gitDir) => gitDir.getFileHandle("HEAD"))
				.then((fileHandle) => fileHandle.getFile());
			const headText = await headFile.text();
			if (headText.includes("ref: refs/heads/main"))
				setStatus(STATUS_ON_MAIN_BRANCH);
			else setStatus(STATUS_READY);
			setCurrentBranch(headText.replace("ref: refs/heads/", "").trim());
		} catch {
			setError("リポジトリの HEAD 情報の取得に失敗しました。");
			setStatus(STATUS_OPEN_REPO);
		}
	};

	const handleOpenRepo = async () => {
		setError(null);

		// mounted かつサポートチェック済みである前提
		try {
			directoryHandler.current = await window.showDirectoryPicker({
				id: "public-website-repo-picker",
				mode: "readwrite",
			});
			setStatus(STATUS_REPO_OPENED);
		} catch {
			setError("ディレクトリの選択がキャンセルされました。");
			return;
		}

		// 型ガードとしての二重チェック
		if (!directoryHandler.current) return;

		// 選択されたディレクトリが public-website リポジトリのルートであるかのチェック
		let isPublicWebsiteRepo = true;
		try {
			const gitDirHandler =
				await directoryHandler.current.getDirectoryHandle(".git");

			// .git/config に saitamau-maximum/public-website がリモートとして登録されているかのチェック
			const gitConfigFile = await gitDirHandler
				.getFileHandle("config")
				.then((fileHandle) => fileHandle.getFile());
			const gitConfigText = await gitConfigFile.text();

			if (!gitConfigText.includes("saitamau-maximum/public-website"))
				isPublicWebsiteRepo = false;
		} catch {
			// .git ディレクトリがない OR .git/config ファイルがない
			isPublicWebsiteRepo = false;
		}

		// docs/news ディレクトリがあるかのチェック
		try {
			const docsDirHandler =
				await directoryHandler.current.getDirectoryHandle("docs");
			await docsDirHandler.getDirectoryHandle("news");
		} catch {
			isPublicWebsiteRepo = false;
		}

		if (!isPublicWebsiteRepo) {
			setError(
				"選択されたディレクトリは public-website リポジトリのルートではありません。",
			);
			// もう一度選択させる
			setStatus(STATUS_OPEN_REPO);
			return;
		}

		await handleRefreshBranch();
	};

	const handleOpenFile = async () => {
		setError(null);
		if (!directoryHandler.current) return;

		const docsDirHandler =
			await directoryHandler.current.getDirectoryHandle("docs");
		const newsDirHandler = await docsDirHandler.getDirectoryHandle("news");

		let yearDirHandler: FileSystemDirectoryHandle | null = null;
		let articleDirHandler: FileSystemDirectoryHandle | null = null;

		// 年ディレクトリがなければ作成
		try {
			yearDirHandler = await newsDirHandler.getDirectoryHandle(year, {
				create: true,
			});
		} catch {
			setError("年ディレクトリの作成に失敗しました。");
			return;
		}

		// 記事ディレクトリがなければ作成
		try {
			articleDirHandler = await yearDirHandler.getDirectoryHandle(slug, {
				create: true,
			});
		} catch {
			setError("記事ディレクトリの作成に失敗しました。");
			return;
		}

		// もしすでに index.md があれば内容を読み込む
		try {
			const fileHandle = await articleDirHandler.getFileHandle("index.md");
			const file = await fileHandle.getFile();
			const text = await file.text();
			await refreshArticleAssets();
			// content にセットするのは assets を読み込んでから
			// 画像が読み込まれないので
			setValue("content", text, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
		} catch {
			// ファイルがない場合は新規作成する想定なのでエラーは無視
			const formatedDate = new Date().toISOString().split("T")[0];
			setValue(
				"content",
				`---
title: 記事のタイトル
createdAt: ${formatedDate}
updatedAt: ${formatedDate}
description: 記事の説明
image: photo-thumb.avif
---
`.trimStart(),
				{ shouldValidate: true, shouldDirty: true, shouldTouch: true },
			);
		}
	};

	const handleSaveFile = async () => {
		setError(null);
		if (!directoryHandler.current) return;

		const docsDirHandler =
			await directoryHandler.current.getDirectoryHandle("docs");
		const newsDirHandler = await docsDirHandler.getDirectoryHandle("news");

		let yearDirHandler: FileSystemDirectoryHandle | null = null;
		let articleDirHandler: FileSystemDirectoryHandle | null = null;

		try {
			yearDirHandler = await newsDirHandler.getDirectoryHandle(year);
			articleDirHandler = await yearDirHandler.getDirectoryHandle(slug);
		} catch {
			setError(
				"年ディレクトリまたは記事ディレクトリが見つかりません。 Create ボタンは押しましたか？",
			);
			return;
		}

		const fileHandle = await articleDirHandler.getFileHandle("index.md", {
			create: true,
		});
		const file = await fileHandle.createWritable();
		try {
			await file.write(content);
			await file.close();
		} catch {
			setError("ファイルの保存に失敗しました。");
			return;
		}
	};

	const handleSaveAsset = async () => {
		if (!directoryHandler.current) return;

		// ファイル選択画面
		const fileHandles = await window.showOpenFilePicker({
			id: "asset-file-picker",
			types: [
				{
					description: "Image files",
					accept: {
						"image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"],
					},
				},
			],
			multiple: true,
			excludeAcceptAllOption: true,
		});

		// 選択されたファイルを記事のディレクトリにコピー
		const docsDirHandler =
			await directoryHandler.current.getDirectoryHandle("docs");
		const newsDirHandler = await docsDirHandler.getDirectoryHandle("news");
		const yearDirHandler = await newsDirHandler.getDirectoryHandle(year);
		const articleDirHandler = await yearDirHandler.getDirectoryHandle(slug);

		for (const fileHandle of fileHandles) {
			const file = await fileHandle.getFile();
			await articleDirHandler
				.getFileHandle(file.name, { create: true })
				.then((handle) => handle.createWritable())
				.then((writable) => writable.write(file).then(() => writable.close()));
		}

		await refreshArticleAssets();
	};

	return (
		<>
			<title>記事作成支援ツール </title>
			<H1>記事作成支援ツール</H1>
			{status === STATUS_CHECKING &&
				(supported ? (
					<StatusText>ブラウザの互換性を確認中...</StatusText>
				) : (
					<ErrorBox>
						<StatusText>このブラウザはサポートされていません</StatusText>
						<p>
							このツールは、以下の API をサポートするブラウザでのみ動作します。
						</p>
						<UnorderedList>
							<li>File System Access API (showDirectoryPicker)</li>
						</UnorderedList>
						<p>
							caniuse.com などでブラウザの対応状況を確認してください。 最新版の
							Chrome での利用を推奨します。
						</p>
					</ErrorBox>
				))}
			{status === STATUS_OPEN_REPO && (
				<>
					<StatusText>public-website リポジトリを開いてください</StatusText>
					<p>
						もしまだ public-website
						リポジトリをクローンしてない場合は、以下のコマンドでクローンしてください。
					</p>
					<SimpleCodeBlock code="git clone https://github.com/saitamau-maximum/public-website.git" />
					<p>
						<button type="button" onClick={handleOpenRepo}>
							<ButtonLike>public-website リポジトリを開く</ButtonLike>
						</button>
					</p>
				</>
			)}
			{status === STATUS_REPO_OPENED && (
				<StatusText>
					リポジトリが開かれました。 内容を確認しています...
				</StatusText>
			)}
			{status === STATUS_ON_MAIN_BRANCH && (
				<>
					<StatusText>main ブランチが開かれています</StatusText>
					<p>
						main ブランチが開かれています。 記事の作成や編集を行う前に、 main
						ブランチから新しいブランチを切ってください。
					</p>
					<SimpleCodeBlock code="git checkout -b docs/new-branch-name" />
					<p className={css({ fontSize: "sm" })}>
						「docs/new-branch-name」の部分は任意のブランチ名に置き換えてください。
					</p>
				</>
			)}
			{status === STATUS_READY && (
				<>
					<StatusText>準備完了！ 記事の作成や編集ができます</StatusText>
					<p>自動保存機能はありません。 適宜保存してね</p>
					<div
						className={css({
							display: "flex",
							flexDirection: "column",
							flexWrap: "nowrap",
							gap: 6,
							width: "full",
							padding: 4,
						})}
					>
						<div className={cx(InputContainerBaseStyle, css({ gap: 2 }))}>
							<Folder />
							<select
								className={cx(InputBaseStyle, css({ width: "auto" }))}
								{...register("year")}
							>
								{
									// 2024 年から今年までの年を選択肢として表示
									new Array(new Date().getFullYear() - 2024 + 1)
										.fill(0)
										.map((_, i) => {
											const year = new Date().getFullYear() - i;
											return (
												<option key={year} value={year.toString()}>
													{year}
												</option>
											);
										})
								}
							</select>
							{" / "}
							<input
								className={cx(InputBaseStyle, css({ flexGrow: 1 }))}
								placeholder="記事のスラッグ (例: my-new-article)"
								{...register("slug")}
							/>
							<button
								type="button"
								onClick={handleOpenFile}
								className={TextWithIconStyle}
								disabled={!!formErrors.year || !!formErrors.slug}
							>
								<ButtonLike disabled={!!formErrors.year || !!formErrors.slug}>
									<File />
									Open / Create
								</ButtonLike>
							</button>
							<button
								type="button"
								onClick={handleSaveFile}
								className={TextWithIconStyle}
								disabled={!isFormValid}
							>
								<ButtonLike disabled={!isFormValid}>
									<Save />
									Save
								</ButtonLike>
							</button>
						</div>
						<div className={InputContainerBaseStyle}>
							<GitBranch />
							{currentBranch}
							<button
								type="button"
								onClick={handleRefreshBranch}
								className={css({ cursor: "pointer", marginLeft: 4 })}
							>
								<RefreshCw />
							</button>
						</div>
						<div className={InputContainerBaseStyle}>
							<span className={TextWithIconStyle}>
								<Image />
								<strong>Assets</strong>
							</span>
							<ul
								className={css({ display: "flex", gap: 4, flexWrap: "wrap" })}
							>
								{Object.entries(articleAssets).map(([name, url]) => (
									<li
										key={name}
										className={css({
											display: "flex",
											flexDirection: "column",
											gap: 1,
											alignItems: "center",
										})}
									>
										<img
											src={url}
											alt={name}
											className={css({
												objectFit: "contain",
												width: "64px",
												height: "64px",
											})}
										/>
										{name}
									</li>
								))}
								<li>
									<button
										type="button"
										className={css({ height: "full" })}
										onClick={handleSaveAsset}
										disabled={!!formErrors.year || !!formErrors.slug}
									>
										<ButtonLike
											variant="secondary"
											disabled={!!formErrors.year || !!formErrors.slug}
										>
											<Plus />
										</ButtonLike>
									</button>
								</li>
							</ul>
						</div>
						<div className={css({ width: "full", display: "flex", gap: 4 })}>
							<div
								className={cx(
									InputContainerBaseStyle,
									css({
										flexGrow: 1,
										flexShrink: 1,
										flexBasis: 0,
										flexDirection: "column",
									}),
								)}
							>
								<span className={TextWithIconStyle}>
									<Code />
									<strong>Source Markdown</strong>
								</span>
								<textarea
									className={cx(
										InputBaseStyle,
										css({ width: "full", height: 96, fontFamily: "mono" }),
									)}
									{...register("content")}
								/>
							</div>
							<div
								className={cx(
									InputContainerBaseStyle,
									css({
										flexGrow: 1,
										flexShrink: 1,
										flexBasis: 0,
										flexDirection: "column",
									}),
								)}
							>
								<span className={TextWithIconStyle}>
									<Eye />
									<strong>Preview</strong>
								</span>
								<div
									className={css({
										width: "full",
										maxWidth: "full",
										height: 96,
										borderColor: "gray.300",
										borderWidth: 1,
										borderStyle: "solid",
										borderRadius: 4,
										padding: 2,
										overflowY: "auto",
									})}
								>
									{frontmatter ? (
										<>
											<ArticleHeader
												article={{ year, slug, content, ...frontmatter }}
											/>
											<article>{articleContent}</article>
											<ArticleCard
												article={{
													year,
													slug,
													content,
													...frontmatter,
													image:
														articleAssets[
															frontmatter.image
																?.split("/")[0]
																.replace("-thumb.avif", "") ?? ""
														] ?? frontmatter.image,
												}}
												path=""
											/>
										</>
									) : (
										<ErrorBox>
											<StatusText>frontmatter にエラーがあります</StatusText>
										</ErrorBox>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{error && (
				<ErrorBox>
					<StatusText>エラーが発生しました</StatusText>
					<p>{error}</p>
					<p className={css({ fontSize: "sm" })}>
						ページを再読み込みして、もう一度お試しください。
						頻発する場合には、再現手順とともに public-website リポジトリの Issue
						に報告してください。
					</p>
				</ErrorBox>
			)}
			{Object.entries(formErrors).length > 0 && (
				<ErrorBox>
					<StatusText>入力内容にエラーがあります</StatusText>
					<UnorderedList>
						{Object.entries(formErrors).map(([field, error]) => (
							<li key={field}>
								{field}: {error.message}
							</li>
						))}
					</UnorderedList>
				</ErrorBox>
			)}
		</>
	);
}
