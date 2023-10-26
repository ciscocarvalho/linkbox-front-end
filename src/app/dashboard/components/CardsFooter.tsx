"use client";
import React, { useContext } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { mapItemsToItemIDs } from "../util";

const CardsFooter: React.FC = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { selected } = dashboard;

  const copySelected = () => {
    dispatch({ type: "copy_many", itemIDs: mapItemsToItemIDs(selected) });
    dispatch({ type: "reset_selection" });
  }

  const cutSelected = () => {
    dispatch({ type: "cut_many", itemIDs: mapItemsToItemIDs(selected) });
    dispatch({ type: "reset_selection" });
  }

  const deleteSelected = () => {
    dispatch({ type: "remove_many", itemIDs: mapItemsToItemIDs(selected) });
    dispatch({ type: "reset_selection" });
  }

  return (
    <footer className={`cards-footer${selected.length > 1 ? "" : " hidden"}`}>
      <p className="text-selected-cards">{selected.length} { selected.length === 1 ? "Selecionado" : "Selecionados"}</p>
      <div className="cards-footer-btn-container">
        <div className="btn copy-btn" onClick={copySelected}>
          <span className="material-symbols-outlined">content_copy</span>
        </div>
        <div className="btn cut-btn" onClick={cutSelected}>
          <span className="material-symbols-outlined">cut</span>
        </div>
        <div className="btn delete-btn" onClick={deleteSelected}>
          <span className="material-symbols-outlined">delete</span>
        </div>
      </div>
    </footer>
  );
};

export default CardsFooter;
