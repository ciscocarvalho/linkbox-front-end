"use client";
import React, { useContext } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../contexts/DashboardContext";
import IconButton from "../../../../components/IconButton";
import { removeMany } from "../utils/actions/removeMany";
import BtnsContainer from "./ItemCard/BtnsContainer";
import { useMobileView } from "../../../../hooks/useMobileView";
import { getChildren } from "../services/getChildren";
import { useTranslation } from "react-i18next";

const CardsFooter: React.FC = () => {
  const { t } = useTranslation();
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { mobileView } = useMobileView();
  const { selected, displayedItems } = dashboard;
  const setOfSelected = new Set(selected);
  const allSelected = displayedItems.every((item) => setOfSelected.has(item));

  const toggleSelectAll = () => {
    if (allSelected) {
      dispatch({ type: "reset_selection" });
    } else {
      dispatch({
        type: "select_many",
        items: getChildren(dashboard.currentFolder),
      });
    }
  };

  const copySelected = () => {
    dispatch({ type: "copy_many", items: selected });
    dispatch({ type: "reset_selection" });
  };

  const cutSelected = () => {
    dispatch({ type: "cut_many", items: selected });
    dispatch({ type: "reset_selection" });
  };

  const deleteSelected = async () => {
    await removeMany(selected, dispatch);
    dispatch({ type: "reset_selection" });
  };

  if (selected.length === 0 || (selected.length === 1 && !mobileView)) {
    return null;
  }

  return (
    <footer
      className={`bg-[#efeded] flex flex-wrap justify-end items-center mt-auto gap-x-[20px] gap-y-0 px-0 py-[8px]`}
    >
      <p className="p-[20px]">
        {selected.length}{" "}
        {t("page.dashboard.items.amount-selected", { count: selected.length })}
      </p>
      {selected.length === 1 ? (
        <BtnsContainer
          item={selected[0]}
          setBackgroundColor={() => {}}
          variant={"non_select_only"}
        />
      ) : (
        <div className="flex justify-center items-center">
          {
            <IconButton
              onClick={toggleSelectAll}
              icon={allSelected ? "check_box" : "check_box_outline_blank"}
            />
          }
          <IconButton onClick={copySelected} icon="content_copy" />
          <IconButton onClick={cutSelected} icon="cut" />
          <IconButton onClick={deleteSelected} icon="delete" />
        </div>
      )}
    </footer>
  );
};

export default CardsFooter;
