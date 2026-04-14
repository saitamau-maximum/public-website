import { type ReactNode, useEffect, useRef, useState } from "react";
import { Code, Edit3, Eye, Folder, GitBranch, RefreshCw } from "react-feather";
import { css, cx } from "styled-system/css";
import { ButtonLike } from "~/components/button-like";
import { H1 } from "~/components/heading";
import { UnorderedList } from "~/components/unordered-list";

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

const StatusText = ({ children }: { children: ReactNode }) => {
	return (
		<p
			className={css({
				fontSize: "lg",
				fontWeight: "bold",
			})}
		>
			{children}
		</p>
	);
};

const CodeBlock = ({ code }: { code: string }) => {
	return (
		<pre
			className={css({
				backgroundColor: "gray.100",
				borderColor: "gray.300",
				borderWidth: 1,
				borderStyle: "solid",
				padding: 4,
				borderRadius: 4,
				overflowX: "auto",
				userSelect: "all",
			})}
		>
			{code}
		</pre>
	);
};

const ErrorBox = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className={css({
				backgroundColor: "rose.50",
				color: "rose.700",
				padding: 4,
				borderRadius: 4,
				borderColor: "rose.300",
				borderWidth: 1,
				borderStyle: "solid",
			})}
		>
			{children}
		</div>
	);
};

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

export default function UtilsArticles() {
	const [status, setStatus] = useState<StatusNumber>(STATUS_CHECKING);
	const [error, setError] = useState<string | null>(null);
	const [supported, setSupported] = useState<boolean>(true);

	const directoryHandler = useRef<FileSystemDirectoryHandle>(null);

	// 小規模なので react-hook-form などは使わずに自前で状態管理する
	const [yearDirname, setYearDirname] = useState<string>("");
	const [slug, setSlug] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [currentBranch, setCurrentBranch] = useState<string>("");

	useEffect(() => {
		if (typeof window === "undefined") return;

		// ここで使う機能がブラウザでサポートされているかのチェック
		let res = true;
		if (!("showDirectoryPicker" in window)) res = false;

		setSupported(res);
		setStatus(res ? STATUS_OPEN_REPO : STATUS_CHECKING);
	}, []);

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
		let isPublicWebsiteRepo = false;

		try {
			const gitDirHandler =
				await directoryHandler.current.getDirectoryHandle(".git");

			// .git/config に saitamau-maximum/public-website がリモートとして登録されているかのチェック
			const gitConfigFile = await gitDirHandler
				.getFileHandle("config")
				.then((fileHandle) => fileHandle.getFile());
			const gitConfigText = await gitConfigFile.text();
			if (gitConfigText.includes("saitamau-maximum/public-website"))
				isPublicWebsiteRepo = true;
		} catch {
			// .git ディレクトリがない OR .git/config ファイルがない
		}

		if (!isPublicWebsiteRepo) {
			setError(
				"選択されたディレクトリは public-website リポジトリのルートではありません。",
			);
			// もう一度選択させる
			setStatus(STATUS_OPEN_REPO);
			return;
		}

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
					<CodeBlock code="git clone https://github.com/saitamau-maximum/public-website.git" />
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
					<CodeBlock code="git checkout -b docs/new-branch-name" />
					<p className={css({ fontSize: "sm" })}>
						「docs/new-branch-name」の部分は任意のブランチ名に置き換えてください。
					</p>
				</>
			)}
			{status === STATUS_READY && (
				<>
					<StatusText>準備完了！ 記事の作成や編集ができます</StatusText>
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
						<div className={InputContainerBaseStyle}>
							<Folder />
							<select
								className={cx(InputBaseStyle, css({ width: "auto" }))}
								value={yearDirname}
								onChange={(e) => setYearDirname(e.target.value)}
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
								value={slug}
								onChange={(e) => setSlug(e.target.value)}
							/>
						</div>
						<div className={InputContainerBaseStyle}>
							<GitBranch />
							{currentBranch}
							<RefreshCw />
						</div>
						<div
							className={cx(InputContainerBaseStyle, css({ width: "full" }))}
						>
							<Edit3 />
							<input
								className={cx(InputBaseStyle, css({ flexGrow: 1 }))}
								placeholder="記事のタイトル"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
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
								<span
									className={css({
										display: "inline-flex",
										alignItems: "center",
										gap: 1,
									})}
								>
									<Code />
									記事の内容 (Markdown)
								</span>
								<textarea
									className={cx(
										InputBaseStyle,
										css({ width: "full", height: 96 }),
									)}
									value={content}
									onChange={(e) => setContent(e.target.value)}
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
								<span
									className={css({
										display: "inline-flex",
										alignItems: "center",
										gap: 1,
									})}
								>
									<Eye />
									プレビュー
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
								></div>
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
		</>
	);
}
