import dayjs from 'dayjs';

export default function formatDate(date: string | Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}
