import { type ReactNode, useEffect, useRef, useState } from "react";
import { css } from "styled-system/css";
import { ButtonLike } from "~/components/button-like";
import { H1 } from "~/components/heading";
import { UnorderedList } from "~/components/unordered-list";

const STATUS_CHECKING = 0 as const;
const STATUS_OPEN_REPO = 1 as const;
const STATUS_ON_MAIN_BRANCH = 2 as const;
const STATUS_READY = 3 as const;

type StatusNumber =
	| typeof STATUS_CHECKING
	| typeof STATUS_OPEN_REPO
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

export default function UtilsArticles() {
	const [status, setStatus] = useState<StatusNumber>(STATUS_CHECKING);
	const [error, setError] = useState<string | null>(null);
	const [supported, setSupported] = useState<boolean>(true);

	const directoryHandler = useRef<FileSystemDirectoryHandle>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		// ここで使う機能がブラウザでサポートされているかのチェック
		let res = true;
		if (!("showDirectoryPicker" in window)) res = false;

		setSupported(res);
		setStatus(res ? STATUS_OPEN_REPO : STATUS_CHECKING);
	}, []);

	const handleOpenRepo = async () => {
		// mounted かつサポートチェック済みである前提
		try {
			directoryHandler.current = await window.showDirectoryPicker();
		} catch {
			setError("ディレクトリの選択がキャンセルされました。");
		}
	};

	return (
		<>
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
