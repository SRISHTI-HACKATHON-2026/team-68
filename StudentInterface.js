import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/StudentInterface.css';
import QuestionCard from '../components/QuestionCard';
import FeedbackPanel from '../components/FeedbackPanel';

function StudentInterface({ language, t }) {
  const [questions, setQuestions] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  
  // New state for class, subject, and voice chat
  const [studentClass, setStudentClass] = useState('6');
  const [selectedSubject, setSelectedSubject] = useState('science');
  const [isListening, setIsListening] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  
  // AI Practice state
  const [practiceContext, setPracticeContext] = useState('');
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [isGeneratingPractice, setIsGeneratingPractice] = useState(false);
  const [showPracticeHint, setShowPracticeHint] = useState(false);
  
  // Voice features state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [practiceIsListening, setPracticeIsListening] = useState(false);
  const speechSynthesisRef = useRef(null);
  const practiceRecognitionRef = useRef(null);
  
  const recognitionRef = useRef(null);
  const API_URL = 'http://localhost:5000/api';

  // Subject options
  const subjects = {
    science: { name: 'Science', icon: '🔬' },
    math: { name: 'Mathematics', icon: '📐' },
    english: { name: 'English', icon: '📚' },
    history: { name: 'History', icon: '🏛️' },
    geography: { name: 'Geography', icon: '🌍' }
  };

  // Class/Standard options
  const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let newFinalText = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            newFinalText += event.results[i][0].transcript + ' ';
          }
        }
        if (newFinalText.trim().length > 0) {
          setStudentAnswer(prev => {
            const current = prev.trim();
            return current ? current + ' ' + newFinalText.trim() : newFinalText.trim();
          });
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
    
    // Initialize speech synthesis for text-to-speech
    speechSynthesisRef.current = window.speechSynthesis;
    
    // Initialize speech recognition for AI Practice mode
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      practiceRecognitionRef.current = new SpeechRecognition();
      practiceRecognitionRef.current.continuous = true;
      practiceRecognitionRef.current.interimResults = true;
      
      practiceRecognitionRef.current.onresult = (event) => {
        let newFinalText = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            newFinalText += event.results[i][0].transcript + ' ';
          }
        }
        if (newFinalText.trim().length > 0) {
          setPracticeContext(prev => {
            const current = prev.trim();
            return current ? current + ' ' + newFinalText.trim() : newFinalText.trim();
          });
        }
      };
      
      practiceRecognitionRef.current.onend = () => {
        setPracticeIsListening(false);
      };
      
      practiceRecognitionRef.current.onerror = (event) => {
        console.error('Practice speech recognition error:', event.error);
        setPracticeIsListening(false);
      };
    }
  }, []);

  // Filter questions based on class and subject
  useEffect(() => {
    fetchQuestions();
  }, [studentClass, selectedSubject]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/questions`);
      // Filter questions based on class and subject
      const filteredQuestions = {};
      Object.keys(response.data).forEach(key => {
        const q = response.data[key];
        // Check if question matches selected subject and class
        const matchesSubject = !selectedSubject || q.subject === selectedSubject || !q.subject;
        const matchesClass = !studentClass || q.classLevel === studentClass || !q.classLevel;
        
        if (matchesSubject && matchesClass) {
          filteredQuestions[key] = q;
        }
      });
      
      setQuestions(filteredQuestions);
      const questionIds = Object.keys(filteredQuestions);
      if (questionIds.length > 0) {
        setCurrentQuestionId(questionIds[0]);
      } else {
        setCurrentQuestionId(null);
        setAnalysis(null);
        setShowFeedback(false);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Voice input handlers
  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser. Please try using Google Chrome.");
      return;
    }
    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.lang = language === 'kannada' ? 'kn-IN' : language === 'hindi' ? 'hi-IN' : 'en-US';
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Speech recognition start error:', err);
      }
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Text-to-speech function to read questions aloud
  const speakText = (text) => {
    if (!speechSynthesisRef.current) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }
    
    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'kannada' ? 'kn-IN' : language === 'hindi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesisRef.current.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // AI Practice voice input handlers
  const startPracticeVoiceInput = () => {
    if (!practiceRecognitionRef.current) {
      alert("Voice input is not supported in your browser. Please try using Google Chrome.");
      return;
    }
    if (!practiceIsListening) {
      setPracticeIsListening(true);
      practiceRecognitionRef.current.lang = language === 'kannada' ? 'kn-IN' : language === 'hindi' ? 'hi-IN' : 'en-US';
      try {
        practiceRecognitionRef.current.start();
      } catch (err) {
        console.error('Practice speech recognition start error:', err);
      }
    }
  };

  const stopPracticeVoiceInput = () => {
    if (practiceRecognitionRef.current && practiceIsListening) {
      practiceRecognitionRef.current.stop();
      setPracticeIsListening(false);
    }
  };

  // AI Chat functions
  const toggleAIChat = () => {
    setShowAIChat(!showAIChat);
  };

  const sendAIMessage = async () => {
    if (!aiInput.trim()) return;
    
    const userMessage = { role: 'user', content: aiInput };
    setAiChatMessages(prev => [...prev, userMessage]);
    setAiInput('');
    setIsAILoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/ai-chat`, {
        message: aiInput,
        context: analysis,
        language: language
      });
      
      const aiMessage = { role: 'ai', content: response.data.response };
      setAiChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending AI message:', error);
      setAiChatMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I could not process your request. Please try again.' }]);
    } finally {
      setIsAILoading(false);
    }
  };

  const generatePracticeQuestion = async () => {
    if (!practiceContext.trim()) return;
    setIsGeneratingPractice(true);
    setShowPracticeHint(false);
    
    try {
      const response = await axios.post(`${API_URL}/student/generate-question`, {
        student_class: studentClass,
        subject: selectedSubject,
        context_text: practiceContext
      });
      setPracticeQuestion(response.data.generatedQuestion);
    } catch (error) {
      console.error('Error generating practice question:', error);
      alert('Failed to generate question. Ensure backend is running.');
    } finally {
      setIsGeneratingPractice(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim()) {
      alert('Please enter an answer before submitting!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/analyze`, {
        questionId: currentQuestionId,
        studentAnswer: studentAnswer,
        language: language
      });
      setAnalysis(response.data);
      setShowFeedback(true);
      setAnsweredQuestions({
        ...answeredQuestions,
        [currentQuestionId]: response.data
      });
    } catch (error) {
      console.error('Error analyzing answer:', error);
      alert('Error analyzing your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    const questionIds = Object.keys(questions);
    const currentIndex = questionIds.indexOf(currentQuestionId);
    if (currentIndex < questionIds.length - 1) {
      setCurrentQuestionId(questionIds[currentIndex + 1]);
      setStudentAnswer('');
      setShowFeedback(false);
      setAnalysis(null);
    }
  };

  const handlePreviousQuestion = () => {
    const questionIds = Object.keys(questions);
    const currentIndex = questionIds.indexOf(currentQuestionId);
    if (currentIndex > 0) {
      setCurrentQuestionId(questionIds[currentIndex - 1]);
      setStudentAnswer(answeredQuestions[questionIds[currentIndex - 1]]?.studentAnswer || '');
      setShowFeedback(!!answeredQuestions[questionIds[currentIndex - 1]]);
      if (answeredQuestions[questionIds[currentIndex - 1]]) {
        setAnalysis(answeredQuestions[questionIds[currentIndex - 1]]);
      }
    }
  };

  const currentQuestion = questions[currentQuestionId];
  const questionIds = Object.keys(questions);
  const currentIndex = questionIds.indexOf(currentQuestionId) + 1;
  const totalQuestions = questionIds.length;

  return (
    <div className="student-interface">
      {/* Class and Subject Selection */}
      <div className="student-setup-bar">
        <div className="setup-group">
          <label>Class/Standard:</label>
          <select 
            value={studentClass} 
            onChange={(e) => setStudentClass(e.target.value)}
            className="class-select"
          >
            {classOptions.map(cls => (
              <option key={cls} value={cls}>Class {cls}</option>
            ))}
          </select>
        </div>
        <div className="setup-group">
          <label>Subject:</label>
          <div className="subject-buttons">
            {Object.entries(subjects).map(([key, value]) => (
              <button
                key={key}
                className={`subject-btn ${selectedSubject === key ? 'active' : ''}`}
                onClick={() => setSelectedSubject(key)}
              >
                <span className="subject-icon">{value.icon}</span>
                <span className="subject-name">{value.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}></div>
      </div>
      <div className="progress-text">Question {currentIndex} of {totalQuestions}</div>

      <div className="student-container">
        <div className="question-section">
          {currentQuestion ? (
            <>
              <QuestionCard 
                question={currentQuestion} 
                onSpeak={speakText}
                isSpeaking={isSpeaking}
              />
              
              <div className="answer-section">
                <label htmlFor="answer-input" className="answer-label">{t ? t('yourAnswer') : 'Your Answer'}:</label>
                <div className="answer-input-wrapper">
                  <textarea
                    id="answer-input"
                    className="answer-input"
                    placeholder="Type your answer here... Think about what you know and why."
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    disabled={loading}
                    rows="6"
                  />
                  <button 
                    className={`voice-input-btn ${isListening ? 'listening' : ''}`}
                    onClick={isListening ? stopVoiceInput : startVoiceInput}
                    title={isListening ? 'Stop recording' : 'Voice input'}
                    disabled={loading}
                  >
                    {isListening ? '🛑' : '🎤'}
                  </button>
                </div>
                {isListening && <div className="voice-status">Listening... Speak now</div>}
                
                <button 
                  className="submit-button"
                  onClick={handleSubmitAnswer}
                  disabled={loading}
                >
                  {loading ? (t ? t('analysis') : 'Analyzing...') : `✓ ${t ? t('submitAnswer') : 'Submit Answer'}`}
                </button>
              </div>

              <div className="navigation-buttons">
                <button 
                  className="nav-btn prev-btn"
                  onClick={handlePreviousQuestion}
                  disabled={currentIndex === 1}
                >
                  ← Previous
                </button>
                <button 
                  className="nav-btn next-btn"
                  onClick={handleNextQuestion}
                  disabled={currentIndex === totalQuestions}
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            <div className="no-questions-message" style={{textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
              <h3>No questions available</h3>
              <p>There are currently no questions for Class {studentClass} in {subjects[selectedSubject]?.name || selectedSubject}.</p>
              <p>Please select a different class or subject.</p>
            </div>
          )}
        </div>

        {showFeedback && analysis && (
          <FeedbackPanel 
            analysis={analysis} 
            language={language}
            t={t}
            showAIChat={showAIChat}
            toggleAIChat={toggleAIChat}
            aiChatMessages={aiChatMessages}
            aiInput={aiInput}
            setAiInput={setAiInput}
            sendAIMessage={sendAIMessage}
            isAILoading={isAILoading}
          />
        )}

        {/* AI Practice Mode */}
        <div className="practice-mode-section" style={{ marginTop: '40px', background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#4A90E2', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🤖 AI Tutor Practice Mode
          </h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Paste a reading passage below, and your AI Guide will create a customized question just for Class {studentClass}!
          </p>
          
          <div style={{ position: 'relative' }}>
            <textarea
              value={practiceContext}
              onChange={(e) => setPracticeContext(e.target.value)}
              placeholder="Paste your reading text here to generate a practice question... Or click the microphone to speak your passage!"
              style={{ width: '100%', padding: '12px', paddingRight: '50px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '120px', resize: 'vertical', marginBottom: '15px' }}
            />
            <button 
              className={`practice-voice-btn ${practiceIsListening ? 'listening' : ''}`}
              onClick={practiceIsListening ? stopPracticeVoiceInput : startPracticeVoiceInput}
              title={practiceIsListening ? 'Stop recording' : 'Voice input - Speak your reading passage'}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: '5px'
              }}
            >
              {practiceIsListening ? '🛑' : '🎤'}
            </button>
          </div>
          {practiceIsListening && <div style={{ color: '#e74c3c', marginBottom: '15px', fontWeight: 'bold' }}>🎙️ Listening... Speak or paste your reading passage</div>}
          
          <button
            onClick={generatePracticeQuestion}
            disabled={isGeneratingPractice || !practiceContext.trim()}
            style={{
              padding: '12px 24px',
              background: (isGeneratingPractice || !practiceContext.trim()) ? '#ccc' : '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: (isGeneratingPractice || !practiceContext.trim()) ? 'not-allowed' : 'pointer',
              display: 'block'
            }}
          >
            {isGeneratingPractice ? 'Thinking...' : '✨ Generate My Question'}
          </button>

          {practiceQuestion && (
            <div className="practice-result" style={{ marginTop: '25px', padding: '20px', background: '#f0f7ff', borderRadius: '8px', borderLeft: '4px solid #4A90E2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ background: '#4A90E2', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 'bold' }}>
                  {practiceQuestion.difficulty_tag}
                </span>
              </div>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '1.2em' }}>{practiceQuestion.question}</h4>
              {/* AI Visual Explanation with image only */}
              <div className="visual-explanation" style={{ margin: '20px 0', textAlign: 'center' }}>
                <h3 style={{ color: '#4A90E2' }}>AI Visual Explanation</h3>
                <img
                  src={getImageForConcept(practiceQuestion.concept)}
                  alt={`Visual explanation for ${practiceQuestion.concept}`}
                  className="visual-image"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
              </div>
              {!showPracticeHint ? (
                <button 
                  onClick={() => setShowPracticeHint(true)}
                  style={{ background: 'none', border: '1px dashed #4A90E2', color: '#4A90E2', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  💡 I need a hint
                </button>
              ) : (
                <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e1ecf4', fontStyle: 'italic', color: '#555' }}>
                  <strong>Hint:</strong> {practiceQuestion.initial_hint}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const getImageForConcept = (concept) => {
  // Map concepts to image URLs (extend as needed)
  const conceptImages = {
    "Physics": "https://example.com/physics-image.jpg",
    "Math": "https://example.com/math-image.jpg",
    "Biology": "https://example.com/biology-image.jpg",
    "Chemistry": "https://example.com/chemistry-image.jpg",
    "History": "https://example.com/history-image.jpg",
  };
  return conceptImages[concept] || "https://example.com/default-image.jpg";
};

export default StudentInterface;
