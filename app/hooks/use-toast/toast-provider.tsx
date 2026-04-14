import { type ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toast } from "~/components/toast";
import type { ToastItemProps } from "~/components/toast/toast-item";
import { ToastContext } from "./toast-context";

export type PushToastOptions = ToastItemProps & {
	timeout?: number;
};

type ToastItem = ToastItemProps & {
	id: string;
};

interface Props {
	children: ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
	const [items, setItems] = useState<ToastItem[]>([]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const pushToast = useCallback(
		({ timeout = 5000, ...options }: PushToastOptions) => {
			const id = crypto.randomUUID();
			setItems((prev) => [...prev, { ...options, id }]);
			setTimeout(() => {
				setItems((prev) => prev.filter((item) => item.id !== id));
			}, timeout);
		},
		[],
	);

	return (
		<>
			<ToastContext.Provider
				value={{
					pushToast,
				}}
			>
				{children}
			</ToastContext.Provider>
			{mounted &&
				typeof document !== "undefined" &&
				createPortal(
					<Toast.Stack>
						{items.map((item) => (
							<Toast.Item key={item.id} {...item} />
						))}
					</Toast.Stack>,
					document.body,
				)}
		</>
	);
};
