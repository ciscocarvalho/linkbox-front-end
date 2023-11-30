import fetchJsonPayload from "../../../../Services/fetchJsonPayload";

export const move = async (
  itemID: string,
  targetFolderID: string,
) => {
  await fetchJsonPayload("post", `/move/default/${itemID}`, { parentId: targetFolderID });
}
