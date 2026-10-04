export const getCsrfToken = () => {
  const cookies = document.cookie.split(";").map(c => c.trim());
  const csrf = cookies.find(c => c.startsWith("csrf_token="));
  return csrf ? csrf.split("=")[1] : null;
};
