import React, { useState } from 'react';

const DocumentCenter: React.FC = () => {
    const [documents, setDocuments] = useState<File[]>([]);
    const [recentDocuments, setRecentDocuments] = useState<string[]>([]);
    const [pendingSignatures, setPendingSignatures] = useState<string[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const uploadedFiles = Array.from(files);
            setDocuments(prevDocs => [...prevDocs, ...uploadedFiles]);
            // Here you can add logic to save the files to your backend
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Document Center</h2>
            <input type="file" multiple onChange={handleFileUpload} className="mb-4" />
            <div>
                <h3 className="font-semibold">Recent Documents</h3>
                <ul>
                    {recentDocuments.map((doc, index) => (
                        <li key={index}>{doc}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">Pending Signatures</h3>
                <ul>
                    {pendingSignatures.map((doc, index) => (
                        <li key={index}>{doc}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DocumentCenter;