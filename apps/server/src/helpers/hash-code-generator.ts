import { createHash } from 'crypto';

export default function generateHashCode(value: string) {
  if (!value) return '';
  const hash = createHash('sha256');
  hash.update(value);
  return hash.digest('hex');
}
