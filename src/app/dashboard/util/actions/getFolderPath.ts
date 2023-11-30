import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { DashboardFolder } from "../../types";
import { getItemID } from "../../util";

export const getFolderPath = async (folder: DashboardFolder) => {
  const folderID = getItemID(folder);
  const { data: { path } } = await fetchJsonPayload("get", `/paths/${folderID}`);
  return path;
}
