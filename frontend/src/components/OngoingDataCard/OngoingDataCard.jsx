import React from 'react';
import './OngoingDataCard.css';

const OngoingDataCard = ({ data }) => {
  // Helper function to determine status level
  const getStatusLevel = (value, thresholds) => {
    if (value <= thresholds.danger) return 'danger';
    if (value <= thresholds.warning) return 'warning';
    return 'good';
  };

  // Calculate CGPA trend
  const currentCGPA = data.cgpa_current || data.currentCGPA || 0;
  const previousCGPA = data.cgpa_previous || data.previousCGPA || 0;
  const cgpaTrend = currentCGPA - previousCGPA;
  const cgpaTrendDirection = cgpaTrend > 0 ? 'up' : cgpaTrend < 0 ? 'down' : 'stable';

  // Handle assignments data
  const assignments = {
    submitted: data.assignments_submitted || 0,
    total: data.assignments_total || 10
  };
  const assignmentPercentage = (assignments.submitted / assignments.total) * 100;

  // Calculate days since last login
  const calculateDaysSince = (daysValue) => {
    // Handle both string format ("3 days ago") and number format (3)
    if (typeof daysValue === 'string' && daysValue.includes('days ago')) {
      const days = parseInt(daysValue);
      return days;
    }
    if (typeof daysValue === 'number') {
      return daysValue;
    }
    return null;
  };

  const daysSinceLogin = calculateDaysSince(data.lms_last_login_days || data.lastLMSLogin);

  // Get attendance value
  const attendance = data.attendance_percentage || data.attendance || 0;

  // Format other data fields
  const libraryVisits = data.library_visits_monthly ? `${data.library_visits_monthly} visits/month` : (data.libraryVisits || '0 visits');
  const lastLMSLogin = daysSinceLogin !== null ? `${daysSinceLogin} days ago` : (data.lastLMSLogin || 'Never');
  const extracurricular = data.extracurricular_participation ? 'Active participation' : (data.extracurricular || 'No participation');
  const feeStatus = data.tuition_fees_up_to_date ? 'Paid' : (data.feeStatus || 'Pending');
  const counselorVisits = data.counselor_visits || data.counselorVisits || '0';

  return (
    <div className="ongoing-card">
      {/* Header */}
      <div className="card-header">
        <div className="header-content">
          <div className="header-icon"></div>
          <div className="header-text">
            <h2>Ongoing Performance Data</h2>
            <p>Real-time academic and engagement metrics</p>
          </div>
        </div>
        <div className="header-badge">
          <span className="live-indicator"></span>
          Live Data
        </div>
      </div>

      <div className="card-content">
        {/* Academic Performance Section */}
        <div className="data-section">
          <div className="section-header">
            <span className="section-icon"></span>
            <h3>Academic Performance</h3>
          </div>
          
          <div className="metrics-grid">
            {/* Attendance */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon"></span>
                <span className="metric-label">Attendance</span>
              </div>
              <div className="metric-body">
                <div className={`metric-value ${getStatusLevel(attendance, { danger: 50, warning: 75 })}`}>
                  {attendance}%
                </div>
                <div className="progress-bar-container">
                  <div 
                    className={`progress-bar ${getStatusLevel(attendance, { danger: 50, warning: 75 })}`}
                    style={{ width: `${attendance}%` }}
                  ></div>
                </div>
                <span className="metric-subtext">Last 30 days</span>
              </div>
            </div>

            {/* CGPA */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon"></span>
                <span className="metric-label">Current CGPA</span>
              </div>
              <div className="metric-body">
                <div className="cgpa-display">
                  <span className={`metric-value ${getStatusLevel(currentCGPA, { danger: 5, warning: 6.5 })}`}>
                    {currentCGPA}
                  </span>
                  <span className={`trend-indicator ${cgpaTrendDirection}`}>
                    {cgpaTrendDirection === 'up' && '↑'}
                    {cgpaTrendDirection === 'down' && '↓'}
                    {cgpaTrendDirection === 'stable' && '→'}
                    <span className="trend-value">
                      {cgpaTrend > 0 ? '+' : ''}{cgpaTrend.toFixed(1)}
                    </span>
                  </span>
                </div>
                <div className="cgpa-comparison">
                  <span className="previous-label">Previous:</span>
                  <span className="previous-value">{previousCGPA}</span>
                </div>
              </div>
            </div>

            {/* Assignments */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon"></span>
                <span className="metric-label">Assignments</span>
              </div>
              <div className="metric-body">
                <div className={`metric-value ${getStatusLevel(assignmentPercentage, { danger: 40, warning: 70 })}`}>
                  {assignments.submitted}/{assignments.total}
                </div>
                <div className="progress-bar-container">
                  <div 
                    className={`progress-bar ${getStatusLevel(assignmentPercentage, { danger: 40, warning: 70 })}`}
                    style={{ width: `${assignmentPercentage}%` }}
                  ></div>
                </div>
                <span className="metric-subtext">Submitted this semester</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Section */}
        <div className="data-section">
          <div className="section-header">
            <span className="section-icon"></span>
            <h3>Engagement & Activity</h3>
          </div>
          
          <div className="engagement-grid">
            {/* Library Visits */}
            <div className="engagement-item">
              <div className="engagement-icon-wrapper library">
                <span></span>
              </div>
              <div className="engagement-details">
                <span className="engagement-label">Library Visits</span>
                <span className={`engagement-value ${libraryVisits.includes('0') ? 'warning' : ''}`}>
                  {libraryVisits}
                </span>
              </div>
            </div>

            {/* LMS Login */}
            <div className="engagement-item">
              <div className={`engagement-icon-wrapper lms ${daysSinceLogin > 7 ? 'inactive' : ''}`}>
                <span></span>
              </div>
              <div className="engagement-details">
                <span className="engagement-label">Last LMS Login</span>
                <span className={`engagement-value ${daysSinceLogin > 7 ? 'warning' : ''}`}>
                  {lastLMSLogin}
                </span>
              </div>
            </div>

            {/* Extracurricular */}
            <div className="engagement-item">
              <div className={`engagement-icon-wrapper extra ${extracurricular.includes('No') ? 'inactive' : ''}`}>
                <span></span>
              </div>
              <div className="engagement-details">
                <span className="engagement-label">Extracurricular</span>
                <span className={`engagement-value ${extracurricular.includes('No') ? 'warning' : ''}`}>
                  {extracurricular}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial & Wellbeing Section */}
        <div className="data-section">
          <div className="section-header">
            <span className="section-icon"></span>
            <h3>Financial & Wellbeing</h3>
          </div>
          
          <div className="status-cards">
            {/* Fee Status */}
            <div className={`status-card ${feeStatus === 'Paid' ? 'status-good' : 'status-warning'}`}>
              <div className="status-icon">
                {feeStatus === 'Paid' ? 'OK' : 'X'}
              </div>
              <div className="status-content">
                <span className="status-label">Fee Payment Status</span>
                <span className="status-value">{feeStatus}</span>
              </div>
              {feeStatus !== 'Paid' && (
                <div className="status-badge urgent">Action Required</div>
              )}
            </div>

            {/* Counselor Visits */}
            <div className={`status-card ${counselorVisits && counselorVisits !== '0' ? 'status-attention' : 'status-neutral'}`}>
              <div className="status-icon">
                {counselorVisits && counselorVisits !== '0' ? 'ATTN' : 'OK'}
              </div>
              <div className="status-content">
                <span className="status-label">Counselor Visits</span>
                <span className="status-value">{counselorVisits}</span>
              </div>
              {counselorVisits && counselorVisits !== '0' && (
                <div className="status-badge monitor">Monitor</div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Summary Footer */}
        <div className="card-footer">
          <div className="summary-item">
            <span className="summary-dot danger"></span>
            <span>Critical Areas: 3</span>
          </div>
          <div className="summary-item">
            <span className="summary-dot warning"></span>
            <span>Needs Attention: 2</span>
          </div>
          <div className="summary-item">
            <span className="summary-dot good"></span>
            <span>On Track: 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingDataCard;