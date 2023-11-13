import { DashboardFolder, DashboardItem } from "../../types";
import { compareItems } from "../../util";
import { getChildren } from "./getChildren";
import { reposition } from "./reposition";

export const repositionMany = async (
  currentFolder: DashboardFolder,
  indexes: number[],
  newIndex: number,
  strategy: "before" | "after"
) => {
  const children = getChildren(currentFolder);
  const smallestIndex = Math.min(...indexes);
  const movingBack = newIndex <= smallestIndex;

  if (movingBack) {
    indexes = indexes.toReversed();
  }

  const items = indexes.map((index) => children[index]);

  const getItemIndex = (item: DashboardItem) => {
    const children = getChildren(currentFolder);
    return children.findIndex((child) => compareItems(child, item));
  }

  for (let item of items) {
    const index = getItemIndex(item);
    currentFolder = await reposition(currentFolder, index, newIndex, strategy);
  }
};
