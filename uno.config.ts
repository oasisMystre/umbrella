import {
  defineConfig,
  transformerDirectives,
  presetWebFonts,
  presetUno,
} from "unocss";

export default defineConfig({
  transformers: [transformerDirectives()],
  shortcuts: {
    "icon-btn": "text-2xl p-2",
    "tab-active":
      "bg-violet-800 px-4 py-1 rounded-full hover:bg-violet-800/70 active:bg-violet-700",
    "tab-inactive":
      "bg-stone-700/50 px-4 py-1 rounded-full hover:bg-stone-700/70 active:bg-stone-600",
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Nunito Sans",
        lato: "Noto Sans",
      },
    }),
  ],
});
