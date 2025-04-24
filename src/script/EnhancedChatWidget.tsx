import React, { useEffect, useState, useMemo } from 'react';
import { ChatWidgetProps } from '../components/ChatWidget';
import { getSessionId, getUserData, saveUserData, getPageContext } from './utils';

// Import the original ChatWidget component
import ChatWidget from '../components/ChatWidget';

// Enhanced version of ChatWidget with improved n8n integration
const EnhancedChatWidget: React.FC<ChatWidgetProps> = (props) => {
  // Get persistent session ID
  const sessionId = useMemo(() => getSessionId(), []);
  
  // Get stored user data
  const [userData, setUserData] = useState<Record<string, string>>(getUserData());
  
  // Store user data when it changes
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      saveUserData(userData);
    }
  }, [userData]);
  
  // Enhanced webhook handler that includes session ID and user data
  const enhancedWebhookUrl = props.webhookUrl;
  
  // Override the original webhook handler to include additional data
  const handleSendMessage = async (message: string) => {
    try {
      // Get page context information
      const pageContext = getPageContext();
      
      // Prepare the payload with enhanced data
      const payload = {
        message,
        sessionId,
        userData,
        pageContext,
      };
      
      // Send the message to the webhook
      const response = await fetch(enhancedWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      
      // Return the response message
      return data.message || 'Sorry, no response was received.';
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };
  
  // Handle user data collection
  const handleUserDataSubmit = (data: Record<string, string>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };
  
  // Pass enhanced props to the original ChatWidget
  return (
    <ChatWidget
      {...props}
      // Override with our enhanced functionality
      onSendMessage={handleSendMessage}
      onUserDataSubmit={handleUserDataSubmit}
    />
  );
};

export default EnhancedChatWidget;
