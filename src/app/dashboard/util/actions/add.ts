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
  let route;

  if (itemType === "folder") {
    route = `/folders/${folderPath}`;
  } else {
    route = `/links/default/${folderID}`;
  }

  return await fetchJsonPayload("post", route, item);
};
