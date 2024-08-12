export const generateRandomPasswordForUser = () => {
  const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
  const numericCharset = "0123456789";
  const specialcharacter = "#$@!%&+=";
  let password = "";

  // Generate at least 1 lowercase letter
  const lowercaseIndex = Math.floor(Math.random() * lowercaseCharset.length);
  password += lowercaseCharset[lowercaseIndex];

  // Generate at least 1 number
  const numericIndex = Math.floor(Math.random() * numericCharset.length);
  password += numericCharset[numericIndex];
  const specialcharIndex = Math.floor(Math.random() * specialcharacter.length);
  password += specialcharacter[specialcharIndex];

  // Generate remaining characters
  const remainingLength = Math.max(0, 7);
  const charset = lowercaseCharset + numericCharset;
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};
