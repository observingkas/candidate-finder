import React, { useState, useEffect } from 'react';
import { GitHubUser } from '../api/API';

const SavedCandidates: React.FC = () => {
  // State to store the list of saved candidates
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>([]);
  
  // Load saved candidates from localStorage when component mounts
  useEffect(() => {
    const loadSavedCandidates = () => {
      try {
        // Retrieve saved candidates from localStorage, default to empty array if none exist
        const candidates = JSON.parse(localStorage.getItem('acceptedCandidates') || '[]');
        setSavedCandidates(candidates);
      } catch (error) {
        // Handle any errors that might occur during parsing
        console.error('Error loading saved candidates:', error);
        setSavedCandidates([]);
      }
    };
    
    // Call the function to load saved candidates
    loadSavedCandidates();
  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Function to remove a candidate from the saved list
  const removeCandidate = (id: number) => {
    // Filter out the candidate with the matching ID
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    
    // Update the state with the filtered list
    setSavedCandidates(updatedCandidates);
    
    // Update localStorage with the new list
    localStorage.setItem('acceptedCandidates', JSON.stringify(updatedCandidates));
  };
  
  return (
    <div>
      <h2>Saved Candidates</h2>
      
      {/* Conditional rendering based on whether there are saved candidates */}
      {savedCandidates.length === 0 ? (
        // Display this message when no candidates are saved
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#1e1e1e', 
          borderRadius: '10px',
          marginTop: '20px'
        }}>
          <h3>No Candidates Saved</h3>
          <p>You haven't saved any candidates yet. Go to the search page to find and save candidates.</p>
        </div>
      ) : (
        // Display the list of saved candidates
        <div>
          <p>You have saved {savedCandidates.length} candidate(s).</p>
          
          {/* Grid layout for responsive display of candidates */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Map through each saved candidate and create a card */}
            {savedCandidates.map(candidate => (
              <div 
                key={candidate.id} // Use unique ID as key for React's reconciliation
                style={{ 
                  padding: '20px', 
                  backgroundColor: '#1e1e1e', 
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Header section with avatar and name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img 
                    src={candidate.avatar_url} 
                    alt={`${candidate.login}'s avatar`} 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%',
                      border: '3px solid #646cff'
                    }}
                  />
                  <div>
                    {/* Display name if available, otherwise use login name */}
                    <h3 style={{ margin: '0 0 5px 0' }}>{candidate.name || candidate.login}</h3>
                    <p style={{ margin: '0 0 5px 0', color: '#aaa' }}>@{candidate.login}</p>
                  </div>
                </div>
                
                {/* Additional candidate information */}
                <div style={{ marginTop: '15px' }}>
                  {/* Only display these fields if they exist */}
                  {candidate.location && <p style={{ margin: '0 0 5px 0' }}>📍 {candidate.location}</p>}
                  {candidate.company && <p style={{ margin: '0 0 5px 0' }}>🏢 {candidate.company}</p>}
                  {candidate.email && <p style={{ margin: '0 0 5px 0' }}>✉️ {candidate.email}</p>}
                </div>
                
                {/* Action buttons */}
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  {/* Link to GitHub profile */}
                  <a 
                    href={candidate.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      backgroundColor: '#333',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    View Profile
                  </a>
                  
                  {/* Button to remove candidate from saved list */}
                  <button 
                    onClick={() => removeCandidate(candidate.id)}
                    style={{ 
                      backgroundColor: '#dc3545', 
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;