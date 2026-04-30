import React, { useState } from 'react';
import '../styles/FeedbackPanel.css';
import { FiCheck, FiX, FiAlertCircle, FiTrendingUp, FiBookOpen, FiUsers, FiMessageCircle } from 'react-icons/fi';

function FeedbackPanel({ analysis, language, showAIChat, toggleAIChat, aiChatMessages, aiInput, setAiInput, sendAIMessage, isAILoading, t }) {
  const [expandedSection, setExpandedSection] = useState('explanation');

  const getMisconceptionIcon = (type) => {
    switch(type) {
      case 'CORRECT':
        return <FiCheck className="status-icon correct" />;
      case 'CONCEPTUAL_ERROR':
        return <FiX className="status-icon error" />;
      case 'PARTIAL_UNDERSTANDING':
        return <FiAlertCircle className="status-icon partial" />;
      case 'ROTE_MEMORIZATION':
        return <FiTrendingUp className="status-icon rote" />;
      case 'IRRELEVANT_GUESSING':
        return <FiX className="status-icon guessing" />;
      default:
        return <FiAlertCircle className="status-icon" />;
    }
  };

  const getColorClass = (type) => {
    switch(type) {
      case 'CORRECT':
        return 'status-correct';
      case 'CONCEPTUAL_ERROR':
        return 'status-error';
      case 'PARTIAL_UNDERSTANDING':
        return 'status-partial';
      case 'ROTE_MEMORIZATION':
        return 'status-rote';
      case 'IRRELEVANT_GUESSING':
        return 'status-guessing';
      default:
        return 'status-unknown';
    }
  };

  const formatMisconceptionType = (type) => {
    if (!t) return type.replace(/_/g, ' ');
    const keyMap = {
      'CONCEPTUAL_ERROR': 'conceptualError',
      'PARTIAL_UNDERSTANDING': 'partialUnderstanding',
      'ROTE_MEMORIZATION': 'roteMoralization',
      'CORRECT': 'correctAnswer',
      'IRRELEVANT_GUESSING': 'irrelevantGuessing'
    };
    return t(keyMap[type]) || type.replace(/_/g, ' ');
  };

  return (
    <div className="feedback-panel">

      <div className={`feedback-header ${getColorClass(analysis.misconceptionType)}`}>
        <div className="header-content">
          <div className="icon-section">
            {getMisconceptionIcon(analysis.misconceptionType)}
          </div>
          <div className="header-text">
            <h3>{t ? t('analysis') : 'Analysis Result'}</h3>
            <p className="misconception-type">{formatMisconceptionType(analysis.misconceptionType)}</p>
          </div>
          <div className="score-section">
            <div className="score-display">{t ? t('score') : 'Score'}: {analysis.score}%</div>
            <div className="confidence">Confidence: {analysis.confidence}%</div>
          </div>
        </div>
      </div>

      <div className="feedback-body">
        <div className="feedback-section">
          <button 
            className={`section-header ${expandedSection === 'feedback' ? 'active' : ''}`}
            onClick={() => setExpandedSection(expandedSection === 'feedback' ? null : 'feedback')}
          >
            <span>📝 {t ? t('feedback') : 'Initial Feedback'}</span>
            <span className="toggle-icon">{expandedSection === 'feedback' ? '▼' : '▶'}</span>
          </button>
          {expandedSection === 'feedback' && (
            <div className="section-content">
              <p className="feedback-text">{analysis.feedback}</p>
            </div>
          )}
        </div>

        <div className="feedback-section">
          <button 
            className={`section-header ${expandedSection === 'explanation' ? 'active' : ''}`}
            onClick={() => setExpandedSection(expandedSection === 'explanation' ? null : 'explanation')}
          >
            <span><FiBookOpen /> {t ? t('explanation') : 'Clear Explanation'}</span>
            <span className="toggle-icon">{expandedSection === 'explanation' ? '▼' : '▶'}</span>
          </button>
          {expandedSection === 'explanation' && (
            <div className="section-content">
              <p className="explanation-text">{analysis.explanation}</p>
            </div>
          )}
        </div>



        <div className="feedback-section">
          <button 
            className={`section-header ${expandedSection === 'story' ? 'active' : ''}`}
            onClick={() => setExpandedSection(expandedSection === 'story' ? null : 'story')}
          >
            <span>📖 {t ? t('storyBased') : 'Story-Based Explanation'}</span>
            <span className="toggle-icon">{expandedSection === 'story' ? '▼' : '▶'}</span>
          </button>
          {expandedSection === 'story' && (
            <div className="section-content story-content">
              <p className="story-text">✨ {analysis.storyExplanation}</p>
            </div>
          )}
        </div>

        <div className="feedback-section">
          <button 
            className={`section-header ${expandedSection === 'visual' ? 'active' : ''}`}
            onClick={() => setExpandedSection(expandedSection === 'visual' ? null : 'visual')}
          >
            <span>🎨 {t ? t('visual') : 'Visual Representation'}</span>
            <span className="toggle-icon">{expandedSection === 'visual' ? '▼' : '▶'}</span>
          </button>
          {expandedSection === 'visual' && (
            <div className="section-content visual-content">
              <div className="visual-suggestion">{analysis.visualSuggestion}</div>
            </div>
          )}
        </div>

        {/* Real AI Visual Explanation Section */}
        <div className="feedback-section">
          <button 
            className={`section-header ${expandedSection === 'aivisual' ? 'active' : ''}`}
            onClick={() => setExpandedSection(expandedSection === 'aivisual' ? null : 'aivisual')}
          >
            <span>🖼️ AI Visual Explanation</span>
            <span className="toggle-icon">{expandedSection === 'aivisual' ? '▼' : '▶'}</span>
          </button>
          {expandedSection === 'aivisual' && (
            <div className="section-content aivisual-content">
              <div className="visual-explanation">
                <p className="visual-title">📖 Story-Based Explanation:</p>
                <div className="story-description">
                  {analysis.storyExplanation || 'No story explanation available for this concept.'}
                </div>
                <div style={{ marginTop: '20px' }}>
                  <p className="visual-title">🖼️ Visual Aid:</p>
                  <div className="educational-image-container" style={{ 
                    background: '#f8f9fa', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    textAlign: 'center',
                    border: '2px solid #e9ecef'
                  }}>
                    {analysis.concept && (
                      <img 
                        src={`https://source.unsplash.com/featured/600x400/?education,science,${analysis.concept}`}
                        alt={`Visual explanation of ${analysis.concept}`}
                        style={{ 
                          maxWidth: '100%', 
                          borderRadius: '8px',
                          maxHeight: '300px',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    )}
                    <div style={{ display: 'none', padding: '40px', color: '#666' }}>
                      <div style={{ fontSize: '48px', marginBottom: '15px' }}>📚</div>
                      <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>{analysis.concept}</p>
                      <p style={{ fontSize: '14px' }}>{analysis.visualSuggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Peer Discussion Prompt */}
        <div className="feedback-section">
          <button 
            className={`section-header ${expandedSection === 'discussion' ? 'active' : ''}`}
            onClick={() => setExpandedSection(expandedSection === 'discussion' ? null : 'discussion')}
          >
            <span><FiUsers /> {t ? t('discussion') : 'Peer Discussion Prompt'}</span>
            <span className="toggle-icon">{expandedSection === 'discussion' ? '▼' : '▶'}</span>
          </button>
          {expandedSection === 'discussion' && (
            <div className="section-content discussion-content">
              <p className="discussion-text">💬 {analysis.discussionPrompt}</p>
              <p className="discussion-hint">Share this question with a classmate and discuss your thoughts!</p>
            </div>
          )}
        </div>

        {/* ChatGPT AI Helper below Peer Discussion */}
        <div className="feedback-section">
          <button 
            className={`section-header ${expandedSection === 'aichat' ? 'active' : ''}`}
            onClick={() => setExpandedSection(expandedSection === 'aichat' ? null : 'aichat')}
          >
            <span><FiMessageCircle /> AI Learning Assistant (ChatGPT)</span>
            <span className="toggle-icon">{expandedSection === 'aichat' ? '▼' : '▶'}</span>
          </button>
          {expandedSection === 'aichat' && (
            <div className="section-content aichat-content">
              <div className="ai-chat-container">
                <div className="ai-chat-messages">
                  {aiChatMessages.length === 0 ? (
                    <div className="ai-welcome">
                      <p>🤖 Hi! I'm your AI learning assistant. Ask me anything about this concept!</p>
                      <p className="ai-suggestions">
                        <button onClick={() => { setAiInput('Explain this concept in simple terms'); sendAIMessage(); }}>Explain simply</button>
                        <button onClick={() => { setAiInput('Give me an example'); sendAIMessage(); }}>Give example</button>
                        <button onClick={() => { setAiInput('What are common mistakes?'); sendAIMessage(); }}>Common mistakes</button>
                      </p>
                    </div>
                  ) : (
                    aiChatMessages.map((msg, idx) => (
                      <div key={idx} className={`ai-message ${msg.role}`}>
                        <span className="message-role">{msg.role === 'user' ? 'You:' : 'AI:'}</span>
                        <span className="message-content">{msg.content}</span>
                      </div>
                    ))
                  )}
                  {isAILoading && <div className="ai-message loading">AI is thinking...</div>}
                </div>
                <div className="ai-chat-input">
                  <input
                    type="text"
                    placeholder="Ask a question about this concept..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                    disabled={isAILoading}
                  />
                  <button onClick={sendAIMessage} disabled={isAILoading || !aiInput.trim()}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        // ...existing code...
      </div>

      <div className="feedback-footer">
        <p className="footer-message">💡 Tip: Review the story-based explanation and discuss with your classmates to deepen your understanding!</p>
      </div>
    </div>
  );
}

export default FeedbackPanel;
