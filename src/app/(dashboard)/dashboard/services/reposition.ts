import fetchData from "../../../../services/fetchData";
import { DashboardFolder } from "../types";
import { getItemID } from "../utils";

export const reposition = async (
  folder: DashboardFolder,
  currentIndex: number,
  newIndex: number,
  strategy: "before" | "after" = "after"
) => {
  const folderID = getItemID(folder);
  const {
    data: { folder: updatedFolder },
  } = await fetchData("post", `/reposition/default/${folderID}`, {
    currentIndex,
    newIndex,
    strategy,
  });

  return updatedFolder;
};
