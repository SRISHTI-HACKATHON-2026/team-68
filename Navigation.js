import React from 'react';
import { FiBook, FiBarChart2, FiGlobe } from 'react-icons/fi';
import '../styles/Navigation.css';

function Navigation({ currentPage, setCurrentPage, language, setLanguage, translationsData, t }) {
  // Use fetched languages or fallback to default
  const languages = Object.keys(translationsData).length > 0 
    ? Object.keys(translationsData).reduce((acc, key) => {
        acc[key] = translationsData[key].language;
        return acc;
      }, {})
    : { en: 'English', kannada: 'ಕನ್ನಡ', hindi: 'हिंदी' };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">🧠</span>
          <h1>ComprehensionAI</h1>
        </div>
        
        <div className="nav-menu">
          <button 
            className={`nav-button ${currentPage === 'student' ? 'active' : ''}`}
            onClick={() => setCurrentPage('student')}
          >
            <FiBook /> {t('studentMode') || 'Student Mode'}
          </button>
          <button 
            className={`nav-button ${currentPage === 'teacher' ? 'active' : ''}`}
            onClick={() => setCurrentPage('teacher')}
          >
            <FiBarChart2 /> {t('teacherDashboard') || 'Teacher Dashboard'}
          </button>
        </div>

        <div className="nav-language">
          <FiGlobe />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
