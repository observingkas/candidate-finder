import React, { useState } from 'react';
import CandidateSearch from "./pages/CandidateSearch"; 
import { searchGithubUser } from './api/API';  

const App = () => {
  const [username, setUsername] = useState('');  
  const [candidate, setCandidate] = useState<any>(null);  

  const fetchCandidate = async () => {
    if (!username) {
      console.error('Please provide a username'); 
      return;
    }
    const data = await searchGithubUser(username);  
    if (data) {
      setCandidate(data);  // Set the candidate data if it's found
    }
  };

  return (
    <div>
      <h1>Search GitHub User</h1>

      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}  
        placeholder="Enter GitHub username" 
      />

      <button onClick={fetchCandidate}>Search User</button>

      {candidate && (
        <div>
          <h2>Candidate Info</h2>
          <p>Name: {candidate.name}</p>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
        </div>
      )}
    </div>
  );
};

export default App;
