import fetchJsonPayload from '../fetchJsonPayload';

const logout = async () => {
  await fetchJsonPayload("post", "/auth/signout");
};

export default logout;
