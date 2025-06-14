
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Settings } from 'lucide-react';

export const ChatNotesPanel = () => {
  const [message, setMessage] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState([
    { id: 1, sender: 'John Doe', message: 'Welcome to the interview! Please feel free to ask any questions.', time: '10:30' },
    { id: 2, sender: 'Sarah Chen', message: 'Thank you! Looking forward to it.', time: '10:31' },
    { id: 3, sender: 'John Doe', message: 'Let\'s start with the coding challenge. You can see it in the editor.', time: '10:32' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, {
        id: chatMessages.length + 1,
        sender: 'John Doe',
        message: message.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
    }
  };

  return (
    <Card className="h-full bg-dark-secondary border-border-dark flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark">
        <h3 className="text-white font-medium">Chat & Notes</h3>
        <Button variant="ghost" size="icon" className="text-text-secondary hover:text-white h-8 w-8">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabs Content */}
      <div className="flex-1 p-4">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <TabsList className="bg-dark-primary border-border-dark mb-4">
            <TabsTrigger value="chat" className="text-text-secondary data-[state=active]:text-white data-[state=active]:bg-tech-green/20">
              Chat
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-text-secondary data-[state=active]:text-white data-[state=active]:bg-tech-green/20">
              Notes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 flex flex-col space-y-4">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 bg-dark-primary rounded border border-border-dark p-4">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-tech-green font-medium text-sm">{msg.sender}</span>
                      <span className="text-text-secondary text-xs">{msg.time}</span>
                    </div>
                    <p className="text-white text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-dark-primary border border-border-dark rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-tech-green"
              />
              <Button size="sm" onClick={sendMessage} className="bg-tech-green hover:bg-tech-green/80 text-dark-primary">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="flex-1">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your interview notes here..."
              className="h-full bg-dark-primary border-border-dark text-white resize-none focus:border-tech-green"
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
