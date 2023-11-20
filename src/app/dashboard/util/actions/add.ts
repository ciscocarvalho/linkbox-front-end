import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { getItemID, getItemType } from "../../util";
import { DashboardFolder, DashboardItemCandidate } from "../../types";

export const add = async (folder: DashboardFolder, item: DashboardItemCandidate) => {
  const folderID = getItemID(folder);
  const { path: folderPath } = await fetchJsonPayload("get", `/path/${folderID}`);

  if (!folderPath) {
    return;
  }

  const itemType = getItemType(item);
  const route = `/${itemType === "folder" ? "folders" : "links"}/${folderPath}`;
  return await fetchJsonPayload("post", route, item);
};
