"use client";
import React, { useEffect, useReducer, useState } from "react";
import SearchBar from "./components/SearchBar";
import { DashboardView } from "./types";
import { dashboardReducer } from "./util/dashboardReducer";
import { DashboardContext, DashboardDispatchContext } from './contexts/DashboardContext';
import CardsContainer from "./components/CardsContainer";
import CardsHeader from "./components/CardsHeader";
import CardsFooter from "./components/CardsFooter";
import fetchJsonPayload from "../../Services/fetchJsonPayload";
import { openFolder } from "./util/actions/openFolder";
import { includesItem } from "./util";

const isInSmallScreenWidth = () => window.innerWidth <= 651;

const Dashboard: React.FC = () => {
  const initialDashboard: DashboardView = {
    displayedItems: [],
    selected: [],
    clipboard: { copied: [], cut: [] },
    currentFolder: null as any,
    inSmallScreenWidth: isInSmallScreenWidth(),
  };
  const [dashboard, dispatch] = useReducer(dashboardReducer, initialDashboard);
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {
    const getInitialFolder = async () => {
      const { dashboards } = await fetchJsonPayload("get", "/dashboards");
      if (!dashboards) {
        setUserLoggedIn(false);
        return;
      }
      return dashboards.find((dashboard: any) => dashboard.name === "default").tree;
    }

    getInitialFolder().then(async (folder) => {
      if (folder) {
        await openFolder(folder, dispatch);
      }
    });
  }, []);

  useEffect(() => {
    const listener = () => {
      const inSmallScreenWidth = isInSmallScreenWidth();
      dispatch({ type: "in_small_screen_width", inSmallScreenWidth });
    }

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    }
  }, []);

  if (!userLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  if (!dashboard.currentFolder) {
    return null;
  }

  const { clipboard, displayedItems } = dashboard;
  const validItems = displayedItems.filter(item => !includesItem(clipboard.cut, item));
  const hasItems = displayedItems.length > 0;

  return (
    <DashboardContext.Provider value={dashboard}>
      <DashboardDispatchContext.Provider value={dispatch}>
        <nav className="flex justify-between p-[24px] bg-[#2795DB] items-center gap-[20px] max-[651px]:justify-around max-[651px]:p-[24px]">
          <div className="flex justify-start flex-1 min-w-[fit-content]">
            <a href="/">
              <div className="flex items-center gap-[20px]">
                <img className="w-[40px]" src="/images/Logo.svg" alt="LinkBox logo" />
                <p className="text-[1.5rem] font-bold max-[651px]:hidden">LinkBox</p>
              </div>
            </a>
          </div>
          <div className="min-w-[250px] max-w-[600px] flex-1">
            <SearchBar type="text" placeholder="Pesquise" id="inputPesquisa" />
          </div>
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
