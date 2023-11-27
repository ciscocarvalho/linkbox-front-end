import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { getItemID } from "../../util";
import { DashboardFolder, DashboardItem } from "../../types";

export const move = async (
  item: DashboardItem,
  targetFolder: DashboardFolder,
) => {
  const itemID = getItemID(item);
  const targetFolderID = getItemID(targetFolder);
  await fetchJsonPayload("post", `/move/default/${itemID}`, { parentId: targetFolderID });
}
