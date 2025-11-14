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

3. **Build the application** (optional - for production)
   ```bash
   npm run build
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser** to [http://localhost:3000](http://localhost:3000)

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
   npm run build  # Optional: build for production
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

The application supports two methods for configuring Frontegg credentials:

### Method 1: Environment Variables (Recommended for Vercel)

The app reads configuration from environment variables, which is perfect for Vercel deployment:

**Environment Variables:**
- `VITE_FRONTEGG_BASE_URL` - Your Frontegg base URL (e.g., `https://your-tenant.frontegg.com`)
- `VITE_FRONTEGG_APP_ID` - Your Frontegg App ID

**For Local Development:**
1. Create a `.env` file in the project root:
   ```bash
   VITE_FRONTEGG_BASE_URL=https://your-tenant.frontegg.com
   VITE_FRONTEGG_APP_ID=your-app-id-here
   ```
2. The app will automatically use these values

**For Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:
   - `VITE_FRONTEGG_BASE_URL` = `https://your-tenant.frontegg.com`
   - `VITE_FRONTEGG_APP_ID` = `your-app-id-here`
4. Select the environments where these should apply (Production, Preview, Development)
5. Redeploy your application

### Method 2: Config File (Local Development Alternative)

For local development, you can also use a config file:
- **`config-sample.js`** - Template with placeholder values
- **`config.js`** - Your actual configuration (not tracked in git)

To use this method:
1. Copy `config-sample.js` to `config.js`
2. Update the fallback values in `config.js` with your Frontegg credentials
3. The application will use these values if environment variables are not set

**Note:** Environment variables take precedence over config file values.

## 🚀 Deploying to Vercel

This application is ready to deploy to Vercel with environment variable support:

### Prerequisites
1. A Vercel account ([sign up for free](https://vercel.com/signup))
2. Your Frontegg credentials (Base URL and App ID)

### Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push
   ```

2. **Import your project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your repository

3. **Configure Environment Variables**
   - In the project settings, go to **Settings** > **Environment Variables**
   - Add the following variables:
     - **Key:** `VITE_FRONTEGG_BASE_URL`
       **Value:** `https://your-tenant.frontegg.com`
     - **Key:** `VITE_FRONTEGG_APP_ID`
       **Value:** `your-app-id-here`
   - Select which environments to apply to (Production, Preview, Development)
   - Click "Save"

4. **Configure Build Settings** (if needed)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Update Frontegg Allowed Origins**
   - In your Frontegg dashboard, add your Vercel deployment URL to **Allowed Origins**
   - Add your Vercel URL to **Redirect URLs** (e.g., `https://your-app.vercel.app`)

6. **Deploy**
   - Click "Deploy" or push a new commit to trigger deployment
   - Vercel will automatically build and deploy your application

### Important Notes
- Environment variables are injected at build time
- Make sure to add your Vercel domain to Frontegg's allowed origins
- The app will use environment variables if set, otherwise fall back to config.js defaults

## 🎯 Key Features Demonstrated

- **Hosted Login Integration** - Seamless authentication flow
- **Step-up Authentication** - Additional security for sensitive operations

## 📚 Learn More


- [Frontegg Documentation](https://developers.frontegg.com/) - Complete developer resources
- [Frontegg Vanilla.js SDK Documentation](https://developers.frontegg.com/sdks/frontend/vanilla/hosted-login) - The official SDK used in this application
- [Step-up Authentication Guide](https://developers.frontegg.com/guides/step-up/intro) - Advanced security features

---

**Ready to experience secure fintech authentication?** Start the application and try transferring money over $100 to see the step-up authentication in action! 🚀
