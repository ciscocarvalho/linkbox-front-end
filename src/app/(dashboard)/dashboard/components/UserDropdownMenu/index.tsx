"use client";
import React, { useState } from "react";
import IconButton from "../../../../../components/IconButton";
import Icon from "../../../../../components/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";
import logout from "../../services/logout";
import { useToken } from "../../../../../hooks/useToken";
import AccountDialog from "../UserDropdownMenu/AccountDialog";

const UserDropdownMenu: React.FC = () => {
  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const {
    currentUser,
    loading: loadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useCurrentUser();
  const { removeToken } = useToken();
  const handleLogout = async () => {
    await logout();
    removeToken();
  };

  const handleAccount = () => {
    setOpenAccountDialog(true);
  };

  return (
    <>
      <AccountDialog
        open={openAccountDialog}
        onOpenChange={setOpenAccountDialog}
        currentUser={currentUser}
        refetchCurrentUser={refetchCurrentUser}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div>
            <IconButton icon="more_vert" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="max-w-[250px]">
          <DropdownMenuLabel>
            <div className="font-normal">
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
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem
            onClick={handleAccount}
            className={"cursor-pointer"}
          >
            <Icon name="person" />
            <span className="ml-[10px]">Conta</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleLogout} className={"cursor-pointer"}>
            <Icon name="logout" />
            <span className="ml-[10px]">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdownMenu;
