"use client";
import {
  Active,
  ClientRect,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useContext, useRef, useState } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../contexts/DashboardContext";
import { checkItemID, compareItems, getItemID, itemIsFolder } from "../util";
import { getByID } from "../util/actions/getByID";
import { getChildren } from "../util/actions/getChildren";
import { move } from "../util/actions/move";
import { moveMany } from "../util/actions/moveMany";
import { refreshDashboard } from "../util/actions/refreshDashboard";
import { reposition } from "../util/actions/reposition";
import { repositionMany } from "../util/actions/repositionMany";
import ItemCard from "./ItemCard";
import ItemDragOverlay from "./ItemDragOverlay";
import SortableItem from "./SortableItem";
import { DashboardFolder, DashboardItem, DashboardItemID } from "../types";

const getClientVerticalPositionRelativeToElementCenter = (
  clientY: number,
  rect: ClientRect,
  centerMaxOffset: number
) => {
  const { top, height } = rect;
  const center = top + height / 2;
  const positionRelativeToCenter = clientY >= center ? "below" : "above";

  if (centerMaxOffset > 0 && centerMaxOffset < 1) {
    centerMaxOffset = Math.round(centerMaxOffset * height);
  }

  const isPositionCloseToCenter =
    clientY >= center - centerMaxOffset && clientY <= center + centerMaxOffset;

  return { positionRelativeToCenter, isPositionCloseToCenter };
};

const getCursorPositionInfo = (
  event: DragMoveEvent,
  items: DashboardItem[]
) => {
  const { over, active } = event;
  const itemOver = items.find((item) => checkItemID(item, over?.id as DashboardItemID));

  if (!active.rect.current.translated || !over || !itemOver) {
    return;
  }

  const cursorPositionOnActivation = (event.activatorEvent as any).clientY;
  const cursorPosition = cursorPositionOnActivation + event.delta.y;

  const { isPositionCloseToCenter, positionRelativeToCenter } =
    getClientVerticalPositionRelativeToElementCenter(cursorPosition, over.rect, 0.2);

  return { isPositionCloseToCenter, positionRelativeToCenter };
};

type OverInfo = NonNullable<ReturnType<typeof getCursorPositionInfo>> & {
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const childrenOfCurrentFolder = getChildren(currentFolder);
  const hasItems = items.length > 0;
  const [overInfo, setOverInfo] = useState<OverInfo | null>(null);
  const [activeID, setActiveID] = useState<DashboardItemID | null>(null);
  const manySelected = selected.length > 1;
  const active = childrenOfCurrentFolder.find((child) => checkItemID(child, activeID as DashboardItemID));

  const moveToFolder = async (folder: DashboardFolder) => {
    if (manySelected) {
      await moveMany(selected, folder);
      dispatch({ type: "reset_selection" });
    } else if (activeID) {
      const item = await getByID(activeID);
      if (item) {
        await move(item, folder);
      }
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
      selected.find((item) => checkItemID(item, over?.id as DashboardItemID)) !==
      undefined;

    if (over !== null && active.id !== over.id && !overIsSelected) {
      const newIndex = items.findIndex((item) =>
        checkItemID(item, over.id as DashboardItemID)
      );
      const overItem = items[newIndex];

      if (itemIsFolder(overItem) && overInfo!.isPositionCloseToCenter) {
        await moveToFolder(overItem);
      } else {
        await repositionAfterDrag(active, newIndex);
      }
    }

    setOverInfo(null);
    (await getByID(getItemID(currentFolder))) as DashboardFolder;
    await refreshDashboard(dashboard, dispatch);
  };

  const handleDragStart = async ({ active }: DragStartEvent) => {
    const activeIsSelected =
      selected.find((item) => checkItemID(item, active.id as DashboardItemID)) !==
      undefined;

    if (!activeIsSelected) {
      const item = await getByID(active.id as DashboardItemID);
      if (item) {
        dispatch({ type: "select", item, behavior: "exclusive" });
      }
    }

    setActiveID(active.id as DashboardItemID);
  };

  const handleDragMove = (e: DragMoveEvent) => {
    const id = e.over?.id;
    const cursorPositionInfo = getCursorPositionInfo(e, items);

    if (!id || !cursorPositionInfo) {
      return;
    }

    const hasChanged =
      overInfo?.positionRelativeToCenter !==
        cursorPositionInfo.positionRelativeToCenter ||
      overInfo?.isPositionCloseToCenter !==
        cursorPositionInfo.isPositionCloseToCenter ||
      overInfo?.id !== id;

    if (hasChanged) {
      setOverInfo({ ...cursorPositionInfo, id: id as DashboardItemID });
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
