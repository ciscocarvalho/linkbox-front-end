import React, { useContext, useRef } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../../contexts/DashboardContext";
import * as util from "../../utils";
import IconButton from "../../../../../components/IconButton";
import { remove } from "../../utils/actions/remove";
import { refreshDashboard } from "../../utils/actions/refreshDashboard";
import { update } from "../../services/update";
import { DashboardItem } from "../../types";

interface BtnsContainerProps {
  item: DashboardItem;
  setBackgroundColor: Function;
  variant?: "all" | "select_only" | "non_select_only";
}

const BtnsContainer: React.FC<BtnsContainerProps> = ({
  item,
  setBackgroundColor,
  variant = "all",
}) => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const isSelected = util.includesItem(dashboard.selected, item);

  const colorInput = useRef<HTMLInputElement>(null);

  const listenerForColorChange = async () => {
    const backgroundColor = colorInput.current!.value;
    await update(item, { backgroundColor });
    await refreshDashboard(dashboard, dispatch);
    colorInput.current?.removeEventListener("change", listenerForColorChange);
  };

  return (
    <div className={`flex gap-[8px]`}>
      {variant !== "non_select_only" ? (
        <IconButton
          icon={isSelected ? "check_box" : "check_box_outline_blank"}
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: isSelected ? "unselect" : "select", item });
          }}
        />
      ) : null}

      {variant !== "select_only" ? (
        <>
          <IconButton
            icon="content_copy"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "copy", item, behavior: "exclusive" });
            }}
          />
          <IconButton
            icon="content_cut"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "cut", item, behavior: "exclusive" });
            }}
          />
          <IconButton
            icon="palette"
            onClick={(e) => {
              e.stopPropagation();
              colorInput.current?.click();
              // We can't simply use onChange in the react way because react changes
              // its behavior: https://github.com/facebook/react/issues/6308
              colorInput.current?.addEventListener(
                "change",
                listenerForColorChange
              );
            }}
            className={"relative"}
          >
            <input
              type="color"
              className="absolute w-[100%] h-[100%] invisible"
              ref={colorInput}
              onInput={() => setBackgroundColor(colorInput.current!.value)}
            />
          </IconButton>
          <IconButton
            icon="edit"
            onClick={async (e) => {
              e.stopPropagation();
              dispatch({ type: "change_updating_item", item });
            }}
          />
          <IconButton
            icon="delete"
            onClick={async (e) => {
              e.stopPropagation();
              await remove(item, dispatch);
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default BtnsContainer;
