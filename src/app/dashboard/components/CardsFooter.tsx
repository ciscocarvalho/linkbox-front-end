"use client";
import React, { useContext } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { mapItemsToItemIDs } from "../util";
import IconButton from '../../components/IconButton';

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

  if (selected.length <= 1) {
    return null;
  }

  return (
    <footer className={`bg-[#efeded] flex flex-wrap justify-end items-center mt-auto gap-x-[20px] gap-y-0 px-0 py-[8px]`}>
      <p className="p-[20px]">{selected.length} Selecionados</p>
      <div className="flex justify-center items-center">
        <IconButton onClick={copySelected} icon="content_copy" />
        <IconButton onClick={cutSelected} icon="cut" />
        <IconButton onClick={deleteSelected} icon="delete" />
      </div>
    </footer>
  );
};

export default CardsFooter;
