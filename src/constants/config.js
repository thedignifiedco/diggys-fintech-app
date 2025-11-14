// Configuration with environment variable support
// Environment variables are set in Vercel or via .env file locally
// Fallback to default sandbox values if not set

export const DEFAULT_SANDBOX_CONTEXT = {
  baseUrl: process.env.VITE_FRONTEGG_BASE_URL || "https://dignifiedlabs-dev.frontegg.com",
  appId: process.env.VITE_FRONTEGG_APP_ID || "61738a0b-2dfa-49fe-b5fd-320bb2e279cf",
};

export const ELEMENT_IDS = {
  logoutBtn: "logoutBtn",
  loginBtn: "loginBtn",
  welcomeContent: "welcomeContent",
  signupBanner: "signup-banner",
  accountInfo: "accountInfo",
};
