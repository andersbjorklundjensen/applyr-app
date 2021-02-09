export default (password: string): boolean => {
  if (!password) return false;
  if (password.length > 30) return false;
  if (password.length < 8) return false;
  return true;
}