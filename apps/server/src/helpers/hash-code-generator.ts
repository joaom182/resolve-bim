import { createHash } from 'crypto';

export default function generateHashCode(value: string) {
  const hash = createHash('sha256');
  hash.update(value);
  return hash.digest('hex');
}
