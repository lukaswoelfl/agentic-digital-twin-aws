# 🏢 Agentic Digital Twin - AWS Serverless Deployment & Next.js Interface

This repository contains the complete codebase for the **Agentic Digital Twin**. It features an administrative interface built with Next.js & Tailwind CSS, connected to a serverless FastAPI backend running on AWS Lambda with S3-based chat memory persistence and AWS Bedrock foundation models (Anthropic Claude).

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
    ├──► AWS Bedrock (Claude model for response generation)
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
- **AWS Bedrock integration**: Native conversation execution using Bedrock models
- **Docker-based packaging**: Automated dependency bundling using Docker matching AWS Lambda's environment

### Infrastructure & CI/CD
- **Terraform**: Complete Infrastructure as Code (IaC) configuration for deploying environments
- **S3 State Backend**: Remote state storage with AWS S3 native locking (`use_lockfile = true`)
- **GitHub Actions**: Automated deployment workflows with OpenID Connect (OIDC) secure authentication
- **Automation Scripts**: Fast deploy/destroy scripts for multi-environment lifecycles (`dev`, `test`, `prod`)

---

## 📁 Project Structure

- [backend/](file:///Users/wlukas/projects/agentic-digital-twin-aws/backend) - Python FastAPI Backend & Lambda packaging
- [frontend/](file:///Users/wlukas/projects/agentic-digital-twin-aws/frontend) - Next.js Frontend App
- [terraform/](file:///Users/wlukas/projects/agentic-digital-twin-aws/terraform) - Terraform infrastructure configuration
  - [backend-setup/](file:///Users/wlukas/projects/agentic-digital-twin-aws/terraform/backend-setup) - Bootstrapping S3 state resources
- [scripts/](file:///Users/wlukas/projects/agentic-digital-twin-aws/scripts) - Automated deployment & destruction scripts


---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** 20.x or higher
- **Python** 3.12 or higher (managed with `uv` recommended)
- **Terraform** 1.15 or higher
- **Docker** (for packing Lambda backend dependencies)
- **AWS CLI** installed and configured (`aws configure`)

### Local Environment Setup

1. **Configure Root Environment Variables**:
   Copy [.env.example](file:///Users/wlukas/projects/agentic-digital-twin-aws/.env.example) to `.env` in the project root and fill in your AWS details:
   ```bash
   cp .env.example .env
   ```
   Set your 12-digit AWS Account ID, Region, and Project details in the `.env` file.

2. **Start the Backend Locally**:
   Create a `.env` in the `backend/` directory and configure your credentials:
   ```bash
   cd backend
   cp .env.example .env
   
   # Sync dependencies & start development server
   uv sync
   uv run uvicorn server:app --reload
   ```
   The local backend will be available at [http://localhost:8000](http://localhost:8000).

3. **Start the Frontend Locally**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## ☁️ Cloud Deployment (AWS)

### 1. Bootstrap State Storage (Run Once)
Before deploying the application, you need to create the global S3 bucket that will store Terraform state files. Navigate to the bootstrap folder and apply:
```bash
cd terraform/backend-setup
terraform init
terraform apply -auto-approve
cd ../..
```

### 2. Deploying Environments
Use the automated deploy script to build the Lambda zip package, provision all AWS resources (S3, API Gateway, CloudFront, Lambda, IAM), and build/sync the Next.js static files automatically:

**Mac/Linux:**
```bash
# Deploy to development environment
./scripts/deploy.sh dev

# Deploy to staging/test environment
./scripts/deploy.sh test
```

**Windows (PowerShell):**
```powershell
.\scripts\deploy.ps1 -Environment dev
```

### 3. CI/CD with GitHub Actions
When code is pushed to the `main` branch, GitHub Actions will assume the configured IAM OIDC Deploy Role and automatically run the deployment.
- Make sure to set the required Repository Secrets in GitHub (`AWS_ROLE_ARN`, `AWS_ACCOUNT_ID`, and `DEFAULT_AWS_REGION`).

### 4. Teardown / Cleanup
To destroy an environment and remove all related AWS resources (CloudFront, S3 buckets, API Gateway, Lambda):

**Mac/Linux:**
```bash
./scripts/destroy.sh dev
```

**Windows (PowerShell):**
```powershell
.\scripts\destroy.ps1 -Environment dev
```