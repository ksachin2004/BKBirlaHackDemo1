import React from 'react';
import './StudentProfileCard.css';

const StudentProfileCard = ({ data }) => {
  return (
    <div className="profile-card">
      <div className="card-header">
        <h2>Student Profile</h2>
      </div>
      <div className="card-content">
        <div className="info-row">
          <span className="label">Name:</span>
          <span className="value">{data.name}</span>
        </div>
        <div className="info-row">
          <span className="label">Roll No:</span>
          <span className="value">{data.roll_no || data.rollNo}</span>
        </div>
        <div className="info-row">
          <span className="label">Course:</span>
          <span className="value">{data.course}</span>
        </div>
        <div className="info-row">
          <span className="label">Year:</span>
          <span className="value">{data.year_string || data.year}</span>
        </div>
        <div className="info-row">
          <span className="label">Family Income:</span>
          <span className="value">{data.family_income_formatted || data.familyIncome || `₹${data.family_income}`}</span>
        </div>
        <div className="info-row">
          <span className="label">Parent Education:</span>
          <span className="value">{data.parent_education || data.parentEducation}</span>
        </div>
        <div className="info-row">
          <span className="label">Distance:</span>
          <span className="value">{data.distance_from_college ? `${data.distance_from_college} km` : data.distanceFromCollege}</span>
        </div>
        <div className="info-row">
          <span className="label">Accommodation:</span>
          <span className="value">{data.hostel_day_scholar || data.accommodation}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
