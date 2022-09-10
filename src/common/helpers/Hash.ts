import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export class Hash {
  static make(plainText) {
    const salt = genSaltSync(10);
    return hashSync(plainText, salt);
  }

  static compare(plainText, hash) {
    return compareSync(plainText, hash);
  }
}
