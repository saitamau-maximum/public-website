import { useEffect, useRef, useState } from "react";
import {
	Code,
	Eye,
	File,
	Folder,
	GitBranch,
	RefreshCw,
	Save,
} from "react-feather";
import { css, cx } from "styled-system/css";
import { ButtonLike } from "~/components/button-like";
import { H1 } from "~/components/heading";
import { UnorderedList } from "~/components/unordered-list";
import { ErrorBox } from "./internal/components/error-box";
import { SimpleCodeBlock } from "./internal/components/simple-code-block";
import { StatusText } from "./internal/components/status-text";

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

export default function UtilsArticles() {
	const [status, setStatus] = useState<StatusNumber>(STATUS_CHECKING);
	const [error, setError] = useState<string | null>(null);
	const [supported, setSupported] = useState<boolean>(true);

	const directoryHandler = useRef<FileSystemDirectoryHandle>(null);

	// 小規模なので react-hook-form などは使わずに自前で状態管理する
	const [yearDirname, setYearDirname] = useState<string>(
		new Date().getFullYear().toString(),
	);
	const [slug, setSlug] = useState<string>("");
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
			// 妥当かどうかチェック
			if (!/^\d{4}$/.test(yearDirname)) {
				setError("年は 4 桁の数字である必要があります。");
				return;
			}
			yearDirHandler = await newsDirHandler.getDirectoryHandle(yearDirname, {
				create: true,
			});
		} catch {
			setError("年ディレクトリの作成に失敗しました。");
			return;
		}

		// 記事ディレクトリがなければ作成
		try {
			// 妥当かどうかチェック
			if (!/^[a-z0-9-]+$/.test(slug)) {
				setError(
					"スラッグは小文字の英数字とハイフンのみである必要があります。",
				);
				return;
			}
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
			setContent(text);
		} catch {
			// ファイルがない場合は新規作成する想定なのでエラーは無視
			const formatedDate = new Date().toISOString().split("T")[0];
			setContent(
				`---
title: 記事のタイトル
createdAt: ${formatedDate}
updatedAt: ${formatedDate}
description: 記事の説明
image: photo-thumb.avif
---
`.trimStart(),
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
			yearDirHandler = await newsDirHandler.getDirectoryHandle(yearDirname);
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
								defaultValue={yearDirname}
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
							<button
								type="button"
								onClick={handleOpenFile}
								className={css({
									display: "flex",
									alignItems: "center",
									gap: 1,
								})}
							>
								<ButtonLike>
									<File />
									Open / Create
								</ButtonLike>
							</button>
							<button
								type="button"
								onClick={handleSaveFile}
								className={css({
									display: "flex",
									alignItems: "center",
									gap: 1,
								})}
							>
								<ButtonLike>
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
