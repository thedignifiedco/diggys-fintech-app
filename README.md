# Frontegg Vanilla JS Hosted Login

This is a vanilla JavaScript implementation of the Frontegg hosted login box, maintaining the same look and feel as the React version.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## Features

- Frontegg hosted login box integration
- Authentication state management
- Responsive design
- Similar styling to the React version

## Environment

The app uses demo environment credentials by default. To use your own Frontegg credentials, update the `DEFAULT_SANDBOX_CONTEXT` in `js/app.js` with your own values:

```javascript
const DEFAULT_SANDBOX_CONTEXT = {
    baseUrl: "YOUR_BASE_URL",
    clientId: "YOUR_CLIENT_ID",
};
```
