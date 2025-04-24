/**
 * FlexChat Embeddable Script
 * 
 * This script creates and injects the FlexChat widget into any website.
 * It reads configuration from window.flexChatConfig and renders the chat widget.
 */

import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import { ChatWidgetProps } from '../components/ChatWidget';
import EnhancedChatWidget from './EnhancedChatWidget';

// Default configuration
const defaultConfig: Partial<ChatWidgetProps> = {
  primaryColor: '#3b82f6',
  secondaryColor: '#10b981',
  welcomeText: 'Hello! How can I help you today?',
  responseTimeText: 'Typically replies within a few minutes',
  position: 'right',
  initiallyOpen: false,
  suggestedQuestions: [],
};

// Global configuration interface
interface FlexChatConfig extends Partial<ChatWidgetProps> {
  webhookUrl: string;
}

// Initialize the chat widget
function initFlexChat() {
  // Get configuration from global object
  const userConfig = (window as any).flexChatConfig || {};
  
  // Validate required configuration
  if (!userConfig.webhookUrl) {
    console.error('FlexChat: webhookUrl is required in window.flexChatConfig');
    return;
  }
  
  // Merge default and user configuration
  const config: ChatWidgetProps = {
    ...defaultConfig,
    ...userConfig,
    webhookUrl: userConfig.webhookUrl,
  };
  
  // Create container for the chat widget
  const container = document.createElement('div');
  container.id = 'flexchat-container';
  document.body.appendChild(container);
  
  // Render the chat widget
  const root = createRoot(container);
  root.render(createElement(EnhancedChatWidget, config));
}

// Run initialization when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFlexChat);
} else {
  initFlexChat();
}

// Export for potential programmatic usage
export { initFlexChat };
