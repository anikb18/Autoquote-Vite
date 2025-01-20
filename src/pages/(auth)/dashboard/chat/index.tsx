import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  senderName: string;
  senderAvatar?: string;
}

export default function ChatPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! How can I help you today?",
      sender: 'other',
      timestamp: new Date(),
      senderName: 'Support Agent',
      senderAvatar: '/avatars/agent.png'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      senderName: 'You',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('chat.title', 'Chat')}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            {t('chat.actions.startNewChat', 'Start New Chat')}
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-4 gap-4 overflow-hidden rounded-lg border bg-background shadow">
        {/* Contacts Sidebar */}
        <div className="col-span-1 border-r">
          <div className="p-4">
            <Input 
              placeholder={t('chat.search', 'Search conversations...')} 
              className="w-full"
            />
          </div>
          <ScrollArea className="h-[calc(100vh-15rem)]">
            {/* Add your contacts list here */}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="col-span-3 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === 'user' && "flex-row-reverse"
                  )}
                >
                  <Avatar>
                    <AvatarImage src={message.senderAvatar} />
                    <AvatarFallback>
                      {message.senderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[70%]",
                      message.sender === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    )}
                  >
                    <div className="text-sm font-medium">
                      {message.senderName}
                    </div>
                    <div>{message.content}</div>
                    <div className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className="shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('chat.messagePlaceholder', 'Type a message...')}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="shrink-0"
              >
                <Send className="h-4 w-4 mr-2" />
                {t('chat.actions.send', 'Send')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
