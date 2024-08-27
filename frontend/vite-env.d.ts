/// <reference types="vite/client" />
import "vite/client";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Додайте інші змінні середовища, які ви використовуєте
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
