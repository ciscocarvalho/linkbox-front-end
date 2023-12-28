"use client";
import {
  Active,
  ClientRect,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useContext, useRef, useState } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../contexts/DashboardContext";
import { checkItemID, compareItems, getItemID, itemIsFolder } from "../utils";
import { getChildren } from "../services/getChildren";
import { move } from "../services/move";
import { moveMany } from "../services/moveMany";
import { refreshDashboard } from "../utils/actions/refreshDashboard";
import { reposition } from "../services/reposition";
import { repositionMany } from "../services/repositionMany";
import ItemCard from "./ItemCard";
import ItemDragOverlay from "./ItemDragOverlay";
import SortableItem from "./SortableItem";
import { DashboardFolder, DashboardItem, DashboardItemID } from "../types";
import { isMobile } from "react-device-detect";
import { usePointerEvent } from "../../../../hooks/usePointerEvent";

const getClientVerticalPositionRelativeToElementCenter = (
  pointerY: number,
  rect: ClientRect,
  centerMaxOffset: number
) => {
  const { top, height } = rect;
  const center = top + height / 2;
  const positionRelativeToCenter = pointerY >= center ? "below" : "above";

  if (centerMaxOffset > 0 && centerMaxOffset < 1) {
    centerMaxOffset = Math.round(centerMaxOffset * height);
  }

  const closeToCenter =
    pointerY >= center - centerMaxOffset &&
    pointerY <= center + centerMaxOffset;

  return { positionRelativeToCenter, closeToCenter };
};

const getDragPointerPositionInfo = (pointerY: number, event: DragMoveEvent) => {
  const { over, active } = event;

  if (!active.rect.current.translated || !over) {
    return;
  }

  const { closeToCenter, positionRelativeToCenter } =
    getClientVerticalPositionRelativeToElementCenter(pointerY, over.rect, 0.2);

  return { closeToCenter, positionRelativeToCenter };
};

type OverInfo = NonNullable<ReturnType<typeof getDragPointerPositionInfo>> & {
  id: DashboardItemID;
};

interface CardsContainerProps {
  items: DashboardItem[];
}

const CardsContainer: React.FC<CardsContainerProps> = ({ items }) => {
  const cardsContainer = useRef(null);
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { selected, currentFolder } = dashboard;

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 8 },
  });
  const sensors = useSensors(isMobile ? touchSensor : pointerSensor);

  const childrenOfCurrentFolder = getChildren(currentFolder);
  const currentCursor = document.body.style.cursor;
  const cursorBeforeDrag = useRef(currentCursor);
  const hasItems = items.length > 0;
  const [overInfo, setOverInfo] = useState<OverInfo | null>(null);
  const [activeID, setActiveID] = useState<DashboardItemID | null>(null);
  const manySelected = selected.length > 1;
  const active = childrenOfCurrentFolder.find((child) =>
    checkItemID(child, activeID as DashboardItemID)
  );

  const moveToFolder = async (folder: DashboardFolder) => {
    if (manySelected) {
      await moveMany(
        selected.map((item) => getItemID(item)),
        getItemID(folder)
      );
      dispatch({ type: "reset_selection" });
    } else if (activeID) {
      await move(activeID, getItemID(folder));
    }

    await refreshDashboard(dashboard, dispatch);
  };

  const repositionAfterDrag = async (active: Active, newIndex: number) => {
    const strategy =
      overInfo!.positionRelativeToCenter === "above" ? "before" : "after";

    if (manySelected) {
      const indexes = selected
        .map((item) => {
          return childrenOfCurrentFolder.findIndex((child) =>
            compareItems(child, item)
          );
        })
        .filter((index) => index !== -1)
        .toSorted();

      await repositionMany(
        dashboard.currentFolder,
        indexes,
        newIndex,
        strategy
      );
    } else {
      const currentIndex = items.findIndex((item) =>
        checkItemID(item, active.id as DashboardItemID)
      );
      await reposition(
        dashboard.currentFolder,
        currentIndex,
        newIndex,
        strategy
      );
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const overIsSelected =
      selected.find((item) =>
        checkItemID(item, over?.id as DashboardItemID)
      ) !== undefined;

    if (over !== null && active.id !== over.id && !overIsSelected) {
      const newIndex = items.findIndex((item) =>
        checkItemID(item, over.id as DashboardItemID)
      );
      const overItem = items[newIndex];

      if (itemIsFolder(overItem) && overInfo!.closeToCenter) {
        await moveToFolder(overItem);
      } else {
        await repositionAfterDrag(active, newIndex);
      }
    }

    setOverInfo(null);
    await refreshDashboard(dashboard, dispatch);
    document.body.style.cursor = cursorBeforeDrag.current;
  };

  const { pointerEvent } = usePointerEvent();

  const handleDragStart = async ({ active }: DragStartEvent) => {
    const activeIsSelected =
      selected.find((item) =>
        checkItemID(item, active.id as DashboardItemID)
      ) !== undefined;

    if (!activeIsSelected) {
      const id = active.id as DashboardItemID;
      const item = dashboard.displayedItems.find((item) =>
        checkItemID(item, id)
      );

      if (item) {
        dispatch({ type: "select", item, behavior: "exclusive" });
      }
    }

    setActiveID(active.id as DashboardItemID);
    cursorBeforeDrag.current = document.body.style.cursor;
    // Setting cursor in body seems to be the only reliable way, also it's a
    // recommendation from the `dnd-kit` author himself:
    // https://github.com/clauderic/dnd-kit/issues/85#issuecomment-776010212
    document.body.style.cursor = "grabbing";
  };

  const handleDragMove = (e: DragMoveEvent) => {
    const id = e.over?.id;
    const pointerY = pointerEvent.current!.y;
    const pointerPositionInfo = getDragPointerPositionInfo(pointerY, e);

    if (!id || !pointerPositionInfo) {
      return;
    }

    const hasChanged =
      overInfo?.positionRelativeToCenter !==
        pointerPositionInfo.positionRelativeToCenter ||
      overInfo?.closeToCenter !== pointerPositionInfo.closeToCenter ||
      overInfo?.id !== id;

    if (hasChanged) {
      setOverInfo({ ...pointerPositionInfo, id: id as DashboardItemID });
    }
  };

  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== cardsContainer.current) {
      return;
    }

    e.stopPropagation();
    dispatch({ type: "reset_selection" });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => ({ ...item, id: getItemID(item) }))}
        strategy={verticalListSortingStrategy}
      >
        {hasItems ? (
          <div
            className={`h-[100%] flex flex-col overflow-y-auto`}
            onClick={handleOnClick}
            ref={cardsContainer}
          >
            {items.map((item, i) => {
              return (
                <SortableItem key={i} id={getItemID(item)}>
                  <ItemCard item={item} key={i} overInfo={overInfo} />
                </SortableItem>
              );
            })}
          </div>
        ) : null}
      </SortableContext>
      <ItemDragOverlay
        draggedItems={manySelected ? selected : active ? [active] : []}
        active={active}
      />
    </DndContext>
  );
};

export default CardsContainer;
