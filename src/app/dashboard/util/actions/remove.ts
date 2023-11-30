import { Dispatch } from "react";
import { DashboardAction, DashboardItem } from "../../types";
import fetchJsonPayload from "../../../../Services/fetchJsonPayload";
import { getItemID } from "../../util";

export const remove = async (
  item: DashboardItem,
  dispatch: Dispatch<DashboardAction>
) => {
  const itemID = getItemID(item);
  await fetchJsonPayload("delete", `/items/default/${itemID}`);
  dispatch({ type: "remove", item });
};
