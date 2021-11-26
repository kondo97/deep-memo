export default function turnCate(str: string, len: number) {
  return str.length <= len ? str : String(str).substr(0, len) + '...';
}
