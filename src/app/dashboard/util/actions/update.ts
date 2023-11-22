import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { DashboardItem } from "../../types";
import { getItemID, getItemType } from "../../util";

export const update = async <T extends DashboardItem>(
  item: T,
  updatedFields: Partial<T>
) => {
  const itemID = getItemID(item);
  const itemType = getItemType(item);
  const route = `/${itemType === "folder" ? "folders" : "links"}/default/${itemID}`;

  await fetchJsonPayload("put", route, updatedFields);
};
