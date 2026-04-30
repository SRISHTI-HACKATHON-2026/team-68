# 🧠 ComprehensionAI - Comprehension-First Learning System

A revolutionary AI-powered learning platform designed to detect real understanding gaps in students rather than just marking answers as right or wrong. Specially designed for low-resource classrooms with limited internet access.

## 🎯 Project Overview

ComprehensionAI analyzes student responses to identify types of misunderstandings:
- **Conceptual Errors** - Fundamental misunderstanding of the concept
- **Partial Understanding** - Knowing part of the answer but missing key elements
- **Rote Memorization** - Memorizing without understanding
- **Irrelevant Guessing** - Random or off-topic responses
- **Correct Understanding** - Full grasp of the concept

## ✨ Key Features

### For Students
- 📚 Interactive question interface with hints
- 🔍 Detailed misconception analysis
- 📖 Story-based explanations for better comprehension
- 🎨 Visual representations and diagrams
- 💬 Peer discussion prompts for collaborative learning
- 🌍 Multi-language support (English, Kannada, Hindi)
- 📊 Progress tracking

### For Teachers
- 📊 Comprehensive misconception dashboard
- 🎯 Identification of common student errors
- 📈 Class-wide learning trends
- 💡 Recommendations for focused teaching
- 📥 Export reports for further analysis

### System Features
- ⚡ Fully offline-capable - works without internet
- 🔐 Local storage using JSON files
- 💾 Rule-based keyword matching for misconception detection
- 🚀 Lightweight architecture suitable for low-resource environments
- 🎨 Beautiful, responsive UI

## 🏗️ Project Structure

```
sdmhack/
├── backend/                  # Node.js/Express server
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── misconceptionDetector.js  # Analysis engine
│
├── frontend/                # React frontend
│   ├── public/
│   │   └── index.html       # HTML entry point
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navigation.js
│   │   │   ├── QuestionCard.js
│   │   │   └── FeedbackPanel.js
│   │   ├── pages/          # Page components
│   │   │   ├── StudentInterface.js
│   │   │   └── TeacherDashboard.js
│   │   ├── styles/         # CSS files
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   └── .gitignore
│
├── data/                    # Offline data storage
│   ├── questions/          # Question database
│   │   └── science-questions.json
│   ├── concepts/           # Concept definitions
│   │   └── science-concepts.json
│   └── languages/          # Language translations
│       └── translations.json
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Setup

1. **Clone or extract the project**
   ```bash
   cd sdmhack
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Backend will run on `http://localhost:5000`

3. **Setup Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will run on `http://localhost:3000`

4. **Access the Application**
   - Student Interface: `http://localhost:3000`
   - Teacher Dashboard: Available in the Student Interface via navigation

## 🧪 Using the System

### Student Mode
1. Select a question from the interface
2. Enter your answer thoughtfully
3. Click "Submit Answer"
4. Receive comprehensive analysis including:
   - Misconception type and confidence level
   - Detailed explanation
   - Story-based learning
   - Visual suggestions
   - Peer discussion prompts

### Teacher Mode
1. Click "Teacher Dashboard" in the navigation
2. View:
   - Total responses
   - Correct answer percentage
   - Distribution of misconception types
   - Common errors by concept
3. Export reports for further analysis

## 📊 Misconception Detection Algorithm

The system uses a keyword-matching approach:

1. **Input Processing**: Normalizes student answer to lowercase
2. **Keyword Matching**: Matches against predefined keyword lists:
   - `correctKeywords`: Expected correct terms
   - `partialKeywords`: Terms showing partial understanding
   - `wrongKeywords`: Terms indicating conceptual errors
   - `roteMemoKeywords`: Rote memorized terms

3. **Classification Logic**:
   - All correct keywords + no wrong keywords = CORRECT
   - Any wrong keywords detected = CONCEPTUAL_ERROR
   - Some correct keywords missing = PARTIAL_UNDERSTANDING
   - Rote keywords without correct ones = ROTE_MEMORIZATION
   - Very short responses = IRRELEVANT_GUESSING

4. **Score Calculation**: 0-100 based on keyword matches

## 🌐 Multi-Language Support

The system supports three languages:
- **English** (en)
- **Kannada** (kannada)
- **Hindi** (hindi)

Language can be switched from the navigation bar. Translations are stored in `data/languages/translations.json`.

## 📝 Adding New Questions

To add questions, edit `data/questions/science-questions.json`:

```json
{
  "q_unique_id": {
    "questionId": "q_unique_id",
    "concept": "concept_name",
    "difficulty": "easy|medium|hard",
    "questionText": "Question here?",
    "context": "Additional context",
    "hints": ["hint1", "hint2"],
    "correctKeywords": ["keyword1", "keyword2"],
    "partialKeywords": ["partial1"],
    "wrongKeywords": ["wrong1"],
    "roteMemoKeywords": ["rote1"],
    "simpleExplanation": "Explanation here",
    "explanations": {
      "CORRECT": "...",
      "CONCEPTUAL_ERROR": "...",
      "PARTIAL_UNDERSTANDING": "...",
      "ROTE_MEMORIZATION": "...",
      "IRRELEVANT_GUESSING": "..."
    }
  }
}
```

## 📈 System Capabilities

### Misconception Detection
- ✅ Identifies 5 types of understanding gaps
- ✅ Calculates confidence scores (0-100%)
- ✅ Provides keyword-level analysis
- ✅ Works completely offline

### Adaptive Feedback
- ✅ Plain language explanations
- ✅ Story-based analogies
- ✅ Visual representation suggestions
- ✅ Peer discussion prompts
- ✅ Age-appropriate language

### Teacher Tools
- ✅ Class-wide misconception trends
- ✅ Common error identification
- ✅ Progress tracking
- ✅ Exportable reports

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body Parser** - JSON parsing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling with animations

### Data
- **JSON** - Local data storage (offline-capable)

## 📱 Responsive Design

The system is fully responsive and works on:
- 🖥️ Desktop computers
- 💻 Tablets
- 📱 Mobile devices

## 🎨 UI/UX Features

- **Gradient Backgrounds**: Modern purple-blue theme
- **Smooth Animations**: Engaging transitions
- **Dark Mode Ready**: Can be extended
- **Accessibility**: Semantic HTML, readable fonts
- **Progress Indicators**: Visual feedback on progress
- **Color-Coded Elements**: Easy identification of feedback types

## 📊 Sample Data

The project includes sample questions on:
- **Photosynthesis**: How plants create food
- **Gravity**: Force and attraction
- **Cellular Respiration**: Energy production
- **Atomic Structure**: Subatomic particles
- **Ecosystems**: Food chains and interdependence

## 🔒 Offline Functionality

All data is stored locally:
- Questions in `data/questions/`
- Concepts in `data/concepts/`
- Translations in `data/languages/`

No internet required after initial setup!

## 🚀 Deployment

To build for production:

```bash
cd frontend
npm run build
```

The build folder is ready to be deployed.

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or suggestions, please create an issue in the repository.

---

**Made with ❤️ for SDM Hackathon - Empowering Education Through AI**

*Shifting from performance-based assessment to true understanding*
