import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getFolderByPath = async (path: string) => {
  const { data: { id: folderID } } = await fetchJsonPayload("get", `/id/default/${path}`);
  const { data: { item: folder } } = await fetchJsonPayload("get", `/item/default/${folderID}`);
  return folder;
};
