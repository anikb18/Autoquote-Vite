// components/StatCard.js
import React from 'react';

const StatCard = ({ title, value, change, type, icon, accentColor }) => {
  return (
    <div className="stat-card">
      <div className="icon" style={{ backgroundColor: accentColor }}>
        {icon}
      </div>
      <div className="content">
        <p className="title">{title}</p>
        <p className="value">{value}</p>
        <p className={`change ${type}`}>{change}%</p>
      </div>
    </div>
  );
};

export default StatCard;