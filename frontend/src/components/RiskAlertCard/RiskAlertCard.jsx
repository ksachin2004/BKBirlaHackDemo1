import React from 'react';
import './RiskAlertCard.css';

const RiskAlertCard = ({ data, studentData }) => {
  const getRiskColor = (level) => {
    if (level === 'HIGH') return '#ef4444';
    if (level === 'MEDIUM') return '#f59e0b';
    return '#10b981';
  };

  const getRiskEmoji = (level) => {
    if (level === 'HIGH') return '🔴';
    if (level === 'MEDIUM') return '🟡';
    return '🟢';
  };

  return (
    <div className="risk-alert-card">
      <div className="alert-header">
        <h2>🚨 STUDENT DROPOUT RISK ALERT</h2>
      </div>
      <div className="alert-content">
        <div className="student-info">
          <p><strong>Student:</strong> {studentData.name} ({studentData.roll_no || studentData.rollNo})</p>
          <p><strong>Course:</strong> {studentData.course} - {studentData.year_string || studentData.year}</p>
        </div>
        
        <div 
          className="risk-level-box"
          style={{ 
            borderColor: getRiskColor(data.risk_level || data.riskLevel),
            background: `${getRiskColor(data.risk_level || data.riskLevel)}15`
          }}
        >
          <div className="risk-label">RISK LEVEL</div>
          <div className="risk-value" style={{ color: getRiskColor(data.risk_level || data.riskLevel) }}>
            {getRiskEmoji(data.risk_level || data.riskLevel)} {data.risk_level || data.riskLevel} ({data.risk_percentage || data.riskPercentage}%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAlertCard;
