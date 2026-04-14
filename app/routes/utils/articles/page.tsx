import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { css } from "styled-system/css";
import { ButtonLike } from "~/components/button-like";
import { H1 } from "~/components/heading";
import {
	OPEN_REPO_COMMAND,
	type WorkerRequest,
	type WorkerResponse,
} from "./common";
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
	const [error, setError] = useState<string | null>(null);

	const handleMessage = useCallback(
		(e: MessageEvent<WorkerResponse>) => {},
		[],
	);

	const sendMessage = useCallback((message: WorkerRequest) => {
		if (!workerRef.current) return;
		workerRef.current.postMessage(message);
	}, []);

	useEffect(() => {
		// SSR では Worker を使用できないため、クライアントサイドでのみ Worker を作成
		workerRef.current = new ArticleWorker();
		workerRef.current.addEventListener("message", handleMessage);
		workerRef.current.addEventListener("error", (e) => {
			setError(e.message);
		});
		workerRef.current.addEventListener("messageerror", () => {
			setError("Worker からのメッセージの解析に失敗しました");
		});

		setStatus(1);
		setError(null);

		return () => {
			workerRef.current?.terminate();
			workerRef.current = null;
			setError("Worker が終了しました、ページを再読み込みしてください。");
			setStatus(0);
		};
	}, [handleMessage]);

	const handleOpenRepo = () => {
		setError("foo");
		// sendMessage({ type: OPEN_REPO_COMMAND });
	};

	return (
		<>
			<H1>記事作成支援ツール</H1>
			{!error && status === 0 && (
				<StatusText>Worker を読み込んでいます...</StatusText>
			)}
			{!error && status === 1 && (
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
