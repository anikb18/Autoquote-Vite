// QuickAction.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const QuickAction = ({ title, description, icon, href }) => {
  return (
    <Link
      to={href}
      className="relative group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center">
        <span className="text-3xl mr-4">{icon}</span>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuickAction;