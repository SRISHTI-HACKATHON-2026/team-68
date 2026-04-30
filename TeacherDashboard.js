import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TeacherDashboard.css';
import { FiBarChart2, FiUsers, FiTrendingUp, FiDownload, FiFilter } from 'react-icons/fi';

function TeacherDashboard({ language, t }) {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [stats, setStats] = useState({
    totalResponses: 0,
    correct: 0,
    conceptualErrors: 0,
    partialUnderstanding: 0,
    roteMemorization: 0,
    irrelevantGuessing: 0,
    correctPercentage: 0
  });
  const API_URL = 'http://localhost:5000/api';
  
  // Class options (mapped to class levels)
  const classOptions = [
    { value: '1', label: 'Class 1' },
    { value: '2', label: 'Class 2' },
    { value: '3', label: 'Class 3' },
    { value: '4', label: 'Class 4' },
    { value: '5', label: 'Class 5' },
    { value: '6', label: 'Class 6' },
    { value: '7', label: 'Class 7' },
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' }
  ];
  const subjects = {
    all: { name: 'All Subjects', icon: '📚' },
    science: { name: 'Science', icon: '🔬' },
    math: { name: 'Mathematics', icon: '📐' },
    english: { name: 'English', icon: '📖' },
    history: { name: 'History', icon: '🏛️' },
    geography: { name: 'Geography', icon: '🌍' }
  };

  useEffect(() => {
    fetchStats();
  }, [selectedClass, selectedSubject]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/teacher/stats`, {
        params: {
          class: selectedClass,
          subject: selectedSubject
        }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats if API fails
      setStats({
        totalResponses: 0,
        correct: 0,
        conceptualErrors: 0,
        partialUnderstanding: 0,
        roteMemorization: 0,
        irrelevantGuessing: 0,
        correctPercentage: 0
      });
    }
  };

  const exportReport = () => {
    const report = JSON.stringify(stats, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', 'student-responses-report.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };



  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h2>📊 {t ? t('teacherDashboard') : 'Teacher Dashboard'} - Misconception Analysis</h2>
        <p>Monitor student understanding and common misconceptions across all concepts</p>
      </div>

      {/* Class and Subject Filters */}
      <div className="dashboard-filters">
        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <label>Filter by:</label>
        </div>
        <div className="filter-group">
          <label>Class:</label>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Classes</option>
            {classOptions.map(cls => (
              <option key={cls.value} value={cls.value}>{cls.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Subject:</label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
          >
            {Object.entries(subjects).map(([key, value]) => (
              <option key={key} value={key}>{value.icon} {value.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <FiBarChart2 className="stat-icon" />
          <div className="stat-content">
            <div className="stat-number">{stats.totalResponses}</div>
            <div className="stat-label">Total Responses</div>
          </div>
        </div>

        <div className="stat-card success">
          <FiTrendingUp className="stat-icon" />
          <div className="stat-content">
            <div className="stat-number">{stats.correctPercentage}%</div>
            <div className="stat-label">Correct Responses</div>
          </div>
        </div>

        <div className="stat-card warning">
          <FiUsers className="stat-icon" />
          <div className="stat-content">
            <div className="stat-number">{stats.partialUnderstanding}</div>
            <div className="stat-label">Partial Understanding</div>
          </div>
        </div>

        <div className="stat-card danger">
          <FiBarChart2 className="stat-icon" />
          <div className="stat-content">
            <div className="stat-number">{stats.conceptualErrors}</div>
            <div className="stat-label">Conceptual Errors</div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <label htmlFor="subject-filter">Export Data:</label>
        <button className="export-btn" onClick={exportReport}>
          <FiDownload /> Export Report
        </button>
      </div>

      {stats.totalResponses === 0 ? (
        <div className="no-responses-message" style={{textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginTop: '20px'}}>
          <h3>No Student Responses Yet</h3>
          <p>Student responses will appear here once they start answering questions.</p>
          <p>When students submit their answers, the dashboard will show real-time statistics.</p>
        </div>
      ) : (
        <div className="response-details" style={{marginTop: '20px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
          <h3>📊 Response Breakdown</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px'}}>
            <div style={{padding: '15px', background: '#d1fae5', borderRadius: '8px', textAlign: 'center'}}>
              <div style={{fontSize: '24px', fontWeight: 'bold', color: '#065f46'}}>{stats.correct}</div>
              <div style={{color: '#065f46'}}>✓ Correct Answers</div>
            </div>
            <div style={{padding: '15px', background: '#fef3c7', borderRadius: '8px', textAlign: 'center'}}>
              <div style={{fontSize: '24px', fontWeight: 'bold', color: '#92400e'}}>{stats.partialUnderstanding}</div>
              <div style={{color: '#92400e'}}>⚠ Partial Understanding</div>
            </div>
            <div style={{padding: '15px', background: '#fee2e2', borderRadius: '8px', textAlign: 'center'}}>
              <div style={{fontSize: '24px', fontWeight: 'bold', color: '#991b1b'}}>{stats.conceptualErrors}</div>
              <div style={{color: '#991b1b'}}>✗ Conceptual Errors</div>
            </div>
          </div>
        </div>
      )}



      <div className="recommendations-section">
        <h3>📌 Recommendations for Educators</h3>
        <div className="recommendations-list">
          <div className="recommendation-item">
            <span className="rec-icon">1️⃣</span>
            <p><strong>Focus on High-Error Topics:</strong> Concepts with {'>'} 30% error rate need additional explanation and practice.</p>
          </div>
          <div className="recommendation-item">
            <span className="rec-icon">2️⃣</span>
            <p><strong>Use Story-Based Learning:</strong> Students with partial understanding benefit from narrative explanations and real-world connections.</p>
          </div>
          <div className="recommendation-item">
            <span className="rec-icon">3️⃣</span>
            <p><strong>Peer Discussions:</strong> Encourage group discussions using the generated prompts to resolve conceptual misconceptions collaboratively.</p>
          </div>
          <div className="recommendation-item">
            <span className="rec-icon">4️⃣</span>
            <p><strong>Visual Aids:</strong> Create diagrams and visual representations based on the system's suggestions for better comprehension.</p>
          </div>
          <div className="recommendation-item">
            <span className="rec-icon">5️⃣</span>
            <p><strong>Regular Check-ins:</strong> Monitor progress weekly to identify students who need additional support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
