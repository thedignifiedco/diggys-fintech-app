import { initialize } from "@frontegg/js";
import "./styles/globals.css";
import { createAccountInfo } from "./components/accountInfo";
import { DEFAULT_SANDBOX_CONTEXT, ELEMENT_IDS } from "./constants/config";

// Wait for DOM to be ready before initializing Frontegg
let frontegg;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFrontegg);
} else {
  // DOM is already ready
  initializeFrontegg();
}

// Elements will be initialized when DOM is ready
let elements = {};

function initializeFrontegg() {
  // Initialize DOM elements first
  elements = {
    logoutBtn: document.getElementById(ELEMENT_IDS.logoutBtn),
    loginBtn: document.getElementById(ELEMENT_IDS.loginBtn),
    welcomeContent: document.getElementById(ELEMENT_IDS.welcomeContent),
    signupBanner: document.getElementById(ELEMENT_IDS.signupBanner),
    mainNav: document.getElementById('mainNav'),
    dashboardPage: document.getElementById('dashboardPage'),
    transferPage: document.getElementById('transferPage'),
    transactionsPage: document.getElementById('transactionsPage'),
    transferForm: document.getElementById('transferForm'),
  };
  
  frontegg = initialize({
    contextOptions: {
      baseUrl: DEFAULT_SANDBOX_CONTEXT.baseUrl,
      appId: DEFAULT_SANDBOX_CONTEXT.appId,
    },
    authOptions: {
      keepSessionAlive: true
    },
    hostedLoginBox: true,
    customLoader: true,
  });
  
  // Initialize the rest of the app after Frontegg is ready
  setupApp();
}

// Uncomment to skip welcome page and redirect to login or app if authenticated
// frontegg.ready(() => {
//   frontegg.store.subscribe(()=>{
//     const {auth} = frontegg.store.getState();

//     if(!auth.isLoading) {
//       if (!auth.isAuthenticated) {
//         frontegg.loginWithRedirect()
//       }
//     }
//   })
// })

function updateUI(state) {
  try {
    const { isAuthenticated, user, tenantsState, isSteppedUp } = state.auth;

    if (elements.logoutBtn) {
      elements.logoutBtn.style.display = isAuthenticated ? "block" : "none";
    }
    if (elements.welcomeContent) {
      elements.welcomeContent.style.display = isAuthenticated ? "none" : "flex";
    }
    if (elements.mainNav) {
      elements.mainNav.style.display = isAuthenticated ? "flex" : "none";
    }

    if (isAuthenticated && user) {
      updateAuthenticatedUI(user, tenantsState);
      updateStepUpStatus(isSteppedUp);
      showPage('dashboard');
    } else {
      removeAccountInfo();
      hideAllPages();
    }
  } catch (error) {
    console.error("Error updating UI:", error.message);
  }
}

function updateStepUpStatus(isSteppedUp) {
  // Update step-up status indicator in the transfer form
  const stepUpStatus = document.getElementById('stepUpStatus');
  if (stepUpStatus) {
    stepUpStatus.remove();
  }
  
  if (isSteppedUp) {
    const transferForm = elements.transferForm;
    const statusDiv = document.createElement('div');
    statusDiv.id = 'stepUpStatus';
    statusDiv.className = 'step-up-status';
    statusDiv.innerHTML = `
      <div class="step-up-success">
        <span class="success-icon">✅</span>
        <span class="success-text">Enhanced security verified - You can transfer any amount</span>
      </div>
    `;
    transferForm.insertBefore(statusDiv, transferForm.firstChild);
  }
}

function updateAuthenticatedUI(user, tenantsState) {
  removeAccountInfo();

  const accountInfoElement = createAccountInfo(
    user,
    tenantsState.tenants,
    tenantsState.activeTenant,
    (tenant) => frontegg.switchTenant({ tenantId: tenant.tenantId }),
    frontegg
  );

  if (accountInfoElement) {
    elements.welcomeContent.parentNode.insertBefore(
      accountInfoElement,
      elements.welcomeContent.nextSibling
    );
  }
}

