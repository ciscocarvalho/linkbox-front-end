import { Dispatch } from "react";
import { DashboardAction } from "../../types";
import DashboardFolder from "../../DashboardFolder";
import DashboardItem from "../../DashboardItem";
import { reposition } from "./reposition";

export const repositionMany = (
  currentFolder: DashboardFolder,
  indexes: number[],
  newIndex: number,
  strategy: "before" | "after",
  dispatch: Dispatch<DashboardAction>
) => {
  const children = currentFolder.getChildren();
  const smallestIndex = Math.min(...indexes);
  const movingBack = newIndex <= smallestIndex;

  if (movingBack) {
    indexes = indexes.toReversed();
  }

  const items = indexes.map(index => children[index]);

  const getItemIndex = (item: DashboardItem) => {
    const children = currentFolder.getChildren();
    return children.findIndex(child => child.id === item.id);
  }

  items.forEach(item => {
    const index = getItemIndex(item);
    reposition(currentFolder, index, newIndex, strategy, dispatch);
  });
};

