import Button from "./Button.js";
import ButtonColor from "./Button/ButtonColor.js";
import ButtonDelete from "./Button/ButtonDelete.js";
import ButtonEdit from "./Button/ButtonEdit.js";
import ButtonSelect from "./Button/ButtonSelect.js";
import DashboardState from "./DashboardState.js";
import Folder from "./Folder.js";
import Link from "./Link.js";

export const getCardsContainer = () => {
    return document.querySelector(".cards-container");
}

export const isCardSelected = (card) => {
    return card.getAttribute("data-card-selected") !== null;
}

const selectCardWithoutEventDispatch = (card) => {
    card.setAttribute("data-card-selected", "");
}

const unselectCardWithoutEventDispatch = (card) => {
    card.removeAttribute("data-card-selected");
}

export const selectCard = (card) => {
    selectCardWithoutEventDispatch(card);
    dispatchCardEvent(new CustomEvent("custom:cardSelected", { detail: { card } }))
}

export const unselectCard = (card) => {
    unselectCardWithoutEventDispatch(card);
    dispatchCardEvent(new CustomEvent("custom:cardUnselected", { detail: { card } }))
}

export const selectAllCards = () => getAllCards().forEach(unselectCard);

export const unselectAllCards = () => getAllCards().forEach(unselectCard);

export const toggleCardSelection = (card) => {
    if (isCardSelected(card)) {
        unselectCard(card);
    } else {
        selectCard(card);
    }
}

export const getAllCards = () => {
    return document.querySelectorAll(".folder-card, .link-card");
}

export const getSelectedCards = () => [...getAllCards()].filter(isCardSelected);

export const elementIsCard = (element) => {
    const { classList } = element
    return classList.contains("folder-card") || classList.contains("link-card");
}

export const getCardType = card => card.classList.contains("link-card") ? "link" : "folder";

export const getItemFromCard = card => {
    const type = getCardType(card);
    const id = parseInt(card.getAttribute(`data-${type}-id`));
    const item = type === "folder" ? Folder.getById(id) : Link.getById(id);
    return item;
}

export const getCardFromItem = item => {
    const itemType = item instanceof Link ? "link" : "folder";
    const itemId = item.getId();

    for (const card of getAllCards()) {
        let dataId = card.getAttribute(`data-${itemType}-id`);

        if (dataId && parseInt(dataId) === itemId) {
            return card;
        }
    }

    return null;
}

const updateFolderCard = (card) => {
    const item = getItemFromCard(card);
    card.querySelector(".folder-name").textContent = item.name;
}

const createLinkImgSrc = (link) => {
    return `https://www.google.com/s2/favicons?domain=${link.url}&sz=32`;;
}

const updateLinkCard = (card) => {
    const link = getItemFromCard(card);
    card.querySelector("img").src = createLinkImgSrc(link);
    card.querySelector(".link-name").textContent = link.name;
    card.querySelector(".link-url").textContent = link.url;
    if (!isCardSelected(card)) {
        card.style.backgroundColor = link.backgroundColor;
    }
}

export const updateCard = card => {
    const type = getCardType(card);

    if (type === "link") {
        updateLinkCard(card);
    } else {
        updateFolderCard(card);
    }
}

export const inputFolderInfo = () => {
    const name = prompt("Name: ");
    if (!name.trim()) return null;

    return { name }
}

export const inputLinkInfo = () => {
    const url = prompt("Url: ");
    if (!url.trim()) return null;
    const name = prompt("Name: ");
    if (!name.trim()) return null;

    return { name, url }
}

export const getLinkImg = (link) => {
    const img = document.createElement("img");
    img.src = createLinkImgSrc(link);
    return img
}

const createFolderDataContainer = (folder) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "folder-data-container";

    const span = document.createElement("span");
    span.className = "material-symbols-outlined";
    span.textContent = "folder";

    const p = document.createElement("p");
    p.className = "folder-name";
    p.textContent = folder.name;

    dataContainer.appendChild(span);
    dataContainer.appendChild(p);

    return dataContainer;
}

export const createLinkDataContainer = (link) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "link-data-container";

    const linkImg = getLinkImg(link);
    const infoContainer = createLinkInfoContainer(link);

    dataContainer.appendChild(linkImg);
    dataContainer.appendChild(infoContainer);

    return dataContainer;
}

export const createLinkInfoContainer = (link) => {
    const linkInfoContainer = document.createElement("div");
    const linkName = document.createElement("p");
    const linkUrl = document.createElement("p");

    linkName.textContent = link.name;
    linkName.className = "link-name";

    linkUrl.textContent = link.url;
    linkUrl.className = "link-url";

    linkInfoContainer.appendChild(linkName);
    linkInfoContainer.appendChild(linkUrl);
    linkInfoContainer.className = "info-container";

    return linkInfoContainer;
}

const createBtnsContainer = (parentCardType, buttons) => {
    if (!buttons) {
        buttons = ["check_box_outline_blank", "content_copy", "content_cut", "palette", "edit", "delete"];
    }

    buttons = buttons.map(btnName => {
        switch (btnName) {
            case "check_box_outline_blank":
                return new ButtonSelect().getElement()
            case "palette":
                return new ButtonColor().getElement()
            case "edit":
                return new ButtonEdit().getElement()
            case "delete":
                return new ButtonDelete().getElement()
            default:
                return new Button(btnName).getElement()
        }
    })

    let btnsContainer = document.createElement("div");
    btnsContainer.classList.add(`${parentCardType}-btns-container`);
    btnsContainer.classList.add("btns-container");

    buttons.forEach((btn) => {
        btnsContainer.appendChild(btn)
    })

    btnsContainer.classList.add("hidden");

    return btnsContainer;
}

const createDataContainer = (itemType, item) => {
  if (itemType === "folder") {
    return createFolderDataContainer(item);
  } else {
    return createLinkDataContainer(item);
  }
};

const createItemCardFactory = (itemType, item) => {
    return () => {
        const card = document.createElement("div");
        card.className = `${itemType}-card`;
        card.style.backgroundColor = item.backgroundColor;
        card.setAttribute(`data-${itemType}-id`, item.getId());

        card.appendChild(createDataContainer(itemType, item));

        const btnsContainer = createBtnsContainer(itemType);
        card.appendChild(btnsContainer);

        card.addEventListener("mouseout", () => btnsContainer.classList.add("hidden"));
        card.addEventListener("mouseover", () => btnsContainer.classList.remove("hidden"));
        unselectCardWithoutEventDispatch(card);

        return card;
    }
}

export const createFolderCard = (folder) => createItemCardFactory("folder", folder)();

export const createLinkCard = (link) => createItemCardFactory("link", link)();

export const changeColor = () =>{
    const cards = document.getElementsByClassName('link-card')
    const card = Array.from(cards) 
    console.log(card)
    console.log(card[1].style.backgroundColor = 'blue')
    //card2.links.colorBackground = "green"
}

const createLink = () => {
    const linkInfo = inputLinkInfo();
    if (!linkInfo) return null;

    return new Link(linkInfo.name, linkInfo.url);
}

const createFolder = () => {
    const folderInfo = inputFolderInfo();
    if (!folderInfo) return null;

    return new Folder(folderInfo.name);
}

const createManageableItem = (itemType) => {
    const creationStrategy = {
        link: createLink,
        folder: createFolder,
    }[itemType];

    if (creationStrategy) return creationStrategy();
}

const createCard = (itemType, itemInfo) => {
    if (itemType === "link") {
        return createLinkCard(itemInfo);
    } else {
        return createFolderCard(itemInfo);
    }
}

export const addEventListenerToCardContainer = (eventName, fn, options) => {
    getCardsContainer().addEventListener(eventName, fn, options);
}

export const removeEventListenerFromCardContainer = (eventName, fn, options) => {
    getCardsContainer().removeEventListener(eventName, fn, options);
}

export const dispatchCardEvent = event => {
    getCardsContainer().dispatchEvent(event);
}

const openFolder = folder => {
    const dashboardState = new DashboardState();
    dashboardState.setCurrentFolder(folder)
}

const openLinkInNewTab = ({ url }) => {
    if (!!url && !/^https?:\/\//i.test(url)) {
        url = `http://${url}`;
    }

    window.open(url, "_blank");
};

const doubleClickCardFn = card => {
    const item = getItemFromCard(card);

    if (item instanceof Link) {
        openLinkInNewTab(item);
    } else {
        openFolder(item);
    }
}

const addManageableItemToUI = (itemType, newItem) => {
    newItem = newItem ?? createManageableItem(itemType);

    if (newItem) {
        const dashboardState = new DashboardState();
        const currentFolder = dashboardState.getCurrentFolder();

        if (!currentFolder.contains(newItem)) {
            currentFolder.addChild(newItem);
            newItem.setParent(currentFolder);
        }

        const card = createCard(itemType, newItem)

        getCardsContainer().appendChild(card);

        card.addEventListener("dblclick", ({ target }) => {
            if (target === card) {
                doubleClickCardFn(card)
            }
        });

        dispatchCardEvent(new CustomEvent("custom:cardAdded", {
            detail: { type: itemType, item: newItem, card }
        }))
    }
}

export const removeCardFromUI = (card) => {
    const container = card.parentElement;
    const filteredContainerChildren = [...container.children].filter(child => child !== card);
    container.replaceChildren(...filteredContainerChildren);
    const cardType = getCardType(card);
    const id = parseInt(card.getAttribute(`data-${cardType}-id`));
    const item = cardType == "link" ? Link.getById(id) : Folder.getById(id)

    dispatchCardEvent(new CustomEvent("custom:cardRemoved", {
        detail: { type: cardType, item, card, allCards: getAllCards() }
    }))
}

const removeManageableItemFromUI = (item) => {
    const card = getCardFromItem(item);

    if (card) {
        removeCardFromUI(card);
    }
}

export const addLinkToUI = (link) => addManageableItemToUI("link", link);

export const addFolderToUI = (folder) => addManageableItemToUI("folder", folder);

export const addItemToUI = (item) => {
    if (item instanceof Link) {
        addLinkToUI(item);
    } else {
        addFolderToUI(item);
    }
}

export const removeItemFromUI = removeManageableItemFromUI;