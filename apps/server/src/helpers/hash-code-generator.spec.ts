import generateHashCode from './hash-code-generator';

describe('hash-code-generator', () => {
  it('should generate a hashcode', () => {
    const hashCode = generateHashCode('test');
    expect(hashCode).toBe(
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    );
  });

  it('should not generate a hashcode if string is empty', () => {
    const hashCode = generateHashCode('');
    expect(hashCode).toBeFalsy();
  });
});
