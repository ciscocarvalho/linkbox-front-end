export const getFolderNameError = (name: string) => {
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
