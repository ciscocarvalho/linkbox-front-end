"use client";
import React, { useContext } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { inputNewItem } from "../util";
import Icon from '../../components/Icon';

const CardsHeader = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { currentFolder, parentFolder, clipboard } = dashboard;
  const clipboardInUse = clipboard.cut.length > 0 || clipboard.copied.length > 0;
  const inSubfolder = parentFolder !== null;

  return <header className="cards-header">
    <div className="cards-header-left">
      <div
        className={`btn go-back-btn${inSubfolder ? "" : " hidden"}`}
        onClick={() => dispatch({ type: "go_back" })}
      >
        <Icon name="arrow_back" />
      </div>
    </div>
    <div className="cards-header-right">
      <div
        className={`btn cancel-paste-btn${clipboardInUse ? "" : " hidden"}`}
        onClick={() => dispatch({ type: "reset_clipboard" })}
      >
        <Icon name="cancel" />
      </div>

      <div
        className={`btn paste-btn${clipboardInUse ? "" : " hidden"}`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "paste", folderID: currentFolder.id })
        }}
      >
        <Icon name="content_paste" />
      </div>

      <div className="btn add-btn" onClick={() => {
        const item = inputNewItem();
        if (!item) {
          return;
        };
        dispatch({ type: "add", item });
      }}>
        <Icon name="add" />
      </div>
      <p className={`current-folder-name${inSubfolder ? "" : " hidden"}`}>{currentFolder.name}</p>
    </div>
  </header>
}

export default CardsHeader;
