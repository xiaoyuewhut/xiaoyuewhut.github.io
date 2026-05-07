import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        posts: resolve(__dirname, "posts/index.html"),
        studio: resolve(__dirname, "studio/index.html"),
        buildingWithIntent: resolve(__dirname, "posts/building-with-intent.html"),
        vehicleSystemsAsWriting: resolve(
          __dirname,
          "posts/vehicle-systems-as-writing.html"
        ),
        notesOnQuietInterfaces: resolve(
          __dirname,
          "posts/notes-on-quiet-interfaces.html"
        )
      }
    }
  }
});
