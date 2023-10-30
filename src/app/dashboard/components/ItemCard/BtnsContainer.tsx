import React, { useContext, useRef } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../../contexts/DashboardContext';
import DashboardItem from '../../DashboardItem';
import * as util from '../../util';
import IconButton from '../../../components/IconButton';
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
  const showRegular = hovering && !inSmallScreenWidth;
  const isSelected = dashboard.selected.includes(item);
  const classNameForRegularButtons = showRegular ? "" : "hidden";
  const classNameForSelectButton = (hovering || inSmallScreenWidth) ? undefined : "hidden";

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
    <div className={`flex gap-[8px]`}>
      <IconButton
        icon={isSelected ? "check_box" : "check_box_outline_blank"}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: isSelected ? "unselect" : "select", itemID: item.id });
        }}
        className={classNameForSelectButton}
      />

      <IconButton
        icon="content_copy"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "copy", itemID: item.id, behavior: "exclusive" });
        }}
        className={classNameForRegularButtons}
      />

      <IconButton
        icon="content_cut"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "cut", itemID: item.id, behavior: "exclusive" });
        }}
        className={classNameForRegularButtons}
      />

      <IconButton
        icon="palette"
        onClick={(e) => {
          e.stopPropagation();
          colorInput.current?.click();
          // We can't simply use onChange in the react way because react changes
          // its behavior: https://github.com/facebook/react/issues/6308
          colorInput.current?.addEventListener("change", listenerForColorChange)
        }}
        className={`relative${(showRegular) ? "" : " hidden"}`}
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
        onClick={(e) => {
          e.stopPropagation();
          edit();
        }}
        className={classNameForRegularButtons}
      />

      <IconButton
        icon="delete"
        onClick={(e) => { e.stopPropagation(); dispatch({ type: "remove", itemID: item.id }); }}
        className={classNameForRegularButtons}
      />
    </div>
  );
}

export default BtnsContainer;
