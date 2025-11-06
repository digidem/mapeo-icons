import { copyFile, mkdir, readdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));
const cssTreePatch = resolve(
  currentDir,
  "node_modules/css-tree/data/patch.json",
);
const cssTreeCssoPatch = resolve(
  currentDir,
  "node_modules/csso/node_modules/css-tree/data/patch.json",
);
const repoRoot = currentDir;

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function copyCssTreeData(nitro) {
  const nitroNodeModulesDir = join(
    nitro.options.output.serverDir,
    "node_modules",
    ".nitro",
  );

  let entries;
  try {
    entries = await readdir(nitroNodeModulesDir);
  } catch {
    nitro.logger?.warn?.(
      "[css-tree-patch] Nitro output not found. Skipping css-tree data copy.",
    );
    return;
  }

  const candidates = [
    resolve(repoRoot, "node_modules/css-tree"),
    resolve(repoRoot, "node_modules/csso/node_modules/css-tree"),
  ];

  const sources = new Map();

  for (const pkgDir of candidates) {
    try {
      const pkg = JSON.parse(
        await readFile(join(pkgDir, "package.json"), "utf8"),
      );
      const dataDir = join(pkgDir, "data");

      if (await pathExists(dataDir)) {
        sources.set(`css-tree@${pkg.version}`, dataDir);
      }
    } catch {
      // Ignore missing packages or malformed package.json files
    }
  }

  for (const entry of entries) {
    if (!entry.startsWith("css-tree@")) {
      continue;
    }

    const sourceDir = sources.get(entry);
    if (!sourceDir) {
      nitro.logger?.warn?.(
        `[css-tree-patch] No source data directory found for ${entry}. css-tree patch.json may still be missing.`,
      );
      continue;
    }

    const destinationDir = join(nitroNodeModulesDir, entry, "data");
    await mkdir(destinationDir, { recursive: true });

    const files = await readdir(sourceDir);
    await Promise.all(
      files.map(async (file) => {
        const from = join(sourceDir, file);
        const to = join(destinationDir, file);
        await copyFile(from, to);
      }),
    );
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  // Global page headers
  app: {
    head: {
      title: "CoMapeo Icons Generator",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Global CSS
  css: ["~/assets/main.css"],

  // Modules
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],

  nitro: {
    externals: {
      external: ["svgo", "potrace"],
      traceInclude: [cssTreePatch, cssTreeCssoPatch],
    },
    hooks: {
      async compiled(nitro) {
        await copyCssTreeData(nitro);
      },
    },
  },

  // i18n configuration
  i18n: {
    langDir: "locales/",
    lazy: true,
    defaultLocale: "en",
    strategy: "prefix_except_default",
    vueI18n: "./i18n.config.ts",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "pt", name: "Português", file: "pt.json" },
      { code: "es", name: "Español", file: "es.json" },
      { code: "th", name: "ไทย", file: "th.json" },
      { code: "nl", name: "Nederlands", file: "nl.json" },
      { code: "fr", name: "Français", file: "fr.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    restructureDir: ".",
  },

  devtools: { enabled: true },
});
