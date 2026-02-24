import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', data);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Team Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success mt-3">Create Team</button>
      </div>
    </div>
  );
}

export default Teams;
