// src/pages/(auth)/dashboard/settings/DealerSettings.tsx
import React from 'react';

const DealerSettings = () => {
  return (
    <div>
      <h1>Dealer Settings</h1>
      <form>
        <div>
          <label htmlFor="dealer-name">Dealer Name:</label>
          <input type="text" id="dealer-name" name="dealer-name" />
        </div>
        <div>
          <label htmlFor="dealer-email">Dealer Email:</label>
          <input type="email" id="dealer-email" name="dealer-email" />
        </div>
        <div>
          <label htmlFor="contact-number">Contact Number:</label>
          <input type="tel" id="contact-number" name="contact-number" />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default DealerSettings;