import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { DashboardFolder } from "../../types";
import { getItemID } from "../../util";

export const reposition = async (
  folder: DashboardFolder,
  currentIndex: number,
  newIndex: number,
  strategy: "before" | "after" = "after"
) => {
  const folderID = getItemID(folder);
  return await fetchJsonPayload("post", `/reposition/default/${folderID}`, {
    currentIndex,
    newIndex,
    strategy,
  });
};
