export const baseUrl: string = process.env.REACT_APP_BACKEND_BASE_URL ?? "http://localhost:4000";
export const apiVersion = process.env.REACT_APP_BACKEND_VERSION ?? "v1";

export const versionedBaseUrl = `${baseUrl}/${apiVersion}`;
