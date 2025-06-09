import ShortUniqueId from 'short-unique-id';

export function generateReferenceId(length: number): string {
  const uid = new ShortUniqueId();
  return uid.randomUUID(length);
}

export default function getIndianDateObject(dateAsString: string) {
  return new Date(dateAsString).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}
