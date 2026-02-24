import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
      });
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-3">Add Activity</button>
      </div>
    </div>
  );
}

export default Activities;
