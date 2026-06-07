# 🏢 Agentic Digital Twin - AWS Deployment & Next.js Interface

This repository contains the complete codebase for the **Agentic Digital Twin**. It includes a high-performance admin dashboard built with Next.js & Tailwind CSS, connected to a serverless FastAPI backend running on AWS Lambda with S3-based chat memory persistence and OpenAI GPT models.

## 🏗️ Architecture

```text
User Browser
    │ (HTTPS)
    ▼
CloudFront (CDN)
    │
    ├──► S3 Static Website (Frontend Next.js App)
    │
    ▼ (HTTPS API Calls)
API Gateway
    │
    ▼
AWS Lambda (FastAPI Backend with Mangum)
    │
    ├──► OpenAI API (GPT Model for response generation)
    └──► S3 Bucket (Conversation history memory storage)
```

## 🚀 Features

### Frontend (User Interface)
- **Next.js 15+** with App Router & Static Export (`output: 'export'`)
- **Tailwind CSS 4** for premium UI elements
- **Chat Interface**: Fully interactive conversation component with message streaming animation and responsive UI
- **Glassmorphism Design**: Sleek dark mode styling with smooth hover transitions

### Backend (Serverless API)
- **FastAPI**: Modern, fast web framework for building APIs with Python
- **Mangum**: Adapter to run the FastAPI app serverless on AWS Lambda
- **S3 Memory Storage**: Persistent, session-based memory for conversations so the digital twin remembers context
- **Docker-based packaging**: Automated dependency bundling using Docker matching AWS Lambda's environment

---

## 📁 Project Structure

```text
agentic-digital-twin-aws/
├── backend/                  # Python FastAPI Backend
│   ├── data/                 # Knowledge base data for the digital twin
│   ├── context.py            # Personality & prompt definitions
│   ├── deploy.py             # Docker-based Lambda deployment packager
│   ├── lambda_handler.py     # Mangum entrypoint for AWS Lambda
│   ├── server.py             # Main FastAPI server logic & memory management
│   └── pyproject.toml        # Backend dependencies & python config
│
├── frontend/                 # Next.js Frontend
│   ├── app/                  # Next.js App Router (layout, pages)
│   ├── components/           # Reusable React components (twin.tsx, etc.)
│   ├── public/               # Static assets
│   ├── next.config.ts        # Next.js build & export configuration
│   └── package.json          # Frontend dependencies
│
└── week2/                    # Development roadmap and reference material
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** 20.x or higher
- **Python** 3.12 or higher (managed with `uv` recommended)
- **Docker** (for packing Lambda backend dependencies)
- **AWS CLI** installed and configured (`aws configure`)

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lukaswoelfl/agentic-digital-twin-aws.git
   cd agentic-digital-twin-aws
   ```

2. **Start the Backend:**
   Create a `.env` in `backend/` and configure your API keys:
   ```bash
   cd backend
   # Copy environment variables and set them
   cp .env.example .env 
   
   # Sync dependencies & start development server
   uv sync
   uv run uvicorn server:app --reload
   ```
   The backend will be available at [http://localhost:8000](http://localhost:8000).

3. **Start the Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## ☁️ Deployment

### 1. Backend Deployment (AWS Lambda)
1. Ensure Docker Desktop is running locally.
2. Build the Lambda deployment package:
   ```bash
   cd backend
   python deploy.py
   ```
   This generates `lambda-deployment.zip`.
3. Create a Lambda function `twin-api` (Python 3.12, x86_64) in the AWS Console, upload the zip file (directly or via S3), and set the handler to `lambda_handler.handler`.
4. Configure Lambda Environment Variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `USE_S3`: `true`
   - `S3_BUCKET`: `your-s3-memory-bucket-name`
   - `CORS_ORIGINS`: `*` (or your CloudFront URL)

### 2. Frontend Deployment (AWS S3)
1. Build the Next.js app to export static files:
   ```bash
   cd frontend
   npm run build
   ```
   This generates the static files inside the `out/` directory.
2. Sync the static website files to your AWS S3 bucket:
   ```bash
   aws s3 sync out/ s3://<your-frontend-bucket-name>/ --delete --region <region>
   ```

3. Test your hosted application via the **S3 Bucket website endpoint** (or CloudFront URL once set up).