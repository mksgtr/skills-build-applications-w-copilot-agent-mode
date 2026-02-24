import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(results);
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry.id}>
                <td>{entry.username}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
