import React from 'react';

const TokenDebug: React.FC = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  return (
    <div style={{ padding: '10px', margin: '10px', border: '1px solid #ccc' }}>
      <h3>Environment Variable Debug</h3>
      <p>Token available: {token ? 'Yes' : 'No'}</p>
      {token && (
        <p>Token starts with: {token.substring(0, 4)}...</p>
      )}
    </div>
  );
};

export default TokenDebug;