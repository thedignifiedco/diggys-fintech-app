import { initialize } from "@frontegg/js";
import "./styles/globals.css";
import { createAccountInfo } from "./components/accountInfo";

const DEFAULT_SANDBOX_CONTEXT = {
  baseUrl: "https://sandbox.frontegg.com",
  clientId: "9af126b9-c35f-4e2d-a3f1-c261e22aaf4a",
};

// Initialize Frontegg
const frontegg = initialize({
  contextOptions: {
    baseUrl: DEFAULT_SANDBOX_CONTEXT.baseUrl,
    clientId: DEFAULT_SANDBOX_CONTEXT.clientId,
  },
  hostedLoginBox: true,
});

// Elements
const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn");
const welcomeContent = document.getElementById("welcomeContent");
const signupBanner = document.getElementById("signup-banner");

// Check authentication state and update UI
function updateUI(state) {
  try {
    const isAuthenticated = state.auth.isAuthenticated;
    const user = state.auth.user;

    logoutBtn.style.display = isAuthenticated ? "block" : "none";
    welcomeContent.style.display = isAuthenticated ? "none" : "flex";

    if (isAuthenticated && user) {
      const tenants = state.auth.tenantsState.tenants;
      const activeTenant = state.auth.tenantsState.activeTenant;
      // Remove existing account info if present
      const existingAccountInfo = document.getElementById("accountInfo");
      if (existingAccountInfo) {
        existingAccountInfo.remove();
      }

      // Create and append new account info
      const accountInfoElement = createAccountInfo(
        user,
        tenants,
        activeTenant,
        (tenant) => {
          frontegg.switchTenant({ tenantId: tenant.tenantId });
        },
        frontegg
      );

      // Insert the account info after welcomeContent
      welcomeContent.parentNode.insertBefore(
        accountInfoElement,
        welcomeContent.nextSibling
      );
    } else {
      const accountInfoBlock = document.getElementById("accountInfo");
      if (accountInfoBlock) {
        accountInfoBlock.remove();
      }
    }
  } catch (error) {
    console.error("Error updating UI:", error);
  }
}

// Event Listeners
logoutBtn.addEventListener("click", () => {
  frontegg.logout();
});

loginBtn.addEventListener("click", () => {
  frontegg.loginWithRedirect();
});

// Show signup banner for sandbox environment
frontegg.addOnLoadedListener(() => {
  const baseUrl = frontegg.store.getState().root.context.baseUrl;
  const clientId = frontegg.store.getState().root.context.clientId;
  if (
    baseUrl === DEFAULT_SANDBOX_CONTEXT.baseUrl &&
    clientId === DEFAULT_SANDBOX_CONTEXT.clientId
  ) {
    signupBanner.style.display = "block";
  }
});

// Subscribe to state changes
frontegg.store.subscribe(() => {
  const state = frontegg.store.getState();
  updateUI(state);
});
