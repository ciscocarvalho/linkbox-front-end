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
  };
  const [dashboard, dispatch] = useReducer(dashboardReducer, initialDashboard);
  const { clipboard, displayedItems } = dashboard;
  const validItems = displayedItems.filter(item => !clipboard.cut.includes(item));
  const hasItems = displayedItems.length > 0;

  return (
    <DashboardContext.Provider value={dashboard}>
      <DashboardDispatchContext.Provider value={dispatch}>
        <nav className="flex justify-between p-[24px] bg-[#2795DB] items-center gap-[20px] max-[651px]:justify-around max-[651px]:p-[24px]">
          <div className="flex justify-start flex-1">
            <a href="/">
              <div className="flex items-center gap-[20px]">
                <img className="w-[40px]" src="images/Logo.svg" alt="LinkBox logo" />
                <p className="text-[1.5rem] font-bold max-[651px]:hidden">LinkBox</p>
              </div>
            </a>
          </div>
          <InputContainer className="flex-1">
            <div className="min-w-[250px] max-w-[600px]">
              <SearchBar type="text" placeholder="Pesquise" id="inputPesquisa" />
            </div>
            <label htmlFor="inputPesquisa">
              <InputIcon name="search" />
            </label>
          </InputContainer>
          <div className="flex-1 max-[651px]:hidden" />
        </nav>

        <main className="h-[100%] flex flex-col overflow-y-auto">
          <CardsHeader />
          {
            hasItems
              ? <CardsContainer items={validItems} />
              : <p className={"my-0 mx-auto w-[80%] h-[100%] flex justify-center items-center text-center text-[1.5rem] font-bold"}>
                Esta pasta está vazia.
                <br />
                Adicione um link ou uma pasta clicando no botão +
              </p>
          }
          <CardsFooter />
        </main>
      </DashboardDispatchContext.Provider>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
