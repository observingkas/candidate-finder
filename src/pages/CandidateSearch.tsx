import React, { useState, useEffect } from "react";
import { getRandomUser, GitHubUser } from '../api/API';

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  // Load a random candidate when the component mounts
  useEffect(() => {
    loadRandomCandidate();
  }, []);

  // Function to load a random candidate
  const loadRandomCandidate = async () => {
    setLoading(true);
    try {
      const user = await getRandomUser();
      if (user) {
        setCandidate(user);
        setNoMoreCandidates(false);
      } else {
        setNoMoreCandidates(true);
      }
    } catch (error) {
      console.error("Error loading random candidate:", error);
      setNoMoreCandidates(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to save a candidate to localStorage
  const saveCandidate = () => {
    if (!candidate) return;
    
    // Get existing saved candidates from localStorage
    const savedCandidates = JSON.parse(localStorage.getItem('acceptedCandidates') || '[]');
    
    // Check if candidate is already saved (by id)
    const isDuplicate = savedCandidates.some((saved: GitHubUser) => saved.id === candidate.id);
    
    if (!isDuplicate) {
      // Add the new candidate to the array
      savedCandidates.push(candidate);
      
      // Save the updated list back to localStorage
      localStorage.setItem('acceptedCandidates', JSON.stringify(savedCandidates));
      
      console.log(`Candidate ${candidate.login} saved!`);
    } else {
      console.log(`Candidate ${candidate.login} is already saved.`);
    }
    
    // Load the next candidate
    loadRandomCandidate();
  };

  // Function to reject a candidate and load the next one
  const rejectCandidate = () => {
    loadRandomCandidate();
  };

  return (
    <div>
      <h2>Candidate Search</h2>
      
      {loading && <p>Loading candidate...</p>}
      
      {noMoreCandidates && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '5px', color: '#721c24' }}>
          <h3>No More Candidates Available</h3>
          <p>There are no more candidates to review at this time.</p>
        </div>
      )}
      
      {!loading && !noMoreCandidates && candidate && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1e1e1e', 
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img 
              src={candidate.avatar_url} 
              alt={`${candidate.login}'s avatar`} 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%',
                border: '3px solid #646cff'
              }}
            />
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{candidate.name || candidate.login}</h3>
              <p style={{ margin: '0 0 5px 0', color: '#aaa' }}>@{candidate.login}</p>
              {candidate.location && <p style={{ margin: '0 0 5px 0' }}>📍 {candidate.location}</p>}
              {candidate.company && <p style={{ margin: '0 0 5px 0' }}>🏢 {candidate.company}</p>}
              {candidate.email && <p style={{ margin: '0 0 5px 0' }}>✉️ {candidate.email}</p>}
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
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
                borderRadius: '4px',
                marginBottom: '20px'
              }}
            >
              View GitHub Profile
            </a>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button 
              onClick={rejectCandidate}
              style={{ 
                backgroundColor: '#dc3545', 
                color: 'white', 
                fontSize: '24px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              -
            </button>
            <button 
              onClick={saveCandidate}
              style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                fontSize: '24px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;