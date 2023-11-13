import React, { useContext, useRef } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../../contexts/DashboardContext';
import DashboardItem from '../../DashboardItem';
import * as util from '../../util';
import IconButton from '../../../components/IconButton';
import DashboardLink from '../../DashboardLink';
import { remove } from '../../util/actions/remove';
import { edit } from '../../util/actions/edit';
import DashboardFolder from '../../DashboardFolder';

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

  const editItem = () => {
    if (item instanceof DashboardLink) {
      const linkInfo = util.inputLinkInfo();
      if (linkInfo) {
        edit(item, linkInfo, dispatch);
      }
    } else {
      const folderInfo = util.inputFolderInfo();
      if (folderInfo) {
        edit(item as DashboardFolder, folderInfo, dispatch);
      }
    }
  }

  const colorInput = useRef<HTMLInputElement>(null);

  const listenerForColorChange = () => {
    const backgroundColor = colorInput.current!.value;
    edit(item, { backgroundColor }, dispatch);
    colorInput.current?.removeEventListener("change", listenerForColorChange);
  }

  return (
    <div className={`flex gap-[8px]`}>
      {
        hovering || inSmallScreenWidth
          ? <IconButton
            icon={isSelected ? "check_box" : "check_box_outline_blank"}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: isSelected ? "unselect" : "select", item });
            }}
          />
          : null
      }

      {
        showRegular
          ? <>
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
                colorInput.current?.addEventListener("change", listenerForColorChange)
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
              onClick={(e) => {
                e.stopPropagation();
                editItem();
              }}
              className={showRegular}
            />
            <IconButton
              icon="delete"
              onClick={(e) => { e.stopPropagation(); remove(item, dispatch); }}
              className={showRegular}
            />
          </>
          : null
      }
    </div>
  );
}

export default BtnsContainer;
