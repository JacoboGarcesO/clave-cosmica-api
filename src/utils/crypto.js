import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'mi-clave-secreta-de-32-caracteres-123456';
const ALGORITHM = 'aes-256-cbc';

const encrypt = (text) => {
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

const decrypt = (encryptedText) => {
  try {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedData = textParts.join(':');
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
};

const encryptSensitiveFields = (data) => {
  const encryptedData = { ...data };
  
  if (data.transaction_id) {
    encryptedData.transaction_id = encrypt(data.transaction_id);
  }
  
  if (data.accessCode) {
    encryptedData.accessCode = encrypt(data.accessCode);
  }
  
  return encryptedData;
};

const decryptSensitiveFields = (data) => {
  const decryptedData = { ...data };
  
  if (data.transaction_id) {
    try {
      decryptedData.transaction_id = decrypt(data.transaction_id);
    } catch (error) {
      console.error('Error decrypting transaction_id:', error);
    }
  }
  
  if (data.accessCode) {
    try {
      decryptedData.accessCode = decrypt(data.accessCode);
    } catch (error) {
      console.error('Error decrypting accessCode:', error);
    }
  }
  
  return decryptedData;
};

export {
  encrypt,
  decrypt,
  encryptSensitiveFields,
  decryptSensitiveFields
};
