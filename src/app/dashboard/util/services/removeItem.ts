import DashboardItem from "../../DashboardItem";

export const removeItem = (item: DashboardItem) => {
  item.getParent()?.removeChild(item);
}
