import React from 'react';

const AdminSettings = () => {
  return (
    <div>
      <h2>Admin Settings</h2>
      {/* Admin-specific settings go here */}
      <form>
        <div>
          <label htmlFor="app-name">Application Name:</label>
          <input type="text" id="app-name" name="app-name" />
        </div>
        <div>
          <label htmlFor="admin-email">Admin Email:</label>
          <input type="email" id="admin-email" name="admin-email" />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default AdminSettings;