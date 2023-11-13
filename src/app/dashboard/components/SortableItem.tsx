import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { DashboardItemID } from "../types";

interface SortableItemProps {
  id: DashboardItemID;
  children: ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useSortable({ id });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
