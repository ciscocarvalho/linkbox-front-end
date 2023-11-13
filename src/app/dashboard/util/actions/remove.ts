import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";

export const remove = (
  item: DashboardItem,
  dispatch: Dispatch<DashboardAction>
) => {
  const parent = item.getParent();

  if (!item || !parent) {
    return;
  }

  parent.removeChild(item);

  dispatch({ type: "remove", item });
};
