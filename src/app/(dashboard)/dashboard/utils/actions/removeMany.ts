import { Dispatch } from "react";
import { DashboardAction, DashboardItem } from "../../types";
import { remove } from "./remove";

export const removeMany = async (
  items: DashboardItem[],
  dispatch: Dispatch<DashboardAction>
) => {
  for (let item of items) {
    await remove(item, dispatch);
  }
};
