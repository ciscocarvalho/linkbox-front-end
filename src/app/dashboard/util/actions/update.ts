import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { DashboardItem } from "../../types";
import { getItemID, getItemType } from "../../util";

export const update = async <T extends DashboardItem>(
  item: T,
  updatedFields: Partial<T>
) => {
  const itemID = getItemID(item);
  const { path }: { path: string } = await fetchJsonPayload("get", `/path/${itemID}`);

  if (!path) {
    return;
  }

  const itemType = getItemType(item);
  let route;

  if (itemType === "folder") {
    route = `/folders/${path}`;
  } else {
    route = `/links/default/${itemID}`;
  }

  await fetchJsonPayload("put", route, updatedFields);
};
