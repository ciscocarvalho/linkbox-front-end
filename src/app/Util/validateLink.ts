export const getTitleError = (title: string) => {
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

export const getUrlError = (url: string) => {
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
