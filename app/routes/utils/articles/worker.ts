import type { WorkerRequest } from "./common";

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
	console.log("Worker: メッセージを受信しました", e.data);
};
