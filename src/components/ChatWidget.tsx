import React, { useEffect, useMemo, useState } from 'react';

// Define interfaces for @n8n/chat since type definitions might be missing
interface ChatMessage {
  type: 'bot' | 'user';
  message: string;
}

interface SuggestedMessage {
  label: string;
  message: string;
}

interface ChatTheme {
  chat: {
    messageInput?: {
      placeholder?: string;
    };
    header?: {
      title?: string;
      subtitle?: string;
      showCloseButton?: boolean;
    };
  };
}

interface ChatProps {
  webhookUrl: string;
  loadPreviousMessages?: boolean;
  theme?: ChatTheme;
  userInputs?: {
    enabled: boolean;
    fields: Array<{
      id: string;
      label: string;
      type?: string;
      required: boolean;
    }>;
  };
  initialMessages?: ChatMessage[];
  suggestedMessages?: SuggestedMessage[];
}

// Import Chat component from @n8n/chat
// Using a mock implementation for now since we don't have the actual types
const Chat = (props: ChatProps) => {
  return (
    <div className="n8n-chat-widget">
      <div className="n8n-chat-header">
        <div className="n8n-chat-header-logo" />
        <div className="n8n-chat-header-title">
          {props.theme?.chat?.header?.title || 'Chat'}
        </div>
        <div className="n8n-chat-header-subtitle">
          {props.theme?.chat?.header?.subtitle}
        </div>
      </div>
      <div className="n8n-chat-messages">
        {props.initialMessages?.map((msg, i) => (
          <div key={i} className={`n8n-chat-message n8n-chat-message-${msg.type}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="n8n-chat-input">
        <input 
          type="text" 
          placeholder={props.theme?.chat?.messageInput?.placeholder || 'Type a message...'} 
        />
      </div>
      {props.suggestedMessages && props.suggestedMessages.length > 0 && (
        <div className="n8n-chat-suggested-messages">
          {props.suggestedMessages.map((msg, i) => (
            <button key={i} className="n8n-chat-suggested-message">
              {msg.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Add custom styles for our mock Chat component
const chatStyles = `
  .n8n-chat-widget {
    position: fixed;
    bottom: 20px;
    width: 450px;
    height: 700px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: system-ui, -apple-system, sans-serif;
    transition: transform 0.3s ease, opacity 0.3s ease;
    z-index: 1000;
  }
  
  .n8n-chat-widget-right {
    right: 20px;
  }
  
  .n8n-chat-widget-left {
    left: 20px;
  }
  
  .n8n-chat-widget-closed {
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
  }
  
  .n8n-chat-toggle-button {
    position: fixed;
    bottom: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--primary-color, #3b82f6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1001; /* Higher than the chat widget */
    transition: transform 0.2s ease;
  }
  
  .n8n-chat-toggle-button:hover {
    transform: scale(1.05);
  }
  
  .n8n-chat-toggle-button-right {
    right: 20px;
  }
  
  .n8n-chat-toggle-button-left {
    left: 20px;
  }
  
  /* When chat is open, position the toggle button in the top-right/left of the widget */
  .n8n-chat-toggle-button-open.n8n-chat-toggle-button-right {
    right: 20px;
    bottom: auto;
    top: 20px;
    transform: scale(0.8);
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .n8n-chat-toggle-button-open.n8n-chat-toggle-button-left {
    left: 20px;
    bottom: auto;
    top: 20px;
    transform: scale(0.8);
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .n8n-chat-toggle-icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  .n8n-chat-header {
    background: var(--primary-color, #3b82f6);
    color: white;
    padding: 15px;
    display: flex;
    align-items: center;
  }

  .n8n-chat-header-logo {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .n8n-chat-header-title {
    font-weight: 600;
    font-size: 16px;
  }

  .n8n-chat-header-subtitle {
    font-size: 12px;
    margin-left: auto;
    opacity: 0.8;
  }
  
  .n8n-chat-close-button {
    margin-left: 10px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    transition: background-color 0.2s ease;
  }
  
  .n8n-chat-close-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .n8n-chat-close-button svg {
    fill: white;
  }

  .n8n-chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .n8n-chat-message {
    padding: 10px 12px;
    border-radius: 8px;
    max-width: 80%;
    word-break: break-word;
  }

  .n8n-chat-message-bot {
    background: #f1f5f9;
    align-self: flex-start;
  }

  .n8n-chat-message-user {
    background: var(--primary-color, #3b82f6);
    color: white;
    align-self: flex-end;
  }

  .n8n-chat-input {
    border-top: 1px solid #e2e8f0;
    padding: 10px 15px;
  }

  .n8n-chat-input input {
    width: 100%;
    padding: 10px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    outline: none;
  }

  .n8n-chat-input input:focus {
    border-color: var(--primary-color, #3b82f6);
  }

  .n8n-chat-suggested-messages {
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .n8n-chat-suggested-message {
    background: #f1f5f9;
    border: none;
    border-radius: 16px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  .n8n-chat-suggested-message:hover {
    background: #e2e8f0;
  }
`;

export interface ChatWidgetProps {
  /** URL to the logo to display in the chat header */
  logoUrl?: string;
  /** Primary color for buttons and accents */
  primaryColor?: string;
  /** Secondary color for highlights and secondary elements */
  secondaryColor?: string;
  /** Welcome text displayed when chat is first opened */
  welcomeText?: string;
  /** Text indicating expected response time */
  responseTimeText?: string;
  /** Array of suggested questions to display to the user */
  suggestedQuestions?: string[];
  /** Optional webhook URL for n8n integration */
  webhookUrl: string;
  /** Position of the widget on the screen (left or right) */
  position?: 'left' | 'right';
  /** Initial state of the widget (open or closed) */
  initiallyOpen?: boolean;
  /** Optional user fields to collect before starting chat */
  userFields?: {
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    company?: boolean;
  };
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  logoUrl,
  primaryColor = '#3b82f6',
  secondaryColor = '#10b981',
  welcomeText = 'Hello! How can I help you today?',
  responseTimeText = 'Typically replies within a few minutes',
  suggestedQuestions = [],
  webhookUrl,
  position = 'right',
  initiallyOpen = false,
  userFields = {},
}) => {
  // State to track if the chat widget is open or closed
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  // Apply custom colors to CSS variables
  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty('--primary-color', primaryColor);
    }
    if (secondaryColor) {
      document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    }
    
    return () => {
      document.documentElement.style.removeProperty('--primary-color');
      document.documentElement.style.removeProperty('--secondary-color');
    };
  }, [primaryColor, secondaryColor]);

  // Prepare user fields configuration
  const userFieldsConfig = useMemo(() => {
    interface UserField {
      id: string;
      label: string;
      type?: string;
      required: boolean;
    }
    
    const fields: UserField[] = [];
    
    if (userFields.name) {
      fields.push({
        id: 'name',
        label: 'Name',
        required: true,
      });
    }
    
    if (userFields.email) {
      fields.push({
        id: 'email',
        label: 'Email',
        type: 'email',
        required: true,
      });
    }
    
    if (userFields.phone) {
      fields.push({
        id: 'phone',
        label: 'Phone',
        type: 'tel',
        required: false,
      });
    }
    
    if (userFields.company) {
      fields.push({
        id: 'company',
        label: 'Company',
        required: false,
      });
    }
    
    return fields;
  }, [userFields]);

  // Prepare chat configuration
  const chatConfig: ChatProps = {
    webhookUrl,
    loadPreviousMessages: false,
    theme: {
      chat: {
        messageInput: {
          placeholder: 'Type your message...',
        },
        header: {
          title: 'Chat Support',
          subtitle: responseTimeText,
          showCloseButton: true,
        },
      },
    },
    userInputs: userFieldsConfig.length > 0 ? {
      enabled: true,
      fields: userFieldsConfig,
    } : undefined,
    initialMessages: welcomeText ? [
      {
        type: 'bot',
        message: welcomeText,
      },
    ] : undefined,
    suggestedMessages: suggestedQuestions.map(question => ({
      label: question,
      message: question,
    })),
  };

  // Create position-specific class names
  const positionClass = `n8n-chat-widget-${position}`;
  const togglePositionClass = `n8n-chat-toggle-button-${position}`;
  
  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="flex-chat-widget">
      <style>{chatStyles}</style>
      {logoUrl && (
        <style>{`
          .n8n-chat-header-logo {
            background-image: url(${logoUrl});
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }
        `}</style>
      )}
      <style>{`
        .n8n-chat-widget {
          ${position === 'left' ? 'left: 20px;' : 'right: 20px;'}
        }
      `}</style>
      
      {/* Chat toggle button (only shown when chat is closed) */}
      {!isOpen && (
        <div 
          className={`n8n-chat-toggle-button ${togglePositionClass}`} 
          onClick={toggleChat}
          aria-label="Open chat"
          role="button"
          tabIndex={0}
        >
          <svg className="n8n-chat-toggle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
        </div>
      )}
      
      {/* Chat widget */}
      <div className={`n8n-chat-widget ${positionClass} ${!isOpen ? 'n8n-chat-widget-closed' : ''}`}>
        <div className="n8n-chat-header">
          {logoUrl && <div className="n8n-chat-header-logo" />}
          <div className="n8n-chat-header-title">
            {chatConfig.theme?.chat?.header?.title || 'Chat'}
          </div>
          <div className="n8n-chat-header-subtitle">
            {chatConfig.theme?.chat?.header?.subtitle}
          </div>
          
          {/* Close button inside header */}
          {isOpen && (
            <div 
              className="n8n-chat-close-button"
              onClick={toggleChat}
              aria-label="Close chat"
              role="button"
              tabIndex={0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
          )}
        </div>
        
        <div className="n8n-chat-messages">
          {chatConfig.initialMessages?.map((msg, i) => (
            <div key={i} className={`n8n-chat-message n8n-chat-message-${msg.type}`}>
              {msg.message}
            </div>
          ))}
        </div>
        
        <div className="n8n-chat-input">
          <input 
            type="text" 
            placeholder={chatConfig.theme?.chat?.messageInput?.placeholder || 'Type a message...'} 
          />
        </div>
        
        {chatConfig.suggestedMessages && chatConfig.suggestedMessages.length > 0 && (
          <div className="n8n-chat-suggested-messages">
            {chatConfig.suggestedMessages.map((msg, i) => (
              <button key={i} className="n8n-chat-suggested-message">
                {msg.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
