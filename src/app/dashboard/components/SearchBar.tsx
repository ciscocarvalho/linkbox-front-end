"use client";
import React, { useContext, useRef } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import { itemIsFolder, itemIsLink } from "../util";
import { getChildren } from "../util/actions/getChildren";
import { DashboardItem } from '../types';
import Icon from '../../components/Icon';
import { TextInput } from 'flowbite-react';

const SearchBar: React.FC<JSX.IntrinsicElements["input"]> = () => {
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const searchBar = useRef<HTMLInputElement>(null);
  const allItems = getChildren(dashboard.currentFolder);

  const setItems = (items: DashboardItem[]) => {
    dispatch({ type: "undisplay_many", items: allItems })
    dispatch({ type: "display_many", items: items })
  }

  const filterItems = (query: string) => {
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
  }

  return (
    <TextInput
      type="text"
      placeholder="Pesquise"
      rightIcon={() => <Icon name="search" />}
      onInput={(e: any) => filterItems(e.target.value)}
      ref={searchBar}
    />
  );
};

export default SearchBar;
