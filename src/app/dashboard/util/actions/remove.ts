import { Dispatch } from "react";
import { DashboardAction, DashboardItem } from "../../types";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { getItemID, getItemType } from "../../util";

export const remove = async (
  item: DashboardItem,
  dispatch: Dispatch<DashboardAction>
) => {
  const itemID = getItemID(item);
  const itemType = getItemType(item);
  const route = `/${itemType === "folder" ? "folders" : "links"}/default/${itemID}`;

  await fetchJsonPayload("delete", route);
  dispatch({ type: "remove", item });
};
