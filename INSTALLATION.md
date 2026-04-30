# ComprehensionAI - Complete Installation & Setup Guide

## 📋 Pre-Installation Checklist

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm v6+ installed (`npm --version`)
- [ ] Git installed (optional, for version control)
- [ ] Text editor or IDE (VS Code recommended)
- [ ] Terminal/Command Prompt access
- [ ] Internet connection (for initial npm install)

---

## 🔧 Step-by-Step Installation

### Step 1: Navigate to Project Directory

```bash
cd "d:\Projects of 6th sem\sdmhack"
```

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Expected output: Added X packages
```

**Expected Packages:**
- express
- cors
- body-parser

### Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend folder (from project root)
cd ../frontend

# Install dependencies
npm install

# This may take 2-3 minutes due to React dependencies
```

**Expected Packages:**
- react
- react-dom
- react-router-dom
- axios
- react-icons
- react-scripts

### Step 4: Create Environment Files (Optional)

**Backend:** `backend/.env`
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend:** `frontend/.env`
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

---

## 🚀 Starting the Application

### Terminal 1 - Start Backend

```bash
cd backend
npm start
```

**Expected Output:**
```
🎓 Comprehension AI Learning System Backend running on http://localhost:5000
📚 Questions loaded: 5
💡 Concepts loaded: 5
🌍 Languages available: 3
```

### Terminal 2 - Start Frontend (NEW TERMINAL)

```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view comprehension-ai-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Step 5: Access the Application

Open browser and navigate to: **http://localhost:3000**

---

## ✅ Verification Checklist

After starting both servers, verify:

- [ ] Frontend loads at http://localhost:3000
- [ ] Navigation bar is visible with logo
- [ ] "Student Mode" and "Teacher Dashboard" buttons work
- [ ] Language selector shows English, Kannada, Hindi
- [ ] Questions load in main content area
- [ ] Answer text area is functional
- [ ] Submit button is clickable
- [ ] No console errors (F12 to check)

---

## 🔍 Troubleshooting Guide

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Kill process on port 5000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Or change port in backend/server.js
# Find: const PORT = process.env.PORT || 5000;
# Change to: const PORT = 5001;
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Set different port for frontend
set PORT=3001
npm start
```

### Issue: "Cannot find module"

**Solution:**
```bash
# Reinstall dependencies
npm install

# Or clear cache and install
npm cache clean --force
npm install
```

### Issue: "CORS Error: No 'Access-Control-Allow-Origin' header"

**Solution:**
1. Verify backend is running on 5000
2. Check CORS configuration in `backend/server.js`
3. Verify frontend API URL in axios calls

### Issue: "Questions not loading"

**Solution:**
1. Check backend console for errors
2. Verify files exist in `data/` directory
3. Check JSON syntax in data files
4. Test `/api/questions` endpoint directly in browser

### Issue: "Styling looks broken"

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check network tab for CSS files
4. Verify all CSS files exist in `src/styles/`

---

## 📱 Testing the System

### Test 1: Submit Correct Answer

1. Go to first question (Photosynthesis)
2. Enter: "Photosynthesis converts sunlight into glucose energy for plants"
3. Click "Submit Answer"
4. **Expected:** Green feedback with CORRECT status

### Test 2: Submit Partial Answer

1. Go to second question (Gravity)
2. Enter: "Objects fall because they are heavy"
3. Click "Submit Answer"
4. **Expected:** Orange feedback with PARTIAL_UNDERSTANDING

### Test 3: Submit Wrong Answer

1. Go to third question (Respiration)
2. Enter: "Breathing is just letting air in and out"
3. Click "Submit Answer"
4. **Expected:** Red feedback with CONCEPTUAL_ERROR

### Test 4: Navigate Questions

1. Submit an answer to any question
2. Click "Next" button
3. **Expected:** Move to next question, form clears
4. Click "Previous" button
5. **Expected:** Return to previous question with saved answer

### Test 5: Switch Language

