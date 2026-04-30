# 🎓 ComprehensionAI - Developer Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Navigation Component                        │   │
│  │  (Student Mode | Teacher Dashboard | Language Selector) │   │
│  └──────────────────────────────────────────────────────────┘   │
│         │                                      │                 │
│         ↓                                      ↓                 │
│  ┌──────────────────────┐         ┌───────────────────────┐     │
│  │ Student Interface    │         │ Teacher Dashboard     │     │
│  │ ├─ Question Display  │         │ ├─ Statistics Grid    │     │
│  │ ├─ Answer Input      │         │ ├─ Misconception      │     │
│  │ ├─ Submit Button     │         │ │  Breakdown         │     │
│  │ └─ Navigation        │         │ ├─ Common Errors     │     │
│  │                      │         │ └─ Recommendations    │     │
│  │ ┌──────────────────┐ │         └───────────────────────┘     │
│  │ │ Feedback Panel   │ │                                        │
│  │ │ ├─ Analysis      │ │                                        │
│  │ │ ├─ Explanation   │ │                                        │
│  │ │ ├─ Story-based   │ │                                        │
│  │ │ ├─ Visual        │ │                                        │
│  │ │ └─ Discussion    │ │                                        │
│  │ └──────────────────┘ │                                        │
│  └──────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────┘
                        │
                        ↓
           HTTP (Axios) API Calls
                        │
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js)                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              API Router                                  │   │
│  │  POST /api/analyze - Analyze student answer              │   │
│  │  GET  /api/questions - Get all questions                 │   │
│  │  GET  /api/concepts - Get concept info                   │   │
│  │  GET  /api/languages - Get translations                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│         │                                                        │
│         ↓                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Misconception Detection Engine                          │   │
│  │  ├─ Input Normalization                                 │   │
│  │  ├─ Keyword Matching                                    │   │
│  │  ├─ Type Classification                                 │   │
│  │  ├─ Score Calculation                                   │   │
│  │  ├─ Explanation Generation                              │   │
│  │  ├─ Story Generation                                    │   │
│  │  ├─ Visual Suggestion                                   │   │
│  │  └─ Discussion Prompt                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│         │                                                        │
│         ↓                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Data Layer                                  │   │
│  │  ├─ questions/science-questions.json                    │   │
│  │  ├─ concepts/science-concepts.json                      │   │
│  │  └─ languages/translations.json                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Navigation
│   ├── Logo
│   ├── NavMenu (Student/Teacher buttons)
│   └── Language Selector
├── StudentInterface (Page)
│   ├── ProgressBar
│   ├── QuestionSection
│   │   ├── QuestionCard
│   │   │   ├── Concept Badge
│   │   │   ├── Difficulty Badge
│   │   │   ├── Question Text
│   │   │   ├── Context
│   │   │   └── Hints
│   │   ├── AnswerSection
│   │   │   ├── Label
│   │   │   ├── TextArea
│   │   │   └── SubmitButton
│   │   └── NavigationButtons
│   └── FeedbackPanel (shown after submission)
│       ├── FeedbackHeader
│       ├── FeedbackBody
│       │   ├── InitialFeedback
│       │   ├── ClearExplanation
│       │   ├── StoryExplanation
│       │   ├── VisualSuggestion
│       │   ├── DiscussionPrompt
│       │   └── KeywordTags
│       └── FeedbackFooter
└── TeacherDashboard (Page)
    ├── DashboardHeader
    ├── StatsGrid
    │   ├── StatCard (Total Responses)
    │   ├── StatCard (Correct Percentage)
    │   ├── StatCard (Partial Understanding)
    │   └── StatCard (Conceptual Errors)
    ├── FilterSection
    ├── ConceptsGrid
    │   └── ConceptCard (for each concept)
    │       ├── ConceptHeader
    │       ├── MisconceptionBreakdown
    │       └── CommonErrors
    └── RecommendationsSection
        └── RecommendationItems
```

## Data Flow Diagram

### Question Submission Flow

```
1. Student enters answer in textarea
   ↓
2. Click "Submit Answer"
   ↓
3. Frontend validates input (not empty)
   ↓
4. Frontend sends POST to /api/analyze
   {
     questionId: "q1",
     studentAnswer: "user text",
     language: "en"
   }
   ↓
5. Backend MisconceptionDetector processes
   ├─ Normalize answer (lowercase)
   ├─ Match keywords
   ├─ Classify misconception type
   ├─ Calculate score & confidence
   ├─ Generate explanations
   └─ Generate story & visual suggestions
   ↓
6. Backend returns analysis JSON
   {
     misconceptionType: "PARTIAL_UNDERSTANDING",
     score: 65,
     confidence: 80,
     feedback: "...",
     explanation: "...",
     storyExplanation: "...",
     visualSuggestion: "...",
     discussionPrompt: "...",
     correctKeywords: [...],
     ...
   }
   ↓
7. Frontend receives and displays FeedbackPanel
   ↓
