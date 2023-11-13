import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import { remove } from "./remove";

export const removeMany = (
  items: DashboardItem[],
  dispatch: Dispatch<DashboardAction>
) => {
  items.forEach(item => { remove(item, dispatch) });
};
