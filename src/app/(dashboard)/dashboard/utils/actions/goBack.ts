import { Dispatch } from "react";
import { DashboardAction, DashboardView } from "../../types";
import { openFolder } from "./openFolder";
import { getItemID } from "..";

export const goBack = async (
  dashboard: DashboardView,
  dispatch: Dispatch<DashboardAction>
) => {
  const parent = dashboard.dataOfCurrentFolder.parent;

  if (parent) {
    await openFolder(getItemID(parent), dispatch);
  }
};
