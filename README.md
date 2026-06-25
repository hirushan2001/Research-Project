# Fruit Quality Assessment System (FQAS)

An AI-powered academic research platform designed to automate agricultural fruit grading. This system utilizes deep learning models integrated via Roboflow workflows to evaluate specimens into standardized commercial quality grades (**G1 - G4**). 

The initial active module is **Mango Grading**, with scalable architecture placeholders prepared for Guava, Banana, and Papaya modules.

---

## 🏗️ Project Architecture & Structure

The repository is divided into two primary sub-projects:

```text
Research-Project/
├── frontend/             # React (Vite + TypeScript + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/   # Reusable UI widgets (UploadZone, PredictionCard, etc.)
│   │   ├── pages/        # Dashboard & MangoGrading viewports
│   │   ├── context/      # Theme (Dark/Light) & App (Prediction History) contexts
│   │   ├── routes/       # React Router setup
│   │   └── services/     # Axios client to communicate with FastAPI
│   └── package.json
└── backend/              # FastAPI (Python 3.9+)
    ├── app/
    │   ├── routers/      # API endpoints (POST /api/mango/predict)
    │   ├── services/     # Roboflow SDK logic with safe fallback mocks
    │   └── main.py       # FastAPI application entrypoint
    ├── uploads/          # Temporary directory for uploaded image specimens
    ├── requirements.txt  # Python package list
    └── .env              # Server configurations and Roboflow credentials
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v18 or higher recommended)
- **Python** (v3.9 or higher, tested on v3.13)
- **pip** (Python package manager)

---

### 1. Backend Server Setup

Navigate to the `backend` directory, install packages, and boot the API server:

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure Environment Variables
# Create or open the .env file and add your Roboflow API key:
# ROBOFLOW_API_KEY=your_roboflow_api_key_here

# 4. Start the FastAPI development server
python -m uvicorn app.main:app --reload --port 8000
```

- The backend will bind to `http://localhost:8000`.
- Access the interactive documentation at `http://localhost:8000/docs`.

#### 💡 Note on Python 3.13 Compatibility & Simulated Mode
The Roboflow `inference-sdk` package is currently incompatible with Python 3.13+ environments due to upstream library wheel limitations. 
To ensure development remains fully operational, **the backend automatically detects this condition and starts in Simulated Mock Mode**. 
- It bypasses SDK network requests and executes classification logic locally.
- For production use on Python `<3.13` environments, uncomment `# inference-sdk>=0.9.11` in `requirements.txt` to run live Roboflow queries.

---

### 2. Frontend Application Setup

Navigate to the `frontend` directory, install package dependencies, and run the hot-reloading dev server:

```bash
# 1. Navigate to the frontend directory
cd ../frontend

# 2. Install package dependencies
npm install

# 3. Launch the Vite development server
npm run dev
```

- Open your browser to `http://localhost:5173`.
- The frontend will hot-reload on source code changes.

---

## 🧪 Testing Specimen Quality Grades

When running in **Simulated Mock Mode** (either due to Python 3.13+ compatibility or because a valid Roboflow API key is not supplied), you can explicitly control prediction classifications for demonstration purposes:

Simply rename your upload image file to include one of the target grades in lowercase. The backend will parse the filename and assign that category:
- `specimen_g1_sample.jpg` → **Grade G1 (Excellent Quality)**
- `mango_g2_unripe.png` → **Grade G2 (Good Quality)**
- `g3_blemish.webp` → **Grade G3 (Average Quality)**
- `rotten_g4.jpeg` → **Grade G4 (Poor Quality)**

Other filenames will output a realistic class distribution based on weighted random probabilities.

---

## 📈 Scalability Roadmap

Adding new modules (such as Guava, Banana, or Papaya grading) is simplified by design:
1. **Declare the Module Metadata**: Update the `INITIAL_MODULES` array inside [AppContext.tsx](file:///d:/Research%20Project/Research-Project/frontend/src/context/AppContext.tsx) to switch the status from `'coming-soon'` to `'active'`.
2. **Build the Backend Router**: Create a new router in `backend/app/routers/` to accept images and call the relevant model pipeline. Register the router in `app/main.py`.
3. **Build the Frontend Page View**: Copy/modify [MangoGrading.tsx](file:///d:/Research%20Project/Research-Project/frontend/src/pages/MangoGrading/MangoGrading.tsx) into a new page folder under `pages/`, hook up the router URL inside [routes/index.tsx](file:///d:/Research%20Project/Research-Project/frontend/src/routes/index.tsx), and bind the view.
