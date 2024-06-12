import React from 'react';

const UserDetail = ({ user, addBaseUrl }) => {
  const renderTestResults = (testResult) => {
    return (
      <div style={{ marginTop: '20px' }}>
        <h4>Test Results:</h4>
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Measure</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(testResult).map(([measure, value]) => (
              <tr key={measure} style={{ border: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{measure}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>{user.keyword}</h4>
      {user.df_plot && (
        <div style={{ margin: '10px 0', lineHeight: '1.6' }}>
          <h4>DF Plot:</h4>
          <img src={addBaseUrl(user.df_plot)} alt="DF Plot" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {user.decompose_plot && (
        <div style={{ margin: '10px 0', lineHeight: '1.6' }}>
          <h4>Decompose Plot:</h4>
          <img src={addBaseUrl(user.decompose_plot)} alt="Decompose Plot" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {user.predict_plot && (
        <div style={{ margin: '10px 0', lineHeight: '1.6' }}>
          <h4>Predict Plot:</h4>
          <img src={addBaseUrl(user.predict_plot)} alt="Predict Plot" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {user.test_result && renderTestResults(user.test_result)}
    </div>
  );
};

export default UserDetail;