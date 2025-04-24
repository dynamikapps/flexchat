import Head from 'next/head';
import { useState } from 'react';
import ChatWidget from '../components/ChatWidget';

export default function Home() {
  // Sample configuration - in a real app, these would come from environment variables or API
  const [config, setConfig] = useState({
    logoUrl: 'https://placehold.co/200x80?text=FlexChat',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    welcomeText: 'Welcome to FlexChat! How can I assist you today?',
    responseTimeText: 'Usually responds in a few minutes',
    position: 'right' as 'left' | 'right',
    initiallyOpen: false,
    suggestedQuestions: [
      'How do I get started?',
      'What features do you offer?',
      'How much does it cost?',
    ],
    webhookUrl: 'https://your-n8n-instance.com/webhook/path',
    userFields: {
      name: true,
      email: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FlexChat Demo</title>
        <meta name="description" content="Customizable chat widget powered by n8n" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">FlexChat Demo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A highly customizable chat widget for your website, powered by n8n workflows.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Widget Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Appearance</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-32 text-gray-700">Logo URL:</span>
                  <span className="text-gray-900">{config.logoUrl}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-700">Primary Color:</span>
                  <div className="flex items-center">
                    <div 
                      className="w-5 h-5 rounded mr-2" 
                      style={{ backgroundColor: config.primaryColor }}
                    />
                    <span>{config.primaryColor}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-700">Secondary Color:</span>
                  <div className="flex items-center">
                    <div 
                      className="w-5 h-5 rounded mr-2" 
                      style={{ backgroundColor: config.secondaryColor }}
                    />
                    <span>{config.secondaryColor}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Content</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-32 text-gray-700">Welcome Text:</span>
                  <span className="text-gray-900">{config.welcomeText}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-700">Response Time:</span>
                  <span className="text-gray-900">{config.responseTimeText}</span>
                </div>
                <div>
                  <span className="block w-32 text-gray-700 mb-1">Suggested Questions:</span>
                  <ul className="list-disc pl-10 text-gray-900">
                    {config.suggestedQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Widget Position</h3>
              <div className="flex items-center space-x-4">
                <button
                  className={`px-4 py-2 rounded ${config.position === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setConfig({...config, position: 'left' as 'left' | 'right'})}
                >
                  Left
                </button>
                <button
                  className={`px-4 py-2 rounded ${config.position === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setConfig({...config, position: 'right' as 'left' | 'right'})}
                >
                  Right
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Initial State</h3>
              <div className="flex items-center space-x-4">
                <button
                  className={`px-4 py-2 rounded ${config.initiallyOpen ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setConfig({...config, initiallyOpen: true})}
                >
                  Open
                </button>
                <button
                  className={`px-4 py-2 rounded ${!config.initiallyOpen ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setConfig({...config, initiallyOpen: false})}
                >
                  Closed
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              The chat widget is active in the bottom-{config.position} corner of this page. Click the chat icon to open it.
            </p>
            <p className="text-sm text-gray-500">
              Note: This demo uses a placeholder webhook URL. In a real implementation, you would connect this to your n8n instance.
            </p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 right-4">
        <ChatWidget {...config} />
      </div>
    </div>
  );
}
