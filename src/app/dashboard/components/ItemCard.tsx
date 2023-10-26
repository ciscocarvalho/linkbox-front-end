"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import DashboardFolder from '../DashboardFolder';
import DashboardLink from '../DashboardLink';
import FolderDataContainer from "./FolderDataContainer"
import LinkDataContainer from "./LinkDataContainer"
import { getItemType, itemIsFolder } from '../util';
import DashboardItem from '../DashboardItem';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import BtnsContainer from './ItemCard/BtnsContainer';

interface ItemCardProps { item: DashboardItem };

const isInSmallScreenWidth = () => window.innerWidth <= 651;

let clickCount = 0;
let clickedItem: DashboardItem;
let clickTimeout: ReturnType<typeof setTimeout>;
let currentCard: HTMLDivElement | null;

const ItemCard: React.FC<ItemCardProps & any> = ({ item, overInfo }) => {
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
    dispatch({ type: "select", itemID: item.id, behavior: "exclusive" });
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

  let className = `${itemType}-card`

  if (isSelected) {
    className += " card-selected";
  }

  if (overInfo && overInfo.id === item.id && !isSelected) {
    if (overInfo.isPositionCloseToCenter && itemIsFolder(item)) {
      className += ` card-drag-over-center`;
    } else {
      className += ` card-drag-over-${overInfo.positionRelativeToCenter}`;
    }
  }

  const handleOnClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
  }

  return <div
    className={className}
    draggable={true}
    ref={card}
    style={{
      cursor: "default",
      backgroundColor: isSelected ? "" : backgroundColor,
    }}
    onMouseOver={() => setHovering(true)}
    onMouseOut={() => setHovering(false)}
    onClick={handleOnClick}
    {...computedProps}
  >
    {
      itemType === "folder"
        ? <FolderDataContainer folder={item as DashboardFolder} />
        : <LinkDataContainer link={item as DashboardLink} />
    }
    <BtnsContainer
      hovering={hovering && !overInfo}
      inSmallScreenWidth={inSmallScreenWidth}
      item={item}
      setBackgroundColor={setBackgroundColor}
    />
  </div>;
};

export default ItemCard;
