self.onmessage = (e) => {
	console.log("Worker: メッセージを受信しました", e.data);

	// 重い処理のシミュレーション
	const result = e.data * 2;

	self.postMessage(result);
};
