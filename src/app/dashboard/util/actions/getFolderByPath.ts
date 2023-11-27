import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const getFolderByPath = async (path: string) => {
  const { _id: folderID } = await fetchJsonPayload("get", `/id/default/${path}`);
  return await fetchJsonPayload("get", `/item/default/${folderID}`);
};
