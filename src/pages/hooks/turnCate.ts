export default function turnCate(str: string, len: number) {
  return str.length <= len ? str : str.substr(0, len) + '...';
}
