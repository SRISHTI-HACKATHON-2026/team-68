import React from 'react';
import '../styles/QuestionCard.css';
import { FiHelpCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';

function QuestionCard({ question, onSpeak, isSpeaking }) {
  const handleSpeak = () => {
    if (onSpeak) {
      // Create text to speak including question and context
      const textToSpeak = `${question.questionText}. ${question.context ? 'Context: ' + question.context : ''}`;
      onSpeak(textToSpeak);
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="concept-badge">{question.concept}</span>
        <span className="difficulty-badge" style={{ backgroundColor: question.difficulty === 'easy' ? '#4CAF50' : question.difficulty === 'medium' ? '#FF9800' : '#F44336' }}>
          {question.difficulty}
        </span>
      </div>
      
      <h2 className="question-text">
        <FiHelpCircle className="question-icon" />
        {question.questionText}
        {onSpeak && (
          <button 
            onClick={handleSpeak}
            className="speak-btn"
            title={isSpeaking ? "Stop reading" : "Read question aloud"}
            style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
          >
            {isSpeaking ? <FiVolumeX /> : <FiVolume2 />}
          </button>
        )}
      </h2>

      {question.context && (
        <div className="question-context">
          <p><strong>Context:</strong> {question.context}</p>
        </div>
      )}

      {question.hints && question.hints.length > 0 && (
        <div className="question-hints">
          <details>
            <summary>💡 Hints (Click to reveal)</summary>
            <ul>
              {question.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
