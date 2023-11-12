"use client";
import React, { useContext } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { inputNewItem } from "../util";
import IconButton from '../../components/IconButton';

const CardsHeader = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { currentFolder, parentFolder, clipboard } = dashboard;
  const clipboardInUse = clipboard.cut.length > 0 || clipboard.copied.length > 0;
  const inSubfolder = parentFolder !== null;

  return <header className="flex justify-between items-center min-h-[60px] h-[60px] py-[8px] px-[20px]">
    <div className="flex justify-center items-center gap-[20px]">
      {
        inSubfolder
          ? <IconButton onClick={() => dispatch({ type: "go_back" })} icon="arrow_back" />
          : null
      }
    </div>

    <div className="flex justify-center items-center gap-[20px]">
      {
        clipboardInUse
          ? <>
            <IconButton onClick={() => dispatch({ type: "reset_clipboard" })} icon="cancel" />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "paste", folder: currentFolder })
              }}
              icon="content_paste"
            />
          </>
          : null
      }

      <IconButton
        onClick={() => {
          const item = inputNewItem();
          if (!item) {
            return;
          };
          dispatch({ type: "add", item });
        }}
        icon="add"
      />

      {
        inSubfolder
          ? <p>{currentFolder.name}</p>
          : null
      }
    </div>
  </header>
}

export default CardsHeader;
