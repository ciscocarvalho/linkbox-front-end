import { DashboardFolder, DashboardItem } from "../../types";

export const getChildren = (folder: DashboardFolder): DashboardItem[] => {
  return folder.items;
}
