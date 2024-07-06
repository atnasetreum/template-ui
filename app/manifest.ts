import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#00BDBD",
    background_color: "#00BDBD",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "Temlate",
    short_name: "template",
    description: "template",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
