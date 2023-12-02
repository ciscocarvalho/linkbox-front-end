import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { DashboardItem } from "../../types";
import { getItemID } from "../../util";

export const update = async <T extends DashboardItem>(
  item: T,
  updatedFields: Partial<T>
) => {
  const itemID = getItemID(item);
  return await fetchJsonPayload("put", `/items/default/${itemID}`, updatedFields);
};
