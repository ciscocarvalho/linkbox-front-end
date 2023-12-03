'use client';
import { Label, Modal, Select } from 'flowbite-react';
import { useContext, useRef, useState } from 'react';
import { DashboardContext, DashboardDispatchContext } from '../contexts/DashboardContext';
import PrimaryButton from '../../components/PrimaryButton';
import { add } from '../util/actions/add';
import { refreshDashboard } from '../util/actions/refreshDashboard';
import { DashboardItem } from '../types';
import { getItemID } from '../util';
import { getFolderNameError } from '../../Util/validateFolder';
import { getTitleError, getUrlError } from '../../Util/validateLink';
import { Form } from '../../../hooks/useForm';
import MyTextInput from '../../components/Form/MyTextInput';
import { useValidationForm } from '../../../hooks/useValidationForm';

interface ItemFormProps {
  addItem: Function;
}

const FolderForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const getPayload = async (form: Form) => {
    return await addItem({ name: form.name.value.trim(), items: [] });
  }

  const itemType = "ITEM_ERROR";
  const form = { name: { value: "", validate: getFolderNameError } };

  const { context, errorModal } = useValidationForm(getPayload, itemType, form);
  const { onSubmit, getValue, setters, getError } = context;

  return (
    <>
      {errorModal}
      <form onSubmit={onSubmit} className="flex flex-col gap-[inherit]">
        <div>
          <Label htmlFor="name" value="Nome" />
          <MyTextInput variant="small" name="name" value={getValue("name")} setValue={setters.name} error={getError("name")} />
        </div>

        <PrimaryButton type="submit" className="w-fit h-fit py-[10px] px-[20px] self-end">Adicionar pasta</PrimaryButton>
      </form>
    </>
  );
}

const LinkForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const getPayload = async (form: Form) => {
    return await addItem({
      title: form.title.value.trim(),
      url: form.url.value.trim(),
    });
  }

  const errorType = "ITEM_ERROR";
  const form = {
    title: { value: "", validate: getTitleError },
    url: { value: "", validate: getUrlError },
  };

  const { context, errorModal } = useValidationForm(getPayload, errorType, form);
  const { onSubmit, getValue, setters, getError } = context;

  return (
    <>
      {errorModal}
      <form onSubmit={onSubmit} className="flex flex-col gap-[inherit]">
        <div>
          <Label htmlFor="url" value="URL" />
          <MyTextInput variant="small" name="url" value={getValue("url")} setValue={setters.url} error={getError("url")} />
        </div>

        <div>
          <Label htmlFor="title" value="Título" />
          <MyTextInput variant="small" name="title" value={getValue("title")} setValue={setters.title} error={getError("title")} />
        </div>

        <PrimaryButton type="submit" className="w-fit h-fit py-[10px] px-[20px] self-end">Adicionar link</PrimaryButton>
      </form>
     </>
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
