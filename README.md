# FlexChat

A lightweight, embeddable chat widget powered by n8n workflows. Easily add a customizable chat interface to any website through a simple script tag.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/dynamikapps/flexchat)

View the source code and contribute on [GitHub](https://github.com/dynamikapps/flexchat).

## Features

- 🎨 Deep theming and branding customization
- 💬 Configurable welcome messages and suggested questions
- 👤 Optional user info collection (name, email, etc.)
- 🔌 Seamless integration with n8n workflows
- 📱 Responsive design that works on all devices
- 🌐 Embeddable on any website platform (WordPress, HTML, Wix, etc.)
- 🔄 Session tracking for consistent conversations

## Quick Start - Embedding on Any Website

### Option 1: Script Tag (Recommended for most websites)

Add the following script tag to your website's footer or before the closing `</body>` tag:

```html
<!-- FlexChat Widget -->
<script>
  // FlexChat Configuration
  window.flexChatConfig = {
    webhookUrl: "https://your-n8n-instance.com/webhook/path",
    primaryColor: "#3b82f6",
    welcomeText: "Hello! How can I help you today?",
    position: "right", // or 'left'
    logoUrl: "https://your-site.com/logo.png" // optional
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/dynamikapps/flexchat@latest/dist/flexchat.min.js" async></script>
```

### Option 2: React Component (For React applications)

```bash
npm install flexchat
```

```jsx
import { ChatWidget } from 'flexchat';

function App() {
  return (
    <div className="my-app">
      <h1>My Website</h1>
      
      {/* Add the chat widget to your app */}
      <ChatWidget 
        webhookUrl="https://your-n8n-instance.com/webhook/path"
        primaryColor="#3b82f6"
        welcomeText="Hello! How can I help you today?"
        position="right" // or 'left' to position on the left side
        initiallyOpen={false} // set to true to have the chat open on page load
      />
    </div>
  );
}
```

## Platform-Specific Installation

### WordPress

1. Go to your WordPress dashboard
2. Navigate to Appearance > Theme Editor
3. Select your theme's footer.php file
4. Add the FlexChat script code before the closing `</body>` tag
5. Save changes

Alternatively, use a plugin like "Header and Footer Scripts" to add the code without editing theme files.

### Wix

1. Go to your Wix Editor
2. Click on the "+" button and select "HTML Code"
3. Paste the FlexChat script code
4. Position the HTML element in a footer section
5. Save and publish your site

### Shopify

1. Go to your Shopify admin dashboard
2. Navigate to Online Store > Themes
3. Click "Actions" > "Edit code"
4. Open the theme.liquid file
5. Add the FlexChat script code before the closing `</body>` tag
6. Save changes

## Configuration Options

The widget accepts the following configuration options:

| Option | Type | Description |
|------|------|-------------|
| `webhookUrl` | `string` | **Required.** URL to your n8n webhook |
| `logoUrl` | `string` | URL to your logo image |
| `primaryColor` | `string` | Primary color for buttons and accents |
| `secondaryColor` | `string` | Secondary color for highlights |
| `position` | `'left'` or `'right'` | Position of the widget on the screen (default: `'right'`) |
| `initiallyOpen` | `boolean` | Whether the chat widget should be open on load (default: `false`) |
| `welcomeText` | `string` | Initial message from the bot |
| `responseTimeText` | `string` | Text indicating expected response time |
| `suggestedQuestions` | `string[]` | Array of clickable suggested questions |
| `userFields` | `object` | Fields to collect from users (name, email, etc.) |

## n8n Integration

1. Create a new workflow in your n8n instance
2. Add an HTTP Webhook node as the trigger
3. Configure your response logic
4. Deploy your workflow and copy the webhook URL
5. Use this URL as the `webhookUrl` in your FlexChat configuration

### Message Format

When a user sends a message, the widget makes a POST request to your webhook URL with the following JSON payload:

```json
{
  "message": "User's message text",
  "sessionId": "1234567890",
  "userData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "ACME Inc"
  }
}
```

Your webhook should respond with a JSON object that includes a `message` property:

```json
{
  "message": "Bot response text"
}
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build standalone script
npm run build:script
```

## Embeddable Script

FlexChat can be embedded on any website using the standalone script. The script is built using webpack and can be included in any HTML page.

### Building the Script

```bash
# Install dependencies
npm install

# Build the standalone script
npm run build:script
```

This will generate a `flexchat.min.js` file in the `dist` directory.

### Script Features

- **Lightweight**: Optimized bundle size for faster loading
- **Session Tracking**: Persistent session IDs across page visits
- **Enhanced Data Transmission**: Sends user data, session info, and page context to n8n
- **Global Configuration**: Easy setup via `window.flexChatConfig` object

### Implementation Details

The embeddable script:

1. Creates a global configuration object (`window.flexChatConfig`)
2. Injects the chat widget into the page
3. Manages user data and session persistence
4. Handles communication with n8n webhooks

The script is built using:
- TypeScript for type safety
- React for the UI components
- Webpack for bundling
- TerserPlugin for minification

### Hosting on a CDN

For production use, you should host the script on a CDN for better performance. Here are instructions for popular CDN options:

#### Option 1: Using jsDelivr (Free)

1. The FlexChat script is already available on GitHub at [dynamikapps/flexchat](https://github.com/dynamikapps/flexchat)
2. Use the following URL pattern in your script tag:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/dynamikapps/flexchat@latest/dist/flexchat.min.js" async></script>
   ```
   
   For a specific version:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/dynamikapps/flexchat@1.0.0/dist/flexchat.min.js" async></script>
   ```

#### Option 2: Using Cloudflare Pages (Free)

1. Sign up for a Cloudflare account
2. Create a new Pages project
3. Deploy your project with the `dist` directory
4. Use the provided URL in your script tag:
   ```html
   <script src="https://your-project.pages.dev/flexchat.min.js" async></script>
   ```

#### Option 3: Using AWS CloudFront + S3 (Pay as you go)

1. Create an S3 bucket and upload your `flexchat.min.js` file
2. Set up CloudFront distribution pointing to your S3 bucket
3. Use the CloudFront URL in your script tag:
   ```html
   <script src="https://dxxxxxxxxxxxxx.cloudfront.net/flexchat.min.js" async></script>
   ```

#### Option 4: Using npm + unpkg (Free if package is public)

1. Publish your package to npm
2. Use unpkg to serve the file:
   ```html
   <script src="https://unpkg.com/flexchat@latest/dist/flexchat.min.js" async></script>
   ```

## Troubleshooting

### Widget not appearing
- Ensure the script is loaded after the page content
- Check browser console for any JavaScript errors
- Verify that your n8n webhook URL is correct and accessible

### Messages not sending
- Confirm your n8n workflow is properly deployed and running
- Check network requests in browser developer tools
- Ensure your webhook URL is correctly formatted

## License

```
MIT License

Copyright (c) 2025 DynamikApps

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
