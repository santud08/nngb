/**
 * Generate an encryption key based on the specified format
 * @param format - The encryption format (aes128 or seed128)
 */
export const generateBusinessEncryptionKey = (format) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const keyLength = 14;
  let key = "";

  const isValidFormat = /^(aes128|seed128)$/i.test(format);

  if (!isValidFormat) {
    throw new Error("Invalid encryption format");
  }

  // Generate a random key for aes128 format
  if (format.toLowerCase() === "aes128") {
    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }
  }

  // Generate a random key for seed128 format
  if (format.toLowerCase() === "seed128") {
    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }
  }

  return key;
};
