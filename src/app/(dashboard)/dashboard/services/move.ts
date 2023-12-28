import fetchData from "../../../../services/fetchData";

export const move = async (itemID: string, targetFolderID: string) => {
  await fetchData("post", `/move/default/${itemID}`, {
    parentId: targetFolderID,
  });
};
