export default (username: string) => {
  if (username.length === 0) return false;
  if (username.length > 30) return false;
  else return true;
}