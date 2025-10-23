// Frontegg Configuration Sample
// Copy this file to config.js and update with your Frontegg credentials

export const DEFAULT_SANDBOX_CONTEXT = {
  // Replace with your Frontegg base URL
  baseUrl: "https://your-tenant.frontegg.com",
  
  // Replace with your Frontegg App ID
  appId: "your-app-id-here",
};

export const ELEMENT_IDS = {
  logoutBtn: "logoutBtn",
  loginBtn: "loginBtn",
  welcomeContent: "welcomeContent",
  signupBanner: "signup-banner",
  accountInfo: "accountInfo",
};

// How to get your Frontegg credentials:
// 1. Sign up at https://frontegg.com/
// 2. Create a new application in your Frontegg dashboard
// 3. Copy the Base URL and App ID from your application settings
// 4. Update the values above with your actual credentials
// 5. Rename this file to config.js
