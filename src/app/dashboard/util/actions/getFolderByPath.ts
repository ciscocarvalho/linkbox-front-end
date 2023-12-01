import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getFolderByPath = async (path: string) => {
  const payload = await fetchJsonPayload("get", `/foldersFromPaths/default/${path}`);
  return payload?.data ?? null;
};
