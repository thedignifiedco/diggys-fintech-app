![SecureBank Fintech Demo Banner](/public/assets/js-banner.png)

# SecureBank - Fintech Demo with Frontegg Authentication

This sample application demonstrates how to build a secure fintech application using Frontegg's authentication and step-up security features. The app simulates a digital banking platform with advanced security measures for high-value transactions.

## 🏦 What This Demo Showcases

### **Core Authentication Features**
- **Hosted Login Integration** - Seamless user authentication with Frontegg
- **User Profile Management** - Display and manage user account information
- **Multi-tenant Support** - Account switching and tenant management
- **Session Management** - Persistent authentication state

### **Advanced Security Features**
- **Step-up Authentication** - Additional verification for high-value transactions (>$100)
- **Form Data Preservation** - Maintains user input during authentication flows
- **Real-time Security Indicators** - Visual feedback for security requirements
- **Secure Transaction Processing** - Protected financial operations


## 🏗️ Project Structure

- `src/app.js` - Main application with Frontegg integration and step-up authentication
- `src/components/` - UI components for user and tenant information display
- `src/constants/config.js` - Frontegg configuration (create from config-sample.js)
- `src/constants/config-sample.js` - Sample configuration template
- `src/styles/globals.css` - Modern fintech styling and responsive design
- `public/index.html` - Application template with banking interface

## 🚀 Step-up Authentication Flow

1. **User initiates transfer** with amount > $100
2. **System detects high-value transaction** and triggers step-up requirement
3. **Form data is preserved** in localStorage during authentication
4. **User completes Frontegg step-up authentication** (MFA, email verification, etc.)
5. **User returns to application** with preserved form data
6. **Transfer executes automatically** with success confirmation modal

## 📋 Prerequisites

- [Node.js](https://nodejs.org) (v14 or higher)
- npm (comes with Node.js)
- Modern web browser with JavaScript enabled
- [Frontegg Vanilla.js SDK](https://developers.frontegg.com/sdks/frontend/vanilla/hosted-login) (`@frontegg/js` package)

### Frontegg Account Setup

You'll need a Frontegg account to use your own credentials. [Sign up for free](https://portal.frontegg.com/oauth/account/sign-up) to get started.

**Don't have an account yet?** No worries! This project includes **sandbox credentials** so you can test the step-up authentication flow immediately.


## 🛠️ Quick Start Guide

### Option 1: Use Sandbox Credentials (Recommended for Testing)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd diggys-fintech-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000)

The app will work immediately with the included sandbox credentials!

### Option 2: Use Your Own Frontegg Account

1. **Set up your Frontegg application**
   - Go to [Frontegg Portal](https://portal.frontegg.com/)
   - Create a new application or use an existing one
   - Get your **Base URL** and **App ID** from the application settings
   - Add `http://localhost:3000` to **Allowed Origins** and **Redirect URLs**

2. **Configure the application**
   ```bash
   # Copy the sample configuration
   cp src/constants/config-sample.js src/constants/config.js
   
   # Edit config.js with your credentials
   # Update baseUrl and appId with your Frontegg values
   ```

3. **Install and run**
   ```bash
   npm install
   npm start
   ```

## 🧪 Testing the Step-up Authentication

1. **Sign in** to the application using the sandbox credentials
2. **Navigate to "Transfer Money"** from the dashboard
3. **Enter an amount over $100** (e.g., $150)
4. **Click "Transfer Money"** - you'll see a warning about additional authentication
5. **Complete the Frontegg step-up authentication** (MFA, email verification, etc.)
6. **Return to the application** - your form data will be preserved
7. **Transfer executes automatically** with a beautiful success modal

## 🔧 Configuration

The application uses a configuration file to manage Frontegg credentials:

- **`config-sample.js`** - Template with placeholder values
- **`config.js`** - Your actual configuration (not tracked in git)

To use your own Frontegg account:
1. Copy `config-sample.js` to `config.js`
2. Update the `baseUrl` and `appId` with your Frontegg credentials
3. The application will automatically use your configuration

## 🎯 Key Features Demonstrated

- **Hosted Login Integration** - Seamless authentication flow
- **Step-up Authentication** - Additional security for sensitive operations

## 📚 Learn More


- [Frontegg Documentation](https://developers.frontegg.com/) - Complete developer resources
- [Frontegg Vanilla.js SDK Documentation](https://developers.frontegg.com/sdks/frontend/vanilla/hosted-login) - The official SDK used in this application
- [Step-up Authentication Guide](https://developers.frontegg.com/guides/step-up/intro) - Advanced security features

---

**Ready to experience secure fintech authentication?** Start the application and try transferring money over $100 to see the step-up authentication in action! 🚀
