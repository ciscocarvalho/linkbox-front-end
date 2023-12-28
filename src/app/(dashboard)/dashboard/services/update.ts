import fetchData from "../../../../services/fetchData";
import { DashboardItem } from "../types";
import { getItemID } from "../utils";

export const update = async <T extends DashboardItem>(
  item: T,
  updatedFields: Partial<T>
) => {
  const itemID = getItemID(item);
  return await fetchData("put", `/items/default/${itemID}`, updatedFields);
};
