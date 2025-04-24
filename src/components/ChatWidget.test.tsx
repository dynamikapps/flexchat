import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatWidget } from './ChatWidget';

// Define interfaces for test mocking
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
    messageInput?: { placeholder?: string };
    header?: {
      title?: string;
      subtitle?: string;
      showCloseButton?: boolean;
    };
  };
}

// Mock the @n8n/chat component
jest.mock('@n8n/chat', () => ({
  Chat: ({ 
    webhookUrl, 
    theme, 
    initialMessages, 
    suggestedMessages 
  }: { 
    webhookUrl: string; 
    theme?: ChatTheme; 
    initialMessages?: ChatMessage[]; 
    suggestedMessages?: SuggestedMessage[]; 
  }) => (
    <div data-testid="n8n-chat-mock">
      <div data-testid="webhook-url">{webhookUrl}</div>
      <div data-testid="theme">{JSON.stringify(theme)}</div>
      <div data-testid="initial-messages">{JSON.stringify(initialMessages)}</div>
      <div data-testid="suggested-messages">{JSON.stringify(suggestedMessages)}</div>
    </div>
  ),
}));

describe('ChatWidget', () => {
  it('passes correct props to Chat component', () => {
    const props = {
      webhookUrl: 'https://test-webhook.com',
      primaryColor: '#ff0000',
      welcomeText: 'Test welcome',
      suggestedQuestions: ['Question 1', 'Question 2'],
    };
    
    render(<ChatWidget {...props} />);
    
    expect(screen.getByTestId('webhook-url').textContent).toBe(props.webhookUrl);
    expect(screen.getByTestId('initial-messages').textContent).toContain(props.welcomeText);
    
    // Check that suggested questions are passed correctly
    const suggestedMessagesEl = screen.getByTestId('suggested-messages');
    expect(suggestedMessagesEl.textContent).toContain('Question 1');
    expect(suggestedMessagesEl.textContent).toContain('Question 2');
  });
});
