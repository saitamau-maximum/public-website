import { type ReactNode, useEffect, useRef, useState } from "react";
import { css } from "styled-system/css";
import { H1 } from "~/components/heading";
import ArticleWorker from "./worker?worker";

type StatusNumber =
	// Worker がまだ読み込まれてない
	| 0
	// public-website リポジトリを開いてない
	| 1
	// main ブランチにいる
	| 2
	// 記事を書ける状態
	| 3;

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
	const workerRef = useRef<Worker | null>(null);
	const [status, setStatus] = useState<StatusNumber>(0);

	useEffect(() => {
		// SSR では Worker を使用できないため、クライアントサイドでのみ Worker を作成
		workerRef.current = new ArticleWorker();
		setStatus(1);

		return () => {
			workerRef.current?.terminate();
		};
	}, []);

	return (
		<>
			<H1>記事作成支援ツール</H1>
			{status === 0 && <StatusText>Worker を読み込んでいます...</StatusText>}
			{status === 1 && (
				<>
					<StatusText>public-website リポジトリを開いてください</StatusText>
					<p>
						もしまだ public-website
						リポジトリをクローンしてない場合は、以下のコマンドでクローンしてください。
					</p>
					<CodeBlock code="git clone https://github.com/saitamau-maximum/public-website.git" />
				</>
			)}
		</>
	);
}
