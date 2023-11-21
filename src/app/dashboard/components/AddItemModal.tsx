'use client';
import { Label, Modal, TextInput, Select } from 'flowbite-react';
import { useContext, useRef, useState } from 'react';
import IconButton from "../../components/IconButton";
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import PrimaryButton from '../../components/PrimaryButton';
import { add } from '../util/actions/add';
import { refreshDashboard } from '../util/actions/refreshDashboard';
import { DashboardItem } from '../types';

interface ItemFormProps {
  addItem: Function;
}

interface ItemTextInputProps {
  name: string;
  value: string;
  setValue: Function;
  error: string;
}

const ItemTextInput: React.FC<ItemTextInputProps> = ({ name, value, setValue, error }) => {
  return <TextInput
    type="text"
    name={name}
    value={value}
    onInput={(e: any) => setValue(e.target.value)}
    color={error ? "failure" : undefined}
    helperText={error ? <span>{error}</span> : null}
  />
}

const getFolderNameError = (name: string) => {
  if (name.match(/^\s+$/g)) {
    return "Nome não pode ser composto apenas de espaços em branco";
  }

  if (name.match(/^\s/g)) {
    return "Nome não pode começar com espaço em branco";
  }

  if (name.match(/\s$/g)) {
    return "Nome não pode terminar com espaço em branco";
  }

  name = name.trim();

  if (!name) {
    return "Nome é obrigatório";
  }

  if (name.length > 200) {
    return "Nome não pode ter mais que 200 caracteres";
  }

  if (name.includes("/")) {
    return 'Nome não pode conter "/"';
  }

  return "";
}

const FolderForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const [name, setName] = useState("");
  let [nameError, setNameError] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setNameError(nameError = getFolderNameError(name));

    if (nameError) {
      return;
    }

    const payload = await addItem({ name: name.trim(), items: [] });

    if (!payload?.msg) {
      return;
    }

    const error = payload.msg;

    if (error === "Invalid folder name") {
      setNameError("Nome inválido");
    } else if (error === "Folder name already used") {
      setNameError("Já existe uma pasta com esse nome");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[inherit]">
      <div>
        <Label htmlFor="name" value="Nome" />
        <ItemTextInput name="name" value={name} setValue={setName} error={nameError} />
      </div>

      <PrimaryButton type="submit" className="w-fit h-fit py-[10px] px-[20px] self-end">Adicionar pasta</PrimaryButton>
    </form>
  );
}

const getLinkTitleError = (title: string) => {
  if (title.match(/^\s$/g)) {
    return "Título não pode ser composto apenas de espaços em branco";
  }

  if (title.match(/^\s/g)) {
    return "Título não pode começar com espaço em branco";
  }

  if (title.match(/\s$/g)) {
    return "Título não pode terminar com espaço em branco";
  }

  title = title.trim();

  if (!title) {
    return "Título é obrigatório";
  }

  // About page title length limit: https://www.mediawiki.org/wiki/Page_title_size_limitations
  if (title.length > 300) {
    return "Título não pode ter mais que 300 caracteres";
  }

  return "";
}

const getLinkUrlError = (url: string) => {
  if (url.match(/^\s$/g)) {
    return "URL não pode ser composta apenas de espaços em branco";
  }

  if (url.match(/^\s/g)) {
    return "URL não pode começar com espaço em branco";
  }

  if (url.match(/\s$/g)) {
    return "URL não pode terminar com espaço em branco";
  }

  url = url.trim();

  if (!url) {
    return "URL é obrigatória";
  }

  // About url length limit: https://stackoverflow.com/a/417184
  if (url.length > 2000) {
    return "URL não pode ter mais que 2000 caracteres";
  }

  return "";
}

const LinkForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  let [titleError, setTitleError] = useState("");
  let [urlError, setUrlError] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setTitleError(titleError = getLinkTitleError(title));
    setUrlError(urlError = getLinkUrlError(url));

    if (titleError || urlError) {
      return;
    }

    const payload = await addItem({ title: title.trim(), url: url.trim() });

    if (!payload?.msg) {
      return;
    }

    const error = payload.msg;

    if (error === "Link url already used") {
      setUrlError("Já existe um link com essa URL");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[inherit]">
      <div>
        <Label htmlFor="url" value="URL" />
        <ItemTextInput name="url" value={url} setValue={setUrl} error={urlError} />
      </div>

      <div>
        <Label htmlFor="title" value="Título" />
        <ItemTextInput name="title" value={title} setValue={setTitle} error={titleError} />
      </div>

      <PrimaryButton type="submit" className="w-fit h-fit py-[10px] px-[20px] self-end">Adicionar link</PrimaryButton>
    </form>
  );
}

interface AddItemModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ openModal, setOpenModal }) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [itemType, setItemType] = useState("folder");
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);

  const addItem = async (item: DashboardItem) => {
    const payload = await add(dashboard.currentFolder, item as any as DashboardItem);

    if (payload.msg) {
      return payload;
    } else {
      await refreshDashboard(dashboard, dispatch);
      setOpenModal(false);
    }
  }

  return (
    <Modal dismissible show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
      <Modal.Header />
      <Modal.Body className="flex flex-col gap-[20px]">
        <div className="space-y-6">
          <h3 className="text-xl">Adicionar item</h3>
          <div>
            <Select required onChange={(e) => setItemType(e.target.value)} defaultValue={itemType}>
              <option value="folder">Pasta</option>
              <option value="link">Link</option>
            </Select>
          </div>
        </div>

        {
          itemType === "folder"
            ? <FolderForm addItem={addItem} />
            : <LinkForm addItem={addItem} />
        }
      </Modal.Body>
    </Modal>
  );
}

export default AddItemModal;
