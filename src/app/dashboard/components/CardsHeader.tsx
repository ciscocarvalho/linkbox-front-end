"use client";
import React, { useContext } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { inputNewItem } from "../util";
import IconButton from '../../components/IconButton';
import { add } from '../util/actions/add';
import { paste } from '../util/actions/paste';
import { goBack } from '../util/actions/goBack';
import { getParent } from '../util/services/getParent';

const CardsHeader = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { currentFolder, clipboard } = dashboard;
  const clipboardInUse = clipboard.cut.length > 0 || clipboard.copied.length > 0;
  const inSubfolder = getParent(currentFolder) !== null;

  return <header className="flex justify-between items-center min-h-[60px] h-[60px] py-[8px] px-[20px]">
    <div className="flex justify-center items-center gap-[20px]">
      {
        inSubfolder
          ? <IconButton onClick={() => goBack(currentFolder, dispatch)} icon="arrow_back" />
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
                paste(dashboard, currentFolder, dispatch);
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
          add(dashboard.currentFolder, item, dispatch);
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
