"use client";
import React, { useEffect, useReducer, useState } from "react";
import SearchBar from "./SearchBar";
import { DashboardView } from "../types";
import { dashboardReducer } from "../utils/dashboardReducer";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../contexts/DashboardContext";
import CardsContainer from "./CardsContainer";
import CardsHeader from "./CardsHeader";
import CardsFooter from "./CardsFooter";
import { includesItem } from "../utils";
import IconButton from "../../../../components/IconButton";
import { Dropdown } from "flowbite-react";
import logout from "../services/logout";
import Icon from "../../../../components/Icon";
import { getFolderByPath } from "../services/getFolderByPath";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import EditItemModal from "./EditItemModal";
import { useToken } from "../../../../hooks/useToken";
import { useIsClient } from "../../../../hooks/useIsClient";

const BaseDashboard: React.FC = () => {
  const { removeToken } = useToken();
  const { currentUser, loading: loadingCurrentUser } = useCurrentUser();

  const initialDashboard: DashboardView = {
    displayedItems: [],
    selected: [],
    clipboard: { copied: [], cut: [] },
    currentFolder: null as any,
    dataOfCurrentFolder: null as any,
  };

  const [dashboard, dispatch] = useReducer(dashboardReducer, initialDashboard);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const { displayedItems } = dashboard;
  const hasItems = displayedItems.length > 0;

  useEffect(() => {
    const getInitialFolder = async () => {
      const folderWithData = await getFolderByPath("");

      if (!folderWithData) {
        setUserLoggedIn(false);
        return;
      }

      return folderWithData;
    };

    getInitialFolder().then(async (folderWithData) => {
      if (folderWithData) {
        dispatch({
          type: "open_folder",
          folder: folderWithData.item,
          data: folderWithData,
        });
      }
    });
  }, []);

  if (!userLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  if (!dashboard.currentFolder) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    removeToken();
  };

  return (
    <DashboardContext.Provider value={dashboard}>
      <DashboardDispatchContext.Provider value={dispatch}>
        <nav className="flex justify-between p-[24px] bg-[#2795DB] items-center gap-[40px] max-[651px]:gap-[20px] max-[651px]:justify-around max-[651px]:p-[24px]">
          <div className="flex justify-start flex-1 min-w-[fit-content]">
            <a href="/">
              <div className="flex items-center gap-[20px]">
                <img
                  className="w-[40px]"
                  src="/images/logo/logo.svg"
                  alt="LinkBox logo"
                />
                <p className="text-[1.5rem] font-bold max-[651px]:hidden">
                  LinkBox
                </p>
              </div>
            </a>
          </div>
          <div className="min-w-[50%] max-w-[600px] flex-1">
            <SearchBar type="text" placeholder="Pesquise" id="inputPesquisa" />
          </div>
          <div className="flex-1 flex justify-end">
            <Dropdown
              label=""
              placement="bottom-end"
              renderTrigger={() => (
                <div>
                  <IconButton icon="more_vert" />
                </div>
              )}
              className="max-w-[250px]"
            >
              <Dropdown.Header>
                <span className="block truncate text-lg">
                  {loadingCurrentUser
                    ? "Carregando..."
                    : currentUser?.username ?? ""}
                </span>
                <span className="block truncate">
                  {loadingCurrentUser
                    ? "Carregando..."
                    : currentUser?.email ?? ""}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                icon={() => <Icon name="logout" />}
                onClick={handleLogout}
              >
                <span className="ml-[10px]">Sair</span>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </nav>

        <main className="h-[100%] flex flex-col overflow-y-auto">
          <EditItemModal />
          <CardsHeader />
          {hasItems ? (
            <CardsContainer items={displayedItems} />
          ) : (
            <p
              className={
                "my-0 mx-auto w-[80%] h-[100%] flex justify-center items-center text-center text-[1.5rem] font-bold"
              }
            >
              Esta pasta está vazia.
              <br />
              Adicione um link ou uma pasta clicando no botão +
            </p>
          )}
          <CardsFooter />
        </main>
      </DashboardDispatchContext.Provider>
    </DashboardContext.Provider>
  );
};

const Dashboard: React.FC = () => {
  const { getToken } = useToken();
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  if (!getToken()) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="h-[100vh] flex flex-col">
      <BaseDashboard />
    </div>
  );
};

export default Dashboard;
