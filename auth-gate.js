/**
 * Shared auth helpers for Enuana HMS module pages (vanilla JS ES module).
 * Import after Firebase app is initialized, or copy the constants into each page.
 */
export const ALLOWED_ADMIN_EMAILS = [
  "onyekamiracle08@gmail.com",
  "onyekaudechukwum@gmail.com",
  "replace_with_third_admin_email@example.com"
];

export function isAdminEmail(email) {
  return ALLOWED_ADMIN_EMAILS.includes((email || "").toLowerCase().trim());
}

export function readSessionCache() {
  try {
    const raw = sessionStorage.getItem("enuana_staff");
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !data.ts || Date.now() - data.ts > 8 * 60 * 60 * 1000) return null;
    return data;
  } catch {
    return null;
  }
}

export function writeSessionCache(payload) {
  try {
    sessionStorage.setItem("enuana_staff", JSON.stringify({ ...payload, ts: Date.now() }));
  } catch (_) {}
}

export function clearSessionCache() {
  try {
    sessionStorage.removeItem("enuana_staff");
  } catch (_) {}
}

/**
 * Race a promise against a timeout (ms). Rejects with Error('timeout').
 */
export function withTimeout(promise, ms = 6000) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))
  ]);
}

export const ROLE_PAGES = {
  frontdesk: "frontdesk.html",
  hr: "hr.html",
  accounts: "accounts.html",
  admin: "admin.html"
};
