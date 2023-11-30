import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getFolderByPath = async (path: string) => {
  const payload = await fetchJsonPayload("get", `/folderIds/default/${path}`);
  return payload?.data ?? null;
};
