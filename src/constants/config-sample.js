// Frontegg Configuration Sample
// This file shows the structure. For local development, copy to config.js
// For production (Vercel), use environment variables instead

export const DEFAULT_SANDBOX_CONTEXT = {
  // Read from environment variable VITE_FRONTEGG_BASE_URL, or use fallback
  baseUrl: process.env.VITE_FRONTEGG_BASE_URL || "https://your-tenant.frontegg.com",
  
  // Read from environment variable VITE_FRONTEGG_APP_ID, or use fallback
  appId: process.env.VITE_FRONTEGG_APP_ID || "your-app-id-here",
};

export const ELEMENT_IDS = {
  logoutBtn: "logoutBtn",
  loginBtn: "loginBtn",
  welcomeContent: "welcomeContent",
  signupBanner: "signup-banner",
  accountInfo: "accountInfo",
};

// Configuration Methods:
//
// Option 1: Local Development (using config.js)
// 1. Copy this file to config.js
// 2. Update the fallback values above with your Frontegg credentials
//
// Option 2: Environment Variables (recommended for Vercel)
// 1. Set VITE_FRONTEGG_BASE_URL and VITE_FRONTEGG_APP_ID as environment variables
// 2. In Vercel: Project Settings > Environment Variables
// 3. Locally: Create a .env file with:
//    VITE_FRONTEGG_BASE_URL=https://your-tenant.frontegg.com
//    VITE_FRONTEGG_APP_ID=your-app-id-here
//
// How to get your Frontegg credentials:
// 1. Sign up at https://frontegg.com/
// 2. Create a new application in your Frontegg dashboard
// 3. Copy the Base URL and App ID from your application settings
