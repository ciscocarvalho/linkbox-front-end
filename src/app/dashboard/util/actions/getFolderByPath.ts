import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getFolderByPath = async (path: string) => {
  const { data: { id: folderID } } = await fetchJsonPayload("get", `/ids/default/${path}`);
  const { data: { item: folder } } = await fetchJsonPayload("get", `/items/default/${folderID}`);
  return folder;
};
