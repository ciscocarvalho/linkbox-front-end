import { DashboardFolder, DashboardItem } from "../../types";
import { move } from "./move";

export const moveMany = async (
  items: DashboardItem[],
  folder: DashboardFolder,
) => {
  for (let item of items) {
    await move(item, folder);
  }
};
