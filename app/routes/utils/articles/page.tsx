import { type ReactNode, useState } from "react";
import { css } from "styled-system/css";
import { ButtonLike } from "~/components/button-like";
import { H1 } from "~/components/heading";

type StatusNumber =
	// public-website リポジトリを開いてない
	| 0
	// main ブランチにいる
	| 1
	// 記事を書ける状態
	| 2;

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

export default function UtilsArticles() {
	const [status, setStatus] = useState<StatusNumber>(0);
	const [error, setError] = useState<string | null>(null);

	const handleOpenRepo = async () => {
		if (typeof window === "undefined") return;
		if (!("showDirectoryPicker" in window)) {
			setError(
				"このブラウザは showDirectoryPicker API をサポートしていません。 最新版の Chrome で試してください。",
			);
			return;
		}
		await window.showDirectoryPicker();
	};

	return (
		<>
			<H1>記事作成支援ツール</H1>
			{!error && status === 0 && (
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
					<StatusText>エラーが発生しました</StatusText>
					<p>{error}</p>
					<p className={css({ fontSize: "sm" })}>
						ページを再読み込みして、もう一度お試しください。
						頻発する場合には、再現手順とともに public-website リポジトリの Issue
						に報告してください。
					</p>
				</div>
			)}
		</>
	);
}
