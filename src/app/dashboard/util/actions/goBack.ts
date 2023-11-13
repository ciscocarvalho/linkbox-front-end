import { Dispatch } from "react";
import { DashboardAction, DashboardFolder } from "../../types";
import { getParent } from "./getParent";
import { openFolder } from "./openFolder";

export const goBack = async (
  currentFolder: DashboardFolder,
  dispatch: Dispatch<DashboardAction>
) => {
  const parent = await getParent(currentFolder);

  if (parent) {
    await openFolder(parent, dispatch);
  }
};
