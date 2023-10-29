"use client";
import React, { useReducer } from "react";
import DashboardFolder from "./DashboardFolder";
import SearchBar from "./components/SearchBar";
import { TDashboard } from "./types";
import { dashboardReducer } from "./util/dashboardReducer";
import { DashboardContext, DashboardDispatchContext } from './contexts/DashboardContext';
import CardsContainer from "./components/CardsContainer";
import CardsHeader from "./components/CardsHeader";
import CardsFooter from "./components/CardsFooter";
import InputContainer from "../components/InputContainer";
import InputIcon from "../components/InputIcon";
import Icon from "../components/Icon";

const Dashboard: React.FC = () => {
  const initialFolder = new DashboardFolder();
  const initialDashboard: TDashboard = {
    displayedItems: [],
    selected: [],
    clipboard: { copied: [], cut: [] },
    currentFolder: initialFolder,
    parentFolder: initialFolder.getParent(),
  };
  const [dashboard, dispatch] = useReducer(dashboardReducer, initialDashboard);
  const { clipboard, displayedItems } = dashboard;
  const validItems = displayedItems.filter(item => !clipboard.cut.includes(item));
  const hasItems = displayedItems.length > 0;

  return (
    <DashboardContext.Provider value={dashboard}>
      <DashboardDispatchContext.Provider value={dispatch}>
        <nav>
          <div className="brand-box">
            <a href="/">
              <div className="brand">
                <img className="logo" src="images/Logo.svg" alt="LinkBox logo" />
                <p className="website-name">LinkBox</p>
              </div>
            </a>
          </div>
          <InputContainer>
            <SearchBar type="text" placeholder="Pesquise" id="inputPesquisa" />
            <label htmlFor="inputPesquisa">
              <InputIcon name="search" />
            </label>
          </InputContainer>
          <div></div>
        </nav>

        <main>
          <CardsHeader />
          <p className={`empty-folder-message ${hasItems ? "hidden" : ""}`}>
            Esta pasta está vazia.
            <br />
            Adicione um link ou uma pasta clicando no botão +
          </p>
          <CardsContainer items={validItems} />
          <CardsFooter />
        </main>

        <aside className="side-menu hide">
          <div className="exit">
            <Icon name="close" className="exit-btn" />
          </div>
          <div className="side-options">
            <div className="side-content">
              <a href="/">
                <Icon name="logout" className="side-btn" />{" "}
                <span className="side-text">Sair</span>
              </a>
            </div>
            <div className="side-content">
              <Icon name="switch_account" className="side-btn" />
              <span className="side-text">Mudar de Conta</span>
            </div>
          </div>
        </aside>
      </DashboardDispatchContext.Provider>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
