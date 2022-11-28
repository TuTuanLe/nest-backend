import * as CryptoJS from 'crypto-js';

export const encrypt = (data: string) => {
  const b = new Buffer(encodeURIComponent(CryptoJS.AES.encrypt(data, process.env.CRYPTO_SECRET).toString()));
  return b.toString('base64');
};

export const decrypt = (data: string) => {
  const b = new Buffer(data, 'base64');
  const str = b.toString();
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(str), process.env.CRYPTO_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};
