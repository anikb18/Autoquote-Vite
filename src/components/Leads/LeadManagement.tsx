import React, { useState } from 'react';

const LeadManagement: React.FC = () => {
    const [leads, setLeads] = useState<{ id: number; name: string; status: string }[]>([
        { id: 1, name: 'Lead 1', status: 'New' },
        { id: 2, name: 'Lead 2', status: 'Active' },
        { id: 3, name: 'Lead 3', status: 'Converted' },
    ]);

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Lead Management</h2>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="border-b p-2 text-left">Lead Name</th>
                        <th className="border-b p-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id} className="border-b">
                            <td className="p-2">{lead.name}</td>
                            <td className="p-2">{lead.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadManagement;