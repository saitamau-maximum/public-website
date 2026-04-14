export const OPEN_REPO_COMMAND = "openRepo" as const;

interface OpenRepoRequest {
	type: typeof OPEN_REPO_COMMAND;
}

export type WorkerRequest = OpenRepoRequest;

export type WorkerResponse = unknown;
