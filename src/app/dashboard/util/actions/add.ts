import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { getItemID } from "../../util";
import { DashboardFolder, DashboardItemCandidate } from "../../types";

export const add = async (folder: DashboardFolder, item: DashboardItemCandidate) => {
  const folderID = getItemID(folder);
  return await fetchJsonPayload("post", `/item/default/${folderID}`, item);
};
