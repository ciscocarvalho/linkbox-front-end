import { Dispatch } from "react";
import DashboardItem from "../../DashboardItem";
import { DashboardAction } from "../../types";
import { updateItem } from "../services/updateItem";

export const edit = <T extends DashboardItem>(
  item: T,
  updatedFields: Partial<T>,
  dispatch: Dispatch<DashboardAction>
) => {
  updateItem(item, updatedFields);
  dispatch({ type: "refresh" });
};
