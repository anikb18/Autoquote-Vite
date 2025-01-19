// src/pages/(auth)/dashboard/settings/BuyerSettings.tsx
import React from 'react';

const BuyerSettings = () => {
  return (
    <div>
      <h1>Buyer Settings</h1>
      <form>
        <div>
          <label htmlFor="buyer-name">Buyer Name:</label>
          <input type="text" id="buyer-name" name="buyer-name" />
        </div>
        <div>
          <label htmlFor="buyer-email">Buyer Email:</label>
          <input type="email" id="buyer-email" name="buyer-email" />
        </div>
        <div>
          <label htmlFor="notification-preferences">Notification Preferences:</label>
          <select id="notification-preferences" name="notification-preferences">
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="none">None</option>
          </select>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default BuyerSettings; 