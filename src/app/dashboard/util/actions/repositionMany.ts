import { Dispatch } from "react";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import DashboardItem from "../../DashboardItem";
import { reposition } from "./reposition";
import { getChildren } from "../services/getChildren";

export const repositionMany = (
  currentFolder: DashboardFolder,
  indexes: number[],
  newIndex: number,
  strategy: "before" | "after",
  dispatch: Dispatch<DashboardAction>
) => {
  const children = getChildren(currentFolder);
  const smallestIndex = Math.min(...indexes);
  const movingBack = newIndex <= smallestIndex;

  if (movingBack) {
    indexes = indexes.toReversed();
  }

  const items = indexes.map(index => children[index]);

  const getItemIndex = (item: DashboardItem) => {
    const children = getChildren(currentFolder);
    return children.findIndex(child => child.id === item.id);
  }

  items.forEach(item => {
    const index = getItemIndex(item);
    reposition(currentFolder, index, newIndex, strategy, dispatch);
  });
};

