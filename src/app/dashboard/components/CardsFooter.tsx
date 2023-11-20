"use client";
import React, { useContext } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import IconButton from '../../components/IconButton';
import { removeMany } from '../util/actions/removeMany';

const CardsFooter: React.FC = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { selected } = dashboard;

  const copySelected = () => {
    dispatch({ type: "copy_many", items: selected });
    dispatch({ type: "reset_selection" });
  }

  const cutSelected = () => {
    dispatch({ type: "cut_many", items: selected });
    dispatch({ type: "reset_selection" });
  }

  const deleteSelected = async () => {
    await removeMany(selected, dispatch);
    dispatch({ type: "reset_selection" });
  }

  if (selected.length === 0 || (selected.length === 1 && !dashboard.inSmallScreenWidth)) {
    return null;
  }

  return (
    <footer className={`bg-[#efeded] flex flex-wrap justify-end items-center mt-auto gap-x-[20px] gap-y-0 px-0 py-[8px]`}>
      <p className="p-[20px]">{selected.length} {selected.length === 1 ? "Selecionado" : "Selecionados"}</p>
      <div className="flex justify-center items-center">
        <IconButton onClick={copySelected} icon="content_copy" />
        <IconButton onClick={cutSelected} icon="cut" />
        <IconButton onClick={deleteSelected} icon="delete" />
      </div>
    </footer>
  );
};

export default CardsFooter;
