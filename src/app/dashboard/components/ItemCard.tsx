"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import DashboardFolder from '../DashboardFolder';
import DashboardLink from '../DashboardLink';
import FolderDataContainer from "./FolderDataContainer"
import LinkDataContainer from "./LinkDataContainer"
import { getItemType } from '../util';
import DashboardItem from '../DashboardItem';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import BtnsContainer from './ItemCard/BtnsContainer';

interface ItemCardProps { item: DashboardItem };

const isInSmallScreenWidth = () => window.innerWidth <= 651;

let clickCount = 0;
let clickedItem: DashboardItem;
let clickTimeout: ReturnType<typeof setTimeout>;
let currentCard: HTMLDivElement | null;

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [backgroundColor, setBackgroundColor] = useState(item.backgroundColor);
  const [hovering, setHovering] = useState(false);
  const [inSmallScreenWidth, setInSmallScreenWidth] = useState(isInSmallScreenWidth());
  const itemType = getItemType(item);
  const computedProps = { [`data-${itemType}-id`]: item.getId().toString() };
  const card = useRef<HTMLDivElement>(null);
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const isSelected = dashboard.selected.includes(item);

  const onSingleClick = () => {
    dispatch({ type: "reset_selection" });
    dispatch({ type: "select", itemID: item.id });
  }

  const onDoubleClick = () => {
    if (card.current) {
      if (itemType === "link") {
        dispatch({ type: "open_link", linkID: item.id })
      } else {
        dispatch({ type: "open_folder", folderID: item.id })
      }
    }
  }

  useEffect(() => {
    const listener = ({ target }: MouseEvent) => {
      if (target && target !== currentCard) {
        clickCount = 0;
      }
    }

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    }
  }, []);

  useEffect(() => {
    const listener = () => {
      setInSmallScreenWidth(isInSmallScreenWidth());
    }

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    }
  }, []);

  return <div
    className={`${itemType}-card${isSelected ? " card-selected" : ""}`}
    draggable={true}
    ref={card}
    style={{
      cursor: "default",
      backgroundColor: isSelected ? "" : backgroundColor,
    }}
    onMouseOver={() => setHovering(true)}
    onMouseOut={() => setHovering(false)}
    onClick={(e) => {
      e.stopPropagation();
      const oldClickItem = clickedItem;
      clickedItem = item;

      if (oldClickItem === clickedItem) {
        clickCount++;
      } else {
        clickCount = 1;
      }

      if (clickCount === 1) {
        onSingleClick();
        currentCard = card.current;
        clickTimeout = setTimeout(() => {
          clickCount = 0;
        }, 500);
      } else {
        onDoubleClick();
        clearTimeout(clickTimeout);
        clickCount = 0;
      }
    }}
    {...computedProps}
  >
    {
      itemType === "folder"
        ? <FolderDataContainer folder={item as DashboardFolder} />
        : <LinkDataContainer link={item as DashboardLink} />
    }
    <BtnsContainer
      hovering={hovering}
      inSmallScreenWidth={inSmallScreenWidth}
      item={item}
      setBackgroundColor={setBackgroundColor}
    />
  </div>;
};

export default ItemCard;
