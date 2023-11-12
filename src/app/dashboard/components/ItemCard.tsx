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
    dispatch({ type: "select", item, behavior: "exclusive" });
  }

  const onDoubleClick = () => {
    if (card.current) {
      if (itemType === "link") {
        dispatch({ type: "open_link", link: item })
      } else {
        dispatch({ type: "open_folder", folder: item })
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

  let className = "flex justify-between items-center min-h-[60px] h-[60px] py-[8px] px-[20px]";

  if (isSelected || hovering) {
    className += " bg-[#DDE3EC]";
  } else if (backgroundColor) {
    className += ` bg-[${backgroundColor}]`;
  }

  if (overInfo && overInfo.id === item.id && !isSelected) {
    if (overInfo.isPositionCloseToCenter && itemIsFolder(item)) {
      className += ` !bg-[#DDE3EC]`;
    } else {
      switch (overInfo.positionRelativeToCenter) {
        case "below": {
          className += ` !border-b-[1px] !border-b-solid !border-b-[#2795DB]`;
          break;
        }
        case "above": {
          className += ` !border-t-[1px] !border-t-solid !border-t-[#2795DB]`;
          break;
        }
      }
    }
  }

  className += " select-none";

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
    className={`border-t-[2px] first:border-t-[1px] first:border-t-solid first:border-t-[#BBC8DC] border-b-[1px] border-b-solid border-b-[#BBC8DC] ${className}`}
    draggable={true}
    ref={card}
    style={{
      cursor: "default",
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
