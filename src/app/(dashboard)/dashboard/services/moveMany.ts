import { DashboardItemID } from "../types";
import { move } from "./move";

export const moveMany = async (
  itemIDs: DashboardItemID[],
  folderID: DashboardItemID
) => {
  for (let itemID of itemIDs) {
    await move(itemID, folderID);
  }
};
