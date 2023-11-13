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
  const { path } = await fetchJsonPayload("get", `/path/${folderID}`);

  return await fetchJsonPayload("post", `/reposition/${path}`, {
    currentIndex,
    newIndex,
    strategy,
  });
};
