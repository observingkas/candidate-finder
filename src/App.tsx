import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>GitHub Candidate Finder</h1>
      
      <nav style={{ marginBottom: '20px' }}>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
          <li>
            <Link to="/">Search Candidates</Link>
          </li>
          <li>
            <Link to="/savedcandidates">Saved Candidates</Link>
          </li>
        </ul>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default App;