function removeAccountInfo() {
  const accountInfoBlock = document.getElementById(ELEMENT_IDS.accountInfo);
  if (accountInfoBlock) {
    accountInfoBlock.remove();
  }
}

function hideLoader() {
  const loader = document.getElementById("custom-loader");
  if (loader) {
    loader.style.display = "none";
  }
}

// Navigation functions
function showPage(pageName) {
  hideAllPages();
  updateActiveNavLink(pageName);
  updateMobileMenuActiveState();
  
  switch(pageName) {
    case 'dashboard':
      if (elements.dashboardPage) {
        elements.dashboardPage.style.display = 'block';
      }
      break;
    case 'transfer':
      if (elements.transferPage) {
        elements.transferPage.style.display = 'block';
      }
      break;
    case 'transactions':
      if (elements.transactionsPage) {
        elements.transactionsPage.style.display = 'block';
      }
      break;
  }
}

function hideAllPages() {
  if (elements.dashboardPage) {
    elements.dashboardPage.style.display = 'none';
  }
  if (elements.transferPage) {
    elements.transferPage.style.display = 'none';
  }
  if (elements.transactionsPage) {
    elements.transactionsPage.style.display = 'none';
  }
}

function updateActiveNavLink(pageName) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });
}

// Step-up authentication for transfers
const MAX_AGE = 60 * 60; // 1 hour in seconds

function checkStepUpRequirement() {
  // In a real app, this would check user permissions, transaction amount, etc.
  // For demo purposes, we'll require step-up for amounts over $100
  const amount = parseFloat(document.getElementById('amount').value);
  return amount > 100;
}

// Transfer form handling
function handleTransferSubmit(event) {
  event.preventDefault();
  
  // Get form data directly from form elements
  const fromAccount = document.getElementById('fromAccount').value;
  const toAccount = document.getElementById('toAccount').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const memo = document.getElementById('memo').value;
  
  // Validate form data
  if (!fromAccount || !toAccount || !amount || amount <= 0) {
    alert('Please fill in all required fields with valid values.');
    return;
  }
  
  const transferData = {
    fromAccount,
    toAccount,
    amount,
    memo
  };
  
  console.log('Transfer data:', transferData);
  processTransfer(transferData);
}

async function processTransfer(transferData) {
  console.log('Processing transfer:', transferData);
  
  // Check if step-up authentication is required FIRST
  const needsStepUp = transferData.amount > 100;
  console.log('Needs step-up:', needsStepUp, 'Amount:', transferData.amount);
  
  if (needsStepUp) {
    // Check if user is already stepped up
    const isSteppedUp = isUserSteppedUp();
    console.log('User is stepped up:', isSteppedUp);
    
    if (!isSteppedUp) {
      console.log('User needs step-up authentication - BLOCKING TRANSFER');
      
      // Store transfer data for after step-up completion
      window.pendingTransfer = transferData;
      
      // Also store in localStorage to survive page reloads
      localStorage.setItem('pendingTransfer', JSON.stringify(transferData));
      
      // Trigger Frontegg step-up authentication
      console.log('Triggering Frontegg step-up authentication...');
      try {
        if (typeof frontegg.stepUp === 'function') {
          frontegg.stepUp({ maxAge: MAX_AGE });
          console.log('Step-up authentication triggered successfully');
          
          // Show user-friendly message
          alert('Additional authentication required for transfers over $100. You will be redirected to complete verification.');
        } else {
          console.error('frontegg.stepUp is not available');
          alert('Step-up authentication is not available. Please contact support.');
          return;
        }
      } catch (error) {
        console.error('Failed to trigger step-up authentication:', error);
        alert('Failed to initiate authentication. Please try again.');
        return;
      }
      
      // TRANSFER IS BLOCKED - DO NOT PROCEED
      return;
    } else {
      console.log('User is already stepped up - proceeding with transfer');
    }
  }
  
  // Show loading state only if we're proceeding with transfer
  const transferButton = document.querySelector('.transfer-button');
  const originalText = transferButton.textContent;
  transferButton.textContent = 'Processing...';
  transferButton.disabled = true;
  
  try {
    // Proceed with transfer
    await executeTransfer(transferData);
  } catch (error) {
    console.error('Transfer failed:', error);
    alert('Transfer failed. Please try again.');
  } finally {
    resetTransferButton(transferButton, originalText);
  }
}

