import DashboardFolder from "../../DashboardFolder";

export const repositionItem = (
  currentFolder: DashboardFolder,
  currentIndex: number,
  newIndex: number,
  strategy: "before" | "after",
) => {
  currentFolder.repositionChild(currentIndex, newIndex, strategy);
}
