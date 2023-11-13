import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";

export const edit = <T extends DashboardItem>(
  item: T,
  updatedFields: Partial<T>,
  dispatch: Dispatch<DashboardAction>
) => {
  item.update(updatedFields);
  dispatch({ type: "refresh" });
};