1. Click language dropdown in top-right
2. Select "हिंदी" (Hindi)
3. **Expected:** UI text updates (partially - static text will change)

### Test 6: View Teacher Dashboard

1. Click "Teacher Dashboard" button
2. **Expected:** See statistics and misconception breakdown
3. Filter by concept dropdown
4. **Expected:** Data updates for selected concept
5. Click "Export Report"
6. **Expected:** Download JSON file

---

## 🛠️ Development Tips

### Running in Development Mode

The apps run in hot-reload mode, meaning:
- Changes to code are automatically reflected
- No need to restart manually
- Browser refreshes automatically

### Checking Backend Health

```bash
# In browser or curl
curl http://localhost:5000/api/health

# Expected response
{"status":"API is running","questionsLoaded":5}
```

### Viewing Console Logs

**Frontend:**
1. Press F12 to open Developer Tools
2. Click "Console" tab
3. Errors will show in red

**Backend:**
1. Check terminal where backend is running
2. All logs print there directly

### Debugging Tips

- Use browser DevTools (F12) for frontend debugging
- Add `console.log()` statements in React components
- Check Network tab to see API calls
- Use VS Code debugger for backend

---

## 📦 Production Build

### Build Frontend for Production

```bash
cd frontend
npm run build

# Creates optimized build in build/ folder
# Size should be ~200-300KB (gzipped)
```

### Deploy Backend

```bash
# Install production dependencies only
npm install --production

# Start with PM2 for persistence
npm install -g pm2
pm2 start server.js --name comprehension-ai
```

---

## 🔐 Security Notes

### Development vs Production

**Development:**
- CORS allows all origins
- No authentication
- Data in memory

**Production Checklist:**
- [ ] Update CORS to specific domain
- [ ] Add authentication/authorization
- [ ] Use HTTPS
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Add database for persistence
- [ ] Set secure headers

---

## 📊 Database Integration (Future)

To add MongoDB/PostgreSQL:

1. Install driver: `npm install mongoose` or `npm install pg`
2. Create connection in backend
3. Replace in-memory data with database queries
4. Add data persistence
5. Update API responses

---

## 🌐 Deployment Options

### Local Deployment
- Current setup works on any machine with Node.js

### Cloud Deployment Options
- **Heroku** - Free tier available
- **Vercel** - Frontend hosting
- **AWS** - Full infrastructure
- **Azure** - Microsoft cloud
- **DigitalOcean** - Affordable VPS

### Docker Deployment (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

---

## ✨ Post-Installation Steps

1. **Add More Questions**
   - Edit `data/questions/science-questions.json`
   - Follow existing format

2. **Add More Concepts**
   - Edit `data/concepts/science-concepts.json`

3. **Customize Colors**
   - Edit CSS variables in `frontend/src/App.css`

4. **Add Teachers**
   - Extend Teacher Dashboard with user management

5. **Enable Persistence**
   - Add IndexedDB for student responses

---

## 📞 Support Resources

### Documentation Files
- `README.md` - Complete overview
- `QUICK_START.md` - Quick reference
- `DEVELOPER_GUIDE.md` - Technical details
- `FEATURES.md` - Feature list

### External Resources
- Node.js: https://nodejs.org
- React: https://react.dev
- Express: https://expressjs.com
- npm: https://www.npmjs.com

---

## ✅ Success Indicators

You'll know everything is working when:

✅ Backend console shows all 3 load messages
✅ Frontend displays at http://localhost:3000
✅ Questions appear in student interface
✅ Feedback generates on answer submission
✅ Teacher dashboard shows statistics
✅ Language switching works
✅ No red errors in browser console

---

## 📝 Next Steps

1. Test all functionality
2. Add more questions for your subject
3. Customize colors/branding
4. Try different answer scenarios
5. Export reports from teacher dashboard
6. Plan database integration
7. Deploy to cloud (optional)

---

**Installation Complete! 🎉**

**Status:** Ready to use
**Last Updated:** April 28, 2026
