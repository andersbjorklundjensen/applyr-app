export default (username: string) => {
  if (username.length > 30) return false;
  else return true;
}