// ref: https://github.com/saitamau-maximum/id/blob/2596ba376ddd2363a4e09bfcbd8f96cd096b73e0/workspaces/client/app/root.tsx#L109

import { isRouteErrorResponse } from "react-router";

export function classifyError(error: unknown) {
	if (!isRouteErrorResponse(error)) {
		return undefined;
	}

	const status = error.status;

	if (status === 404) {
		return {
			status_code: status,
			error_title: "Not Found",
			error_message:
				"お探しのページは削除・移動した可能性があります。URLをご確認ください。",
		};
	}

	if (status === 400) {
		return {
			status_code: status,
			error_title: "Bad Request",
			error_message:
				"リクエストの内容に問題があります。入力内容をご確認ください。",
		};
	}

	if (status === 401) {
		return {
			status_code: status,
			error_title: "Unauthorized",
			error_message: "この操作を行うにはログインが必要です。",
		};
	}

	if (status === 403) {
		return {
			status_code: status,
			error_title: "Forbidden",
			error_message:
				"この操作を行う権限がありません。Adminにお問い合わせください。",
		};
	}

	if (status === 405) {
		return {
			status_code: status,
			error_title: "Method Not Allowed",
			error_message: "指定されたメソッドは許可されていません。",
		};
	}

	if (status === 409) {
		return {
			status_code: status,
			error_title: "Conflict",
			error_message: "リクエストが現在のリソースの状態と競合しています。",
		};
	}

	if (status === 422) {
		return {
			status_code: status,
			error_title: "Unprocessable Entity",
			error_message:
				"送信されたデータに問題があります。入力内容をご確認ください。",
		};
	}

	if (status === 429) {
		return {
			status_code: status,
			error_title: "Too Many Requests",
			error_message:
				"短時間に多くのリクエストが送信されました。しばらく待ってから再度お試しください。",
		};
	}

	if (status >= 400 && status < 500) {
		return {
			status_code: status,
			error_title: "Client Error",
			error_message:
				"リクエストに問題があります。しばらく待ってから再度お試しください。",
		};
	}

	if (status === 500) {
		return {
			status_code: status,
			error_title: "Internal Server Error",
			error_message:
				"サーバーで予期しないエラーが発生しました。しばらく待ってから再度お試しください。",
		};
	}

	if (status === 502) {
		return {
			status_code: status,
			error_title: "Bad Gateway",
			error_message:
				"サーバーへの接続に問題があります。しばらく待ってから再度お試しください。",
		};
	}

	if (status === 503) {
		return {
			status_code: status,
			error_title: "Service Unavailable",
			error_message:
				"現在サービスが利用できません。メンテナンス中の可能性があります。",
		};
	}

	if (status === 504) {
		return {
			status_code: status,
			error_title: "Gateway Timeout",
			error_message:
				"サーバーからの応答がタイムアウトしました。しばらく待ってから再度お試しください。",
		};
	}

	if (status >= 500) {
		return {
			status_code: status,
			error_title: "Server Error",
			error_message:
				"サーバーでエラーが発生しました。しばらく待ってから再度お試しください。",
		};
	}

	return {
		status_code: status,
		error_title: "Error",
		error_message: error.statusText || "予期しないエラーが発生しました。",
	};
}
