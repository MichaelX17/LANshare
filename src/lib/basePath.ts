function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";

  const clean = value.replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "";
}

export const appBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${appBasePath}${normalizedPath}`;
}