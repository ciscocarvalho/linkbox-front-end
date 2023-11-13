import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import { removeItem } from "../services/removeItem";

export const remove = (
  item: DashboardItem,
  dispatch: Dispatch<DashboardAction>
) => {
  removeItem(item);
  dispatch({ type: "remove", item });
};
