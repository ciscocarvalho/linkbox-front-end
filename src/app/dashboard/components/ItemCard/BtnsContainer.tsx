import React, { useContext, useRef } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../../contexts/DashboardContext';
import DashboardItem from '../../DashboardItem';
import * as util from '../../util';
import Button from '../ItemCard/Button';
import DashboardLink from '../../DashboardLink';

interface BtnsContainerProps {
  item: DashboardItem;
  hovering: boolean;
  inSmallScreenWidth: boolean;
  setBackgroundColor: Function;
}

const BtnsContainer: React.FC<BtnsContainerProps> = ({
  item,
  hovering,
  inSmallScreenWidth,
  setBackgroundColor,
}) => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const itemType = util.getItemType(item);
  const showRegular = hovering && !inSmallScreenWidth;
  const isSelected = dashboard.selected.includes(item);
  const classNameForRegularButtons = showRegular ? "" : "hidden";
  const classNameForSelectButton = (hovering || inSmallScreenWidth) ? null : "hidden";

  const edit = () => {
    if (item instanceof DashboardLink) {
      const linkInfo = util.inputLinkInfo();
      if (linkInfo) {
        dispatch({ type: "edit", itemID: item.id, updatedFields: linkInfo });
      }
    } else {
      const folderInfo = util.inputFolderInfo();
      if (folderInfo) {
        dispatch({ type: "edit", itemID: item.id, updatedFields: folderInfo });
      }
    }
  }

  const colorInput = useRef<HTMLInputElement>(null);

  const listenerForColorChange = () => {
    const backgroundColor = colorInput.current!.value;
    dispatch({ type: "edit", itemID: item.id, updatedFields: { backgroundColor } });
    colorInput.current?.removeEventListener("change", listenerForColorChange);
  }

  return (
    <div className={`${itemType}-btns-container btns-container`}>
      <Button
        icon={isSelected ? "check_box" : "check_box_outline_blank"}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: isSelected ? "unselect" : "select", itemID: item.id });
        }}
        className={["select-btn", classNameForSelectButton].filter(className => !!className).join(" ")}
      />

      <Button
        icon="content_copy"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "copy", itemID: item.id, behavior: "exclusive" });
        }}
        className={classNameForRegularButtons}
      />

      <Button
        icon="content_cut"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "cut", itemID: item.id, behavior: "exclusive" });
        }}
        className={classNameForRegularButtons}
      />

      <Button
        icon="palette"
        onClick={(e) => {
          e.stopPropagation();
          colorInput.current?.click();
          // We can't simply use onChange in the react way because react changes
          // its behavior: https://github.com/facebook/react/issues/6308
          colorInput.current?.addEventListener("change", listenerForColorChange)
        }}
        className={`color-btn${(showRegular) ? "" : " hidden"}`}
      >
        <input
          type="color"
          className="color-input"
          ref={colorInput}
          onInput={() => setBackgroundColor(colorInput.current!.value)}
        />
      </Button>

      <Button
        icon="edit"
        onClick={(e) => {
          e.stopPropagation();
          edit();
        }}
        className={classNameForRegularButtons}
      />

      <Button
        icon="delete"
        onClick={(e) => { e.stopPropagation(); dispatch({ type: "remove", itemID: item.id }); }}
        className={classNameForRegularButtons}
      />
    </div>
  );
}

export default BtnsContainer;
