import { Dispatch } from "react";
import { DashboardAction, DashboardItem } from "../../types";
import fetchData from "../../../../../services/fetchData";
import { getItemID } from "..";

export const remove = async (
  item: DashboardItem,
  dispatch: Dispatch<DashboardAction>
) => {
  const itemID = getItemID(item);
  await fetchData("delete", `/items/default/${itemID}`);
  dispatch({ type: "remove", item });
};
