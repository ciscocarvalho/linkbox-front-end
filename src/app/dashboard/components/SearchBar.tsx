"use client";
import React, { useContext, useRef } from 'react';
import DashboardItem from '../DashboardItem';
import { itemIsFolder, itemIsLink } from '../util';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import Input from '../../components/Input';
import { getChildren } from '../util/services/getChildren';

const SearchBar: React.FC<JSX.IntrinsicElements["input"]> = ({ ...inputProps }) => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const searchBar = useRef<HTMLInputElement>(null);
  const allItems = getChildren(dashboard.currentFolder);

  const setItems = (items: DashboardItem[]) => {
    dispatch({ type: "undisplay_many", items: allItems })
    dispatch({ type: "display_many", items: items })
  }

  return (
    <Input
      onInput={() => {
        const query = searchBar.current?.value;

        if (!query) {
          setItems(allItems);
          return;
        }

        setItems(allItems.filter((item) => {
          if (itemIsFolder(item)) {
            const { name } = item;
            return name && name.includes(query);
          } else if (itemIsLink(item)) {
            const { title, url } = item;
            return title.includes(query) || url.includes(query);
          }
        }))
      }}
      {...inputProps}
      ref={searchBar}
    />
  );
};

export default SearchBar;
