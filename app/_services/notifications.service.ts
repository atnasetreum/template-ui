import { axiosWrapper } from "./axiosWrapper";

const api = axiosWrapper({
  baseURL: "/notifications",
});

interface DataPublicKey {
  type: string;
  data: number[];
}

const getPublicKey = async () => {
  const { data } = await api.get<DataPublicKey>("/key");
  return Buffer.from(new Uint8Array(data.data));
};

const sendSubscription = async (subscription: PushSubscriptionJSON) => {
  const { data } = await api.post("/subscribe", {
    subscription: JSON.stringify(subscription),
  });
  return data;
};

const saveSubscribe = async (registration: ServiceWorkerRegistration) => {
  return new Promise(async (resolve) => {
    getPublicKey().then((applicationServerKey) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        })
        .then((res) => res.toJSON())
        .then((subscription) => {
          sendSubscription(subscription).then(resolve);
        });
    });
  });
};

const push = async () => {
  const { data } = await api.post("/push");
  return data;
};

export const NotificationsService = {
  getPublicKey,
  sendSubscription,
  saveSubscribe,
  push,
};
