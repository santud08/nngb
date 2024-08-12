import crypto from "crypto";

function encryptData(data, encryptionKey, iv) {
  const encryptedData = {};

  Object.keys(data).forEach((key) => {
    if (data[key] !== "") {
      const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
      let encryptedValue = cipher.update(data[key], "utf8", "base64");
      encryptedValue += cipher.final("base64");
      encryptedData[key] = encryptedValue;
    } else {
      encryptedData[key] = data[key];
    }
  });

  return encryptedData;
}

function decryptData(data, encryptionKey, iv) {
  const decryptedData = {};

  Object.keys(data).forEach((key) => {
    const encryptedValue = data[key];
    const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
    decipher.setAutoPadding(false); // Disable automatic padding
    let decryptedValue = decipher.update(encryptedValue, "base64", "utf8");
    decryptedValue += decipher.final("utf8");

    // Remove padding
    const paddingLength = decryptedValue.charCodeAt(decryptedValue.length - 1);
    decryptedValue = decryptedValue.slice(0, -paddingLength);

    decryptedData[key] = decryptedValue;
  });

  return decryptedData;
}


export { encryptData, decryptData };