async function executeTransfer(transferData) {
  // Simulate transfer processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Show success modal
  showTransferSuccessModal(transferData);
  
  // Reset form and navigate to dashboard
  elements.transferForm.reset();
  showPage('dashboard');
  
  // Clear any pending transfer
  delete window.pendingTransfer;
  localStorage.removeItem('pendingTransfer');
}

function resetTransferButton(button, originalText) {
  button.textContent = originalText;
  button.disabled = false;
}

function restoreFormData(transferData) {
  console.log('Restoring form data:', transferData);
  
  // Restore form fields
  const fromAccountSelect = document.getElementById('fromAccount');
  const toAccountInput = document.getElementById('toAccount');
  const amountInput = document.getElementById('amount');
  const memoInput = document.getElementById('memo');
  
  if (fromAccountSelect && transferData.fromAccount) {
    fromAccountSelect.value = transferData.fromAccount;
  }
  
  if (toAccountInput && transferData.toAccount) {
    toAccountInput.value = transferData.toAccount;
  }
  
  if (amountInput && transferData.amount) {
    amountInput.value = transferData.amount;
  }
  
  if (memoInput && transferData.memo) {
    memoInput.value = transferData.memo;
  }
  
  // Navigate to transfer page to show the restored form
  showPage('transfer');
  
  // Show a notification that form data was restored
  showFormRestoredNotification();
}

function showFormRestoredNotification() {
  // Create a temporary notification
  const notification = document.createElement('div');
  notification.className = 'form-restored-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">✅</span>
      <span class="notification-text">Form data restored after authentication</span>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function showTransferSuccessModal(transferData) {
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'transferSuccessModal';
  modalOverlay.className = 'success-modal-overlay';
  
  // Create modal content using DOM methods for security
  const modalContent = document.createElement('div');
  modalContent.className = 'success-modal-content';
  
  // Header
  const header = document.createElement('div');
  header.className = 'success-modal-header';
  
  const icon = document.createElement('div');
  icon.className = 'success-icon-large';
  icon.textContent = '✅';
  
  const title = document.createElement('h3');
  title.textContent = 'Transfer Successful!';
  
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Your money transfer has been completed successfully';
  
  header.appendChild(icon);
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Body
  const body = document.createElement('div');
  body.className = 'success-modal-body';
  
  const details = document.createElement('div');
  details.className = 'transfer-details';
  
  // Create detail rows
  const amountRow = createDetailRow('Amount:', `$${transferData.amount.toFixed(2)}`);
  const toAccountRow = createDetailRow('To Account:', transferData.toAccount || '');
  const fromAccountRow = createDetailRow('From Account:', transferData.fromAccount === 'checking' ? 'Checking Account' : 'Savings Account');
  const transactionIdRow = createDetailRow('Transaction ID:', `TXN-${Date.now().toString().slice(-8)}`);
  const dateRow = createDetailRow('Date & Time:', new Date().toLocaleString());
  
  details.appendChild(amountRow);
  details.appendChild(toAccountRow);
  details.appendChild(fromAccountRow);
  
  // Add memo row if memo exists
  if (transferData.memo) {
    const memoRow = createDetailRow('Memo:', transferData.memo);
    details.appendChild(memoRow);
  }
  
  details.appendChild(transactionIdRow);
  details.appendChild(dateRow);
  
  body.appendChild(details);
  
  // Footer
  const footer = document.createElement('div');
  footer.className = 'success-modal-footer';
  
  const closeButton = document.createElement('button');
  closeButton.id = 'closeSuccessModal';
  closeButton.className = 'primary-button';
  closeButton.textContent = 'Done';
  
  footer.appendChild(closeButton);
  
  // Assemble modal
  modalContent.appendChild(header);
  modalContent.appendChild(body);
  modalContent.appendChild(footer);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
  
  // Add event listeners
  closeButton.addEventListener('click', () => {
    hideTransferSuccessModal();
  });
  
  // Close modal when clicking overlay
  modalOverlay.addEventListener('click', (e) => {
    if (e.target.id === 'transferSuccessModal') {
      hideTransferSuccessModal();
    }
  });
  
  // Show modal with animation
  setTimeout(() => {
    modalOverlay.classList.add('show');
  }, 100);
}

function createDetailRow(label, value) {
  const row = document.createElement('div');
  row.className = 'detail-row';
  
  const labelSpan = document.createElement('span');
  labelSpan.className = 'detail-label';
  labelSpan.textContent = label;
  
  const valueSpan = document.createElement('span');
  valueSpan.className = 'detail-value';
  valueSpan.textContent = value;
  
  row.appendChild(labelSpan);
  row.appendChild(valueSpan);
  
  return row;
}

function hideTransferSuccessModal() {
  const modal = document.getElementById('transferSuccessModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function isUserSteppedUp() {
  // Check if user is already stepped up using Frontegg's isSteppedUp method
  try {
    const steppedUp = frontegg.isSteppedUp({ maxAge: MAX_AGE });
    console.log('isUserSteppedUp result:', steppedUp, 'maxAge:', MAX_AGE);
    return steppedUp;
  } catch (error) {
    console.error('Error checking step-up status:', error);
    return false;
  }
}

// Navigation event listeners
document.addEventListener('click', (event) => {
  if (event.target.matches('.nav-link') || event.target.matches('.action-button') || event.target.matches('.mobile-nav-link')) {
    event.preventDefault();
    const page = event.target.dataset.page;
    if (page) {
      showPage(page);
      // Close mobile menu if open
      closeMobileMenu();
    }
  }
});

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (mobileMenuBtn && mainNav) {
    // Create mobile navigation elements
    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.className = 'mobile-nav-overlay';
    mobileNavOverlay.id = 'mobileNavOverlay';
    
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobileNav';
    
    // Copy navigation links to mobile menu
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const mobileLink = document.createElement('a');
      mobileLink.href = '#';
      mobileLink.className = 'mobile-nav-link';
      mobileLink.setAttribute('data-page', link.getAttribute('data-page'));
      mobileLink.textContent = link.textContent;
      mobileNav.appendChild(mobileLink);
    });
    
    document.body.appendChild(mobileNavOverlay);
    document.body.appendChild(mobileNav);
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
    
    // Update mobile menu active state
    updateMobileMenuActiveState();
  }
}

function toggleMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  if (mobileMenuBtn && mobileNav && mobileNavOverlay) {
    const isOpen = mobileNav.classList.contains('show');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
}

function openMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  if (mobileMenuBtn && mobileNav && mobileNavOverlay) {
    mobileMenuBtn.classList.add('active');
    mobileNav.classList.add('show');
    mobileNavOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  if (mobileMenuBtn && mobileNav && mobileNavOverlay) {
    mobileMenuBtn.classList.remove('active');
    mobileNav.classList.remove('show');
    mobileNavOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function updateMobileMenuActiveState() {
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mainNavLinks = document.querySelectorAll('.nav-link');
  
  mainNavLinks.forEach((link, index) => {
    if (link.classList.contains('active')) {
      mobileNavLinks.forEach(mobileLink => mobileLink.classList.remove('active'));
      if (mobileNavLinks[index]) {
        mobileNavLinks[index].classList.add('active');
      }
    }
  });
}



function updateStepUpIndicator() {
  const amountInput = document.getElementById('amount');
  if (!amountInput) return;
  
  const amount = parseFloat(amountInput.value) || 0;
  const stepUpIndicator = document.getElementById('stepUpIndicator');
  
  if (amount > 100) {
    if (!stepUpIndicator) {
      createStepUpIndicator();
    }
  } else {
    if (stepUpIndicator) {
      stepUpIndicator.remove();
    }
  }
}

function createStepUpIndicator() {
  const amountGroup = document.querySelector('.form-group');
  const indicator = document.createElement('div');
  indicator.id = 'stepUpIndicator';
  indicator.className = 'step-up-indicator';
  indicator.innerHTML = `
    <div class="step-up-warning">
      <span class="warning-icon">🔒</span>
      <span class="warning-text">Additional authentication required for transfers over $100</span>
    </div>
  `;
  amountGroup.appendChild(indicator);
}

function setupApp() {
  // Set up event listeners for elements
  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", () => frontegg.logout());
  }
  if (elements.loginBtn) {
    elements.loginBtn.addEventListener("click", () => frontegg.loginWithRedirect());
  }
  if (elements.transferForm) {
    elements.transferForm.addEventListener('submit', handleTransferSubmit);
  }
  
  // Add real-time step-up indicator
  const amountInput = document.getElementById('amount');
  if (amountInput) {
    amountInput.addEventListener('input', updateStepUpIndicator);
  }
  
  frontegg.addOnLoadedListener(() => {
    const state = frontegg.store.getState().root.context;
    const isSandboxEnvironment = 
      state.baseUrl === "https://dignifiedlabs-dev.frontegg.com" && 
      state.appId === "61738a0b-2dfa-49fe-b5fd-320bb2e279cf";
      
    if (!isSandboxEnvironment && elements.signupBanner) {
      elements.signupBanner.classList.add("custom-credentials");
    }
    
    // Debug: Check available methods on frontegg object
    console.log('Frontegg loaded. Available methods:', Object.getOwnPropertyNames(frontegg));
    console.log('Frontegg stepUp method:', typeof frontegg.stepUp);
    console.log('Frontegg isSteppedUp method:', typeof frontegg.isSteppedUp);
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Check for pending transfers on page load
    checkForPendingTransferOnLoad();
    
    hideLoader();
  });
  
  // Subscribe to store changes
  frontegg.store.subscribe(() => {
    updateUI(frontegg.store.getState());
    
    // Check if there's a pending transfer after step-up authentication
    checkPendingTransfer();
  });
}

function checkForPendingTransferOnLoad() {
  const pendingTransfer = localStorage.getItem('pendingTransfer');
  if (pendingTransfer) {
    console.log('Found pending transfer on page load:', JSON.parse(pendingTransfer));
    
    // Check if user is already authenticated and stepped up
    const authState = frontegg.store.getState().auth;
    const isSteppedUp = isUserSteppedUp();
    
    console.log('Page load auth check:', {
      isAuthenticated: authState.isAuthenticated,
      isSteppedUp: isSteppedUp
    });
    
    if (authState.isAuthenticated && isSteppedUp) {
      console.log('User is authenticated and stepped up, processing pending transfer');
      // The checkPendingTransfer function will handle this
    } else {
      console.log('User not authenticated or stepped up yet, waiting for auth state change');
    }
  }
}

function checkPendingTransfer() {
  const state = frontegg.store.getState();
  const { isAuthenticated } = state.auth;
  
  // Check both window and localStorage for pending transfer
  const windowPendingTransfer = window.pendingTransfer;
  const localStoragePendingTransfer = localStorage.getItem('pendingTransfer');
  
  // Check if user is stepped up using Frontegg's method
  const isSteppedUp = isUserSteppedUp();
  
  console.log('Checking pending transfer:', {
    isAuthenticated,
    isSteppedUp,
    hasWindowPendingTransfer: !!windowPendingTransfer,
    hasLocalStoragePendingTransfer: !!localStoragePendingTransfer,
    authState: state.auth
  });
  
  // If user is authenticated, stepped up, and there's a pending transfer
  if (isAuthenticated && isSteppedUp && (windowPendingTransfer || localStoragePendingTransfer)) {
    let pendingTransfer;
    
    // Prioritize window transfer, fallback to localStorage
    if (windowPendingTransfer) {
      pendingTransfer = windowPendingTransfer;
      delete window.pendingTransfer;
    } else if (localStoragePendingTransfer) {
      pendingTransfer = JSON.parse(localStoragePendingTransfer);
      localStorage.removeItem('pendingTransfer');
    }
    
    console.log('Executing pending transfer:', pendingTransfer);
    
    // Restore form data before executing transfer
    restoreFormData(pendingTransfer);
    
    // Execute the pending transfer
    executeTransfer(pendingTransfer);
  }
}