8. Student reads feedback and learns
```

## Misconception Classification Logic

```javascript
if (all correct keywords + no wrong keywords) {
  type = CORRECT;
  score = 100;
} else if (any wrong keywords present) {
  type = CONCEPTUAL_ERROR;
  score = 50 + (wrong_count * 10);
} else if (some correct keywords but not all) {
  type = PARTIAL_UNDERSTANDING;
  score = (matched_correct / total_correct) * 70;
} else if (rote keywords but no correct ones) {
  type = ROTE_MEMORIZATION;
  score = 40;
} else if (very short answer < 10 chars) {
  type = IRRELEVANT_GUESSING;
  score = 10;
} else {
  type = PARTIAL_UNDERSTANDING;
  score = 30;
}
```

## Customization Guide

### 1. Add New Question

File: `data/questions/science-questions.json`

```json
{
  "q_new": {
    "questionId": "q_new",
    "concept": "concept_name",
    "difficulty": "easy",
    "questionText": "Your question?",
    "context": "Optional context",
    "hints": ["hint1", "hint2", "hint3"],
    "correctKeywords": ["keyword1", "keyword2"],
    "partialKeywords": ["partial1"],
    "wrongKeywords": ["wrong1"],
    "roteMemoKeywords": ["rote1"],
    "simpleExplanation": "Simple explanation",
    "explanations": {
      "CORRECT": "Great explanation",
      "CONCEPTUAL_ERROR": "Error correction",
      "PARTIAL_UNDERSTANDING": "Complete it by...",
      "ROTE_MEMORIZATION": "To understand it...",
      "IRRELEVANT_GUESSING": "Let me help..."
    }
  }
}
```

### 2. Add New Concept

File: `data/concepts/science-concepts.json`

```json
{
  "concept_name": {
    "name": "Display Name",
    "description": "What is this?",
    "keyTopics": ["topic1", "topic2"],
    "realWorldApplications": ["app1", "app2"],
    "commonMisconceptions": ["misconception1"],
    "grade": "6-10"
  }
}
```

### 3. Add Language

File: `data/languages/translations.json`

```json
{
  "language_code": {
    "language": "Language Name",
    "code": "language_code",
    "translations": {
      "key": "translated value",
      ...
    }
  }
}
```

### 4. Change Theme Colors

File: `frontend/src/App.css`

```css
:root {
  --primary-color: #6366F1;
  --secondary-color: #EC4899;
  --success-color: #10B981;
  --warning-color: #F59E0B;
  --danger-color: #EF4444;
  /* ... other colors */
}
```

### 5. Add API Endpoint

File: `backend/server.js`

```javascript
app.post('/api/your-endpoint', (req, res) => {
  const { data } = req.body;
  // Your logic here
  res.json({ result: 'response' });
});
```

## Testing Scenarios

### Scenario 1: Correct Answer
- Question: "What is photosynthesis?"
- Answer: "Photosynthesis is the process where plants convert sunlight into glucose energy"
- Expected: CORRECT, 100%

### Scenario 2: Conceptual Error
- Question: "What is photosynthesis?"
- Answer: "Plants eat food from the soil"
- Expected: CONCEPTUAL_ERROR, ~70%

### Scenario 3: Partial Understanding
- Question: "What is photosynthesis?"
- Answer: "Plants use sunlight to make food"
- Expected: PARTIAL_UNDERSTANDING, ~70%

### Scenario 4: Rote Memorization
- Question: "Explain gravity"
- Answer: "Gravity is a force"
- Expected: ROTE_MEMORIZATION, ~40%

### Scenario 5: Irrelevant Guessing
- Question: "What is an atom?"
- Answer: "It's big"
- Expected: IRRELEVANT_GUESSING, ~10%

## Backend API Reference

### POST /api/analyze
Analyzes student answer

**Request:**
```json
{
  "questionId": "q1",
  "studentAnswer": "your answer text",
  "language": "en"
}
```

**Response:**
```json
{
  "questionId": "q1",
  "studentAnswer": "...",
  "questionText": "...",
  "misconceptionType": "CORRECT|CONCEPTUAL_ERROR|PARTIAL_UNDERSTANDING|ROTE_MEMORIZATION|IRRELEVANT_GUESSING",
  "confidence": 85,
  "score": 80,
  "feedback": "...",
  "explanation": "...",
  "storyExplanation": "...",
  "visualSuggestion": "...",
  "discussionPrompt": "...",
  "correctKeywords": [...],
  "missingKeywords": [...],
  "extraneousKeywords": [...],
  "concept": "photosynthesis"
}
```

### GET /api/questions
Returns all questions

### GET /api/questions/:id
Returns specific question

### GET /api/concepts
Returns all concepts

### GET /api/languages
Returns all languages

## Performance Optimization

1. **Frontend**
   - Lazy load components with React.lazy()
   - Memoize expensive calculations
   - Use CSS animations instead of JS

2. **Backend**
   - Cache questions in memory
   - Implement response caching
   - Use async/await for better performance

3. **Data**
   - Minimize JSON file sizes
   - Compress images for visual suggestions
   - Use CDN for static assets

## Security Considerations

1. **Input Validation**: All inputs are validated
2. **CORS**: Configured for development (restrict in production)
3. **No Sensitive Data**: System doesn't store personal information
4. **Client-Side Processing**: Most processing is client-side
5. **Rate Limiting**: Can be added to API endpoints

## Future Enhancements

1. Database integration (MongoDB, PostgreSQL)
2. User authentication and profiles
3. Student response history
4. Adaptive learning paths
5. Real AI integration (GPT-3, etc.)
6. Mobile app (React Native)
7. Video explanations
8. Gamification elements
9. Progress analytics
10. Peer learning features

---

**Last Updated**: April 28, 2026
