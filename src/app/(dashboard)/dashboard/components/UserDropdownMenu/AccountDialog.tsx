"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import { z } from "zod";
import accountSchema from "../../../../../schemas/accountSchema";

type DialogProps = React.ComponentProps<typeof Dialog>;
type AccountDialogProps = Required<
  Pick<DialogProps, "open" | "onOpenChange">
> & {
  currentUser: z.infer<typeof accountSchema> | null;
  refetchCurrentUser: () => Promise<any>;
};

const AccountDialog: React.FC<AccountDialogProps> = ({
  open,
  onOpenChange,
  currentUser,
  refetchCurrentUser,
}) => {
  const [itemType, setItemType] = useState("profile");
  const closeDialog = () => onOpenChange(false);
  const onSuccess = async () => {
    await refetchCurrentUser();
    closeDialog();
  };

  let formElement = null;

  if (itemType === "password") {
    formElement = <PasswordForm onSuccess={onSuccess} />;
  } else if (currentUser) {
    formElement = (
      <ProfileForm onSuccess={onSuccess} defaultValues={currentUser} />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader />
      <DialogContent>
        <div className="space-y-6">
          <h3 className="text-xl">Conta</h3>

          <Select
            onValueChange={(value) => setItemType(value)}
            defaultValue={itemType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="profile">Perfil</SelectItem>
                <SelectItem value="password">Senha</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {formElement}
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialog;
