import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StudentInterface from './pages/StudentInterface';
import TeacherDashboard from './pages/TeacherDashboard';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState('student');
  const [language, setLanguage] = useState('en');
  const [translationsData, setTranslationsData] = useState({});

  useEffect(() => {
    // Fetch languages and translations from backend
    axios.get('http://localhost:5000/api/languages')
      .then(res => setTranslationsData(res.data))
      .catch(err => console.error('Error fetching languages:', err));
  }, []);

  // Simple translation helper function
  const t = (key) => {
    if (translationsData[language] && translationsData[language].translations[key]) {
      return translationsData[language].translations[key];
    }
    // Fallback to English if translation is missing
    if (translationsData['en'] && translationsData['en'].translations[key]) {
      return translationsData['en'].translations[key];
    }
    return key;
  };

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        translationsData={translationsData}
        t={t}
      />
      <div className="app-container">
        {currentPage === 'student' && <StudentInterface language={language} t={t} />}
        {currentPage === 'teacher' && <TeacherDashboard language={language} t={t} />}
      </div>
    </div>
  );
}

export default App;
