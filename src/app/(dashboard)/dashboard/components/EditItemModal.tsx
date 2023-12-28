"use client";
import { Label, Modal, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  DashboardContext,
  DashboardDispatchContext,
} from "../contexts/DashboardContext";
import PrimaryButton from "../../../../components/PrimaryButton";
import { refreshDashboard } from "../utils/actions/refreshDashboard";
import { DashboardFolder, DashboardItem, DashboardLink } from "../types";
import { itemIsFolder } from "../utils";
import { update } from "../services/update";
import { getTitleError, getUrlError } from "../utils/validateLink";
import { getFolderNameError } from "../utils/validateFolder";

interface ItemFormProps {
  editItem: Function;
}

interface ItemTextInputProps {
  name: string;
  value: string;
  setValue: Function;
  error: string;
}

const ItemTextInput: React.FC<ItemTextInputProps> = ({
  name,
  value,
  setValue,
  error,
}) => {
  return (
    <TextInput
      type="text"
      name={name}
      value={value}
      onInput={(e: any) => setValue(e.target.value)}
      color={error ? "failure" : undefined}
      helperText={error ? <span>{error}</span> : null}
    />
  );
};

type FolderFormProps = ItemFormProps & { folder: DashboardFolder };

const FolderForm: React.FC<FolderFormProps> = ({ editItem, folder }) => {
  const [name, setName] = useState(folder.name);
  let [nameError, setNameError] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setNameError((nameError = getFolderNameError(name)));

    if (nameError) {
      return;
    }

    const payload = await editItem({ name: name.trim() });

    payload?.errors?.forEach(({ message }: { message: string }) => {
      if (message === "Invalid folder name") {
        setNameError("Nome inválido");
      } else if (message === "Folder name already used") {
        setNameError("Já existe uma pasta com esse nome");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[inherit]">
      <div className="space-y-6">
        <h3 className="text-xl">Editar pasta</h3>
      </div>

      <div>
        <Label htmlFor="name" value="Nome" />
        <ItemTextInput
          name="name"
          value={name}
          setValue={setName}
          error={nameError}
        />
      </div>

      <PrimaryButton
        type="submit"
        className="w-fit h-fit py-[10px] px-[20px] self-end"
      >
        Salvar
      </PrimaryButton>
    </form>
  );
};

type LinkFormProps = ItemFormProps & { link: DashboardLink };

const LinkForm: React.FC<LinkFormProps> = ({ editItem, link }) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  let [titleError, setTitleError] = useState("");
  let [urlError, setUrlError] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setTitleError((titleError = getTitleError(title)));
    setUrlError((urlError = getUrlError(url)));

    if (titleError || urlError) {
      return;
    }

    const payload = await editItem({ title: title.trim(), url: url.trim() });

    payload?.errors?.forEach(({ message }: { message: string }) => {
      if (message === "Link url already used") {
        setUrlError("Já existe um link com essa URL");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[inherit]">
      <div className="space-y-6">
        <h3 className="text-xl">Editar link</h3>
      </div>

      <div>
        <Label htmlFor="url" value="URL" />
        <ItemTextInput
          name="url"
          value={url}
          setValue={setUrl}
          error={urlError}
        />
      </div>

      <div>
        <Label htmlFor="title" value="Título" />
        <ItemTextInput
          name="title"
          value={title}
          setValue={setTitle}
          error={titleError}
        />
      </div>

      <PrimaryButton
        type="submit"
        className="w-fit h-fit py-[10px] px-[20px] self-end"
      >
        Salvar
      </PrimaryButton>
    </form>
  );
};

const EditItemModal: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);
  const { updatingItem: item } = dashboard;
  const [openModal, setOpenModal] = useState(!!item);

  useEffect(() => {
    setOpenModal(!!item);
  }, [item]);

  if (!item) {
    return;
  }

  const handleOnClose = () => {
    dispatch({ type: "change_updating_item" });
  };

  const editItem = async (updatedFields: Partial<DashboardItem>) => {
    const payload = await update(item, updatedFields);

    if (payload?.errors) {
      return payload;
    } else {
      await refreshDashboard(dashboard, dispatch);
      setOpenModal(false);
    }
  };

  return (
    <Modal
      dismissible
      show={openModal}
      size="md"
      popup
      onClose={handleOnClose}
      initialFocus={emailInputRef}
    >
      <Modal.Header />
      <Modal.Body className="flex flex-col gap-[20px]">
        {itemIsFolder(item) ? (
          <FolderForm editItem={editItem} folder={item} />
        ) : (
          <LinkForm editItem={editItem} link={item} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditItemModal;
