import { DashboardItem } from "../types";

export const clone = (item: DashboardItem) => {
  const clonedItem = { ...item } as DashboardItem;
  delete (clonedItem as any)._id;
  return clonedItem;
};
