import DashboardFolder from "../../DashboardFolder";
import DashboardItem from "../../DashboardItem";

export const moveItem = (item: DashboardItem, targetFolder: DashboardFolder) => {
  item.getParent()?.moveChildToAnotherFolder(item, targetFolder);
}
