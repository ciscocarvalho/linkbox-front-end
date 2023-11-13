import DashboardItem from "../../DashboardItem";

export const updateItem = <T extends DashboardItem>(item: T, updatedFields: Partial<T>) => {
  item.update(updatedFields);
}
