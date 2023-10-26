import React, { ReactNode, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";

interface SortableItemProps {
  id: number;
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
