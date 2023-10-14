"use client";
import React, { useContext, useRef } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import ItemCard from './ItemCard';

const CardsContainer: React.FC = () => {
  const cardsContainer = useRef(null);
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { clipboard, displayedItems: items } = dashboard;
  const validItems = items.filter(item => !clipboard.cut.includes(item));
  const hasItems = validItems.length > 0;

  return (
    <div
      className={`cards-container ${hasItems ? "" : "hidden"}`}
      onClick={(e) => {
        if (e.target !== cardsContainer.current) {
          return;
        }

        e.stopPropagation();
        dispatch({ type: "reset_selection" });
      }}
      ref={cardsContainer}
    >
      {validItems.map((item, i) => <ItemCard item={item} key={i} />)}
    </div>
  )
}


export default CardsContainer;
