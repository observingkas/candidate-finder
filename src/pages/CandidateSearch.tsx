import { useState } from "react";
import { getCandidateData } from "../api/API";

const CandidateSearch = () => {
    const [username, setUsername] = useState("");
    const [candidate, setCandidate] = useState<any>(null);

    const fetchCandidate = async () => {
        if (!username) return; // Prevent empty searches

        const data = await getCandidateData(username);
        console.log("Candidate Data:", data); // Log response for debugging
        setCandidate(data); // Store data in state
    };

    return (
        <div>
            <h2>Search GitHub Candidates</h2>
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchCandidate}>Search</button>

            {/* Display candidate info if available */}
            {candidate && (
                <div>
                    <h3>{candidate.name || "No Name Provided"}</h3>
                    <p>Username: {candidate.login}</p>
                    <p>Location: {candidate.location || "Unknown"}</p>
                    <p>Company: {candidate.company || "Not Listed"}</p>
                    <p>Email: {candidate.email || "Not Available"}</p>
                    <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                        View Profile
                    </a>
                    <br />
                    <img src={candidate.avatar_url} alt={candidate.name} width="100" />
                </div>
            )}
        </div>
    );
};

export default CandidateSearch;
