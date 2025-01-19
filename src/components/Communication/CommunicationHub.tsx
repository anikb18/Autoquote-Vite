import React, { useState } from 'react';

const CommunicationHub: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setNewMessage('');
            // Here you can add logic to send the message to your backend
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const uploadedFiles = Array.from(files);
            // Here you can add logic to save the files to your backend
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Communication Hub</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">Send</button>
            </div>
            <div>
                <h3 className="font-semibold">Chat History</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index} className="border-b py-2">{msg}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <input type="file" onChange={handleFileUpload} className="mb-4" />
                <p>Upload a document to share securely.</p>
            </div>
        </div>
    );
};

export default CommunicationHub;