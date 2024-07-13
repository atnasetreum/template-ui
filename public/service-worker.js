function registerServiceWorker() {
  if (typeof window !== "undefined") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        console.log("Service Worker registration successful:", registration);

        const pathname = window.location.pathname;
        const permisson = Notification.permission;

        console.log({
          pathname,
          permisson,
        });
      });
    } else {
      console.error("Service Worker registration failed.");
    }
  }
}

registerServiceWorker();
