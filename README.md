# FlexChat

A customizable React chat widget powered by n8n workflows.

## Features

- 🎨 Deep theming and branding customization
- 💬 Configurable welcome messages and suggested questions
- 👤 Optional user info collection (name, email, etc.)
- 🔌 Easy integration with n8n workflows
- 🚀 Zero-config deployment on Vercel

## Quick Start

### Installation

```bash
npm install flexchat
```

### Basic Usage

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

## Configuration Options

The `ChatWidget` component accepts the following props:

| Prop | Type | Description |
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
5. Use this URL as the `webhookUrl` prop in the ChatWidget

### Message Format

When a user sends a message, the widget makes a POST request to your webhook URL with the following JSON payload:

```json
{
  "message": "User's message text",
  "sessionId": "1234567890"
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
```

## Deployment

This project is optimized for deployment on Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

## License

MIT
