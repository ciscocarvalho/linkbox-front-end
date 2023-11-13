import DashboardFolder from "../../DashboardFolder";
import DashboardItem from "../../DashboardItem";

export const addItem = (folder: DashboardFolder, item: DashboardItem) => {
  folder.addChild(item);
}
