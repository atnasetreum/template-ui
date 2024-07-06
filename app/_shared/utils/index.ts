import CryptoJS from "crypto-js";
import { toast } from "sonner";

const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_CRYPTOJS_KEY!);
const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_CRYPTOJS_IV!);

export const encrypt = (plaintext: string) => {
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return encrypted;
};

export const decrypt = (encrypted: string) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);

  return decrypted;
};

export const notify = (message: string, success?: boolean) => {
  if (success) {
    toast.success("¡ Correcto !", {
      description: message,
    });
  } else {
    toast.error("¡ Atención !", {
      description: message,
    });
  }
};

export const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const dataTimeFormat = (date: Date) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const showNotification = (
  title: string,
  options?: NotificationOptions | undefined
) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      icon: "/assets/images/notifications/icon.png",
      ...options,
    });
  }
};
