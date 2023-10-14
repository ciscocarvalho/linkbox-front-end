"use client";
import React, { useContext } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { inputNewItem } from "../util";

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
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
    </div>
    <div className="cards-header-right">
      <div
        className={`btn cancel-paste-btn${clipboardInUse ? "" : " hidden"}`}
        onClick={() => dispatch({ type: "reset_clipboard" })}
      >
        <span className="material-symbols-outlined">cancel</span>
      </div>

      <div
        className={`btn paste-btn${clipboardInUse ? "" : " hidden"}`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "paste", folderID: currentFolder.id })
        }}
      >
        <span className="material-symbols-outlined">content_paste</span>
      </div>

      <div className="btn add-btn" onClick={() => {
        const item = inputNewItem();
        if (!item) {
          return;
        };
        dispatch({ type: "add", item });
      }}>
        <span className="material-symbols-outlined">add</span>
      </div>
      <p className={`current-folder-name${inSubfolder ? "" : " hidden"}`}>{currentFolder.name}</p>
    </div>
  </header>
}

export default CardsHeader;
