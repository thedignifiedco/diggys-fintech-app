// Configuration with environment variable support
// Environment variables are set in Vercel or via .env file locally
// Fallback to default sandbox values if not set

export const DEFAULT_SANDBOX_CONTEXT = {
  baseUrl: process.env.VITE_FRONTEGG_BASE_URL,
  appId: process.env.VITE_FRONTEGG_APP_ID,
};

export const ELEMENT_IDS = {
  logoutBtn: "logoutBtn",
  loginBtn: "loginBtn",
  welcomeContent: "welcomeContent",
  signupBanner: "signup-banner",
  accountInfo: "accountInfo",
};
