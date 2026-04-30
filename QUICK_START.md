# 🎓 ComprehensionAI - Quick Reference Guide

## 🚀 Quick Start (5 minutes)

### Terminal 1 - Backend
```bash
cd d:\Projects\ of\ 6th\ sem\sdmhack\backend
npm install
npm start
```
Backend ready at: http://localhost:5000

### Terminal 2 - Frontend
```bash
cd d:\Projects\ of\ 6th\ sem\sdmhack\frontend
npm install
npm start
```
Frontend ready at: http://localhost:3000

✅ Application is now running!

---

## 📂 Key Files Reference

### Frontend Components
- `Navigation.js` - Top navigation bar with language selector
- `QuestionCard.js` - Displays question with hints
- `FeedbackPanel.js` - Shows analysis and explanations
- `StudentInterface.js` - Main student interaction page
- `TeacherDashboard.js` - Analytics and insights

### Backend
- `server.js` - Express server with API endpoints
- `MisconceptionDetector` class - Main analysis engine

### Data
- `science-questions.json` - 5 sample questions
- `science-concepts.json` - Concept definitions
- `translations.json` - Multi-language support

---

## 🎯 What Each Page Does

### Student Mode
1. Browse through science questions
2. Enter your answer
3. Get instant feedback with:
   - Understanding assessment
   - Clear explanations
   - Story-based learning
   - Visual hints
   - Discussion prompts
4. Review feedback and move to next question

### Teacher Dashboard
1. View class statistics
2. See misconception distribution
3. Filter by concept
4. Export reports
5. Get recommendations

---

## 🔍 Misconception Types Explained

| Type | Meaning | Example |
|------|---------|---------|
| **CORRECT** | Student understands ✅ | Full grasp of concept |
| **CONCEPTUAL_ERROR** | Wrong understanding ❌ | Confusing photosynthesis with respiration |
| **PARTIAL_UNDERSTANDING** | Knows part of it ⚠️ | Knows plants need sun but misses water |
| **ROTE_MEMORIZATION** | Memorized without understanding 🔄 | Knows words but not meaning |
| **IRRELEVANT_GUESSING** | Off-topic/random ❓ | Very short or unrelated answers |

---

## 🎨 UI Color Scheme

```
Primary Gradient: Purple (#667eea) to Blue (#764ba2)
Success: Green (#10B981)
Warning: Orange (#F59E0B)
Error: Red (#EF4444)
Info: Cyan (#06B6D4)
```

---

## 📊 API Endpoints Quick Ref

```
POST   /api/analyze                      - Analyze answer
GET    /api/questions                    - Get all questions
GET    /api/questions/:id                - Get one question
GET    /api/concepts                     - Get all concepts
GET    /api/languages                    - Get all languages
GET    /api/teacher/misconceptions-summary - Get statistics
```

---

## ✍️ Add a New Question (Quick)

1. Open: `data/questions/science-questions.json`
2. Add new entry:
```json
{
  "q_new": {
    "questionId": "q_new",
    "concept": "ecosystem",
    "difficulty": "medium",
    "questionText": "Your question here?",
    "correctKeywords": ["keyword1", "keyword2"],
    "partialKeywords": ["partial1"],
    "wrongKeywords": ["wrong1"],
    "explanations": {
      "CORRECT": "Great!",
      "CONCEPTUAL_ERROR": "Actually...",
      "PARTIAL_UNDERSTANDING": "Also consider...",
      "ROTE_MEMORIZATION": "Let me explain...",
      "IRRELEVANT_GUESSING": "Think about..."
    }
  }
}
```
3. Save and refresh browser

---

## 🌍 Add Language Support

1. Open: `data/languages/translations.json`
2. Add new language object with translations
3. Select from dropdown in UI

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Check backend is running on port 5000
- Verify `http://localhost:5000/api/health` in browser

### "Questions not loading"
- Check JSON syntax in data files
- Verify files are in correct directories
- Check browser console for errors

### "Styling issues"
- Clear browser cache
- Check CSS files are loaded
- Verify all CSS files exist in `src/styles/`

---

## 📱 Responsive Breakpoints

```
Mobile:     < 768px
Tablet:     768px - 1024px
Desktop:    > 1024px
```

---

## 💾 File Structure Reminder

```
sdmhack/
├── backend/server.js
├── frontend/src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.js
└── data/
    ├── questions/
    ├── concepts/
    └── languages/
```

---

## 🔐 CORS Configuration

For production, update in `backend/server.js`:
```javascript
app.use(cors({
  origin: 'YOUR_FRONTEND_URL',
  credentials: true
}));
```

---

## 📈 Next Steps to Enhance

1. **Database**: Add MongoDB/PostgreSQL
2. **Auth**: Add user login
3. **Storage**: Save student responses
4. **AI**: Integrate real AI API
5. **Mobile**: Build React Native app
6. **Analytics**: Track learning trends

---

## 🎯 Testing Different Answers

Try these answers to test misconception detection:

**For "What is photosynthesis?"**
- ✅ Correct: "Plants convert sunlight into glucose"
- ❌ Error: "Plants eat food from soil"
- ⚠️ Partial: "Plants use sunlight"
- 🔄 Rote: "It's a plant process"
- ❓ Guessing: "It's about plants"

---

## 📞 Support

Check these files for more info:
- `README.md` - Full documentation
- `DEVELOPER_GUIDE.md` - Technical details
- `project.json` - Project metadata

---

**Last Updated**: April 28, 2026
**Status**: ✅ Ready for Hackathon
