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
          <p className={`my-0 mx-auto w-[80%] h-[100%] flex justify-center items-center text-center text-[1.5rem] font-bold${hasItems ? " hidden" : ""}`}>
            Esta pasta está vazia.
            <br />
            Adicione um link ou uma pasta clicando no botão +
          </p>
          <CardsContainer items={validItems} />
          <CardsFooter />
        </main>

        <aside className="fixed top-0 left-0 w-[240px] h-[100%] bg-[#2795DB] border-solid border-[#0b67b2] pt-[40px] pr-[10px] pb-[30px] pl-[10px] flex flex-col gap-[20px] hidden">
          <div className="w-[100%] flex justify-center">
            <Icon name="close" className="p-[10px] border-solid border-[skyblue] cursor-pointer rounded-[30px] hover:scale-x-[1.2s] hover:scale-y-[1.2s] hover:duration-[0.5s]" />
          </div>
          <div className="flex gap-[20px] flex-col items-start">
            <div className="flex items-center cursor-pointer gap-[5px]">
              <a href="/">
                <Icon name="logout" className="border-solid border-[#1a2122] rounded-[10px] p-[4px]" />{" "}
                <span className="text-[aliceblue] font-medium font-sans">Sair</span>
              </a>
            </div>
            <div className="flex items-center cursor-pointer gap-[5px]">
              <Icon name="switch_account" className="border-solid border-[#1a2122] rounded-[10px] p-[4px]" />
              <span className="text-[aliceblue] font-medium font-sans">Mudar de Conta</span>
            </div>
          </div>
        </aside>
      </DashboardDispatchContext.Provider>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
