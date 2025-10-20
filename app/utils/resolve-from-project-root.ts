import { resolve } from "node:path";

export const resolveFromProjectRoot = (...paths: string[]) => {
	return resolve(import.meta.dirname, "..", "..", ...paths);
};
