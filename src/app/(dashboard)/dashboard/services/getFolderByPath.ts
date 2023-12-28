import fetchData from "../../../../services/fetchData";

export const getFolderByPath = async (path: string) => {
  const payload = await fetchData("get", `/foldersFromPaths/default/${path}`);
  return payload?.data ?? null;
};
