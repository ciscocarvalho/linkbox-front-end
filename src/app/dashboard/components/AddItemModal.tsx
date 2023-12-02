'use client';
import { Label, Modal, TextInput, Select } from 'flowbite-react';
import { useContext, useRef, useState } from 'react';
import IconButton from "../../components/IconButton";
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import PrimaryButton from '../../components/PrimaryButton';
import { add } from '../util/actions/add';
import { refreshDashboard } from '../util/actions/refreshDashboard';
import { DashboardItem } from '../types';
import { getItemID } from '../util';
import { getFolderNameError } from '../../Util/validateFolder';
import { getTitleError, getUrlError } from '../../Util/validateLink';

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

    payload?.errors?.forEach(({ message }: { message: string }) => {
      if (message === "Invalid folder name") {
        setNameError("Nome inválido");
      } else if (message === "Folder name already used") {
        setNameError("Já existe uma pasta com esse nome");
      }
    });
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

const LinkForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  let [titleError, setTitleError] = useState("");
  let [urlError, setUrlError] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setTitleError(titleError = getTitleError(title));
    setUrlError(urlError = getUrlError(url));

    if (titleError || urlError) {
      return;
    }

    const payload = await addItem({ title: title.trim(), url: url.trim() });

    payload?.errors?.forEach(({ message }: { message: string }) => {
      if (message === "Link url already used") {
        setUrlError("Já existe um link com essa URL");
      }
    });
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
  const [itemType, setItemType] = useState("link");
  const dashboard = useContext(DashboardContext);
  const dispatch = useContext(DashboardDispatchContext);

  const addItem = async (item: DashboardItem) => {
    const payload = await add(getItemID(dashboard.currentFolder), item as any as DashboardItem);

    if (payload?.errors) {
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
              <option value="link">Link</option>
              <option value="folder">Pasta</option>
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
