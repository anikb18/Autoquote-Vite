import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Send } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export default function MessagesPage() {
  const { t } = useTranslation();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const conversations: Conversation[] = [
    {
      id: '1',
      participant: 'Toyota Montreal',
      lastMessage: "Thanks for your interest in the RAV4...",
      timestamp: '2024-01-14T12:00:00',
      unreadCount: 2,
    },
    {
      id: '2',
      participant: 'Honda Laval',
      lastMessage: "Your quote for the CR-V has been updated...",
      timestamp: '2024-01-14T11:30:00',
      unreadCount: 0,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      content: "Hi, I'm interested in the 2024 RAV4 XLE. Is it still available?",
      sender: 'user',
      timestamp: '2024-01-14T12:00:00',
      isRead: true,
    },
    {
      id: '2',
      content: "Yes, the RAV4 XLE is still available! Would you like to schedule a test drive?",
      sender: 'dealer',
      timestamp: '2024-01-14T12:05:00',
      isRead: true,
    },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('messages.search')}
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-gray-50' : ''
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://avatar.vercel.sh/${conversation.participant}.png`} />
                <AvatarFallback>{conversation.participant[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {conversation.participant}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Intl.DateTimeFormat('fr-CA', {
                      hour: 'numeric',
                      minute: 'numeric',
                    }).format(new Date(conversation.timestamp))}
                  </p>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Messages Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://avatar.vercel.sh/${conversations.find(c => c.id === selectedConversation)?.participant}.png`} />
                <AvatarFallback>
                  {conversations.find(c => c.id === selectedConversation)?.participant[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  {conversations.find(c => c.id === selectedConversation)?.participant}
                </h2>
                <p className="text-xs text-gray-500">{t('messages.online')}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Intl.DateTimeFormat('fr-CA', {
                        hour: 'numeric',
                        minute: 'numeric',
                      }).format(new Date(message.timestamp))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <Input
                placeholder={t('messages.typeMessage')}
                className="flex-1"
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">{t('messages.selectConversation')}</p>
        </div>
      )}
    </div>
  );
}
