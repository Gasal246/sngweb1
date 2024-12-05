const isLogin = () => {
  if (localStorage.getItem("accessToken") === null) return false;
  else return true;
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const removeToken = () => {
  return localStorage.removeItem("accessToken");
};

export { isLogin, getToken, removeToken };