import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { getItemID } from "../../util";
import { DashboardFolder, DashboardItemCandidate } from "../../types";

export const add = async (folder: DashboardFolder, item: DashboardItemCandidate) => {
  const folderID = getItemID(folder);
  const { data: { item: addedItem } } = await fetchJsonPayload("post", `/items/default/${folderID}`, item);
  return addedItem;
};
