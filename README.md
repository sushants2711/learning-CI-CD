# 🚀 Full-Stack App: Learning CI/CD & Deployment

> A modern full-stack application featuring a React frontend, Node.js/Express backend, and MongoDB. This project is built from the ground up to demonstrate best practices in **Docker Containerization**, **Production Architecture**, and **CI/CD Pipelines**.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

---

## 📖 Table of Contents
1. [Prerequisites](#-1-prerequisites)
2. [Quick Start: Standard Development](#-2-quick-start-standard-development-no-docker)
3. [Testing: Docker Development](#-3-testing-docker-development)
4. [Production Architecture](#-4-production-architecture)
5. [CI/CD Workflows](#-5-cicd-workflows)

---

## 📋 1. Prerequisites

Before diving in, you'll need a couple of tools installed on your machine:

- 🟢 **Node.js (v18+) & npm**: Required to run the servers locally during standard day-to-day coding.
- 🐳 **Docker & Docker Compose**: **[MANDATORY]** You must install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Mac/Windows) or Docker Engine (Linux). You *must* use Docker to test your code before pushing it to production!

---

## 💻 2. Quick Start: Standard Development (No Docker)

For fast, day-to-day coding, it's usually easiest to run the Node.js servers directly on your machine. We've included simple scripts to get you up and running instantly.

### Step 1: Install Dependencies
*Run this once to download all the necessary packages for both frontend and backend.*
- **🐧 Linux / 🍏 macOS:** `./install-deps.sh`
- **🪟 Windows:** `install-deps.bat`

### Step 2: Start the Servers
*This boots up both the frontend and backend servers together in a single terminal.*
- **🐧 Linux / 🍏 macOS:** `./start-servers.sh`
- **🪟 Windows:** `start-servers.bat`

> 💡 **Tip:** Press `Ctrl+C` at any time to gracefully stop both servers.

---

## 🐳 3. Testing: Docker Development

Even if you prefer coding using the "Standard Way", **you must test your code with Docker before pushing it to GitHub**. This guarantees that if it works on your machine, it will work perfectly on the production server.

### Option A: The Easy Way (Docker Compose)
Docker Compose manages the frontend, backend, and network together automatically.

| Action | Command |
| :--- | :--- |
| **Start Everything** | `docker compose up --build` |
| **Start in Background** | `docker compose up -d --build` |
| **Stop Everything** | `docker compose down` |
| **Nuke Everything** (Fixes cache issues) | `docker compose down -v` |

<br>

### Option B: The Manual Way (Standalone Containers)
If you prefer complete control and want to run the containers separately without `docker-compose`, use these standard Docker commands:

**► Run the Backend Only:**
```bash
cd backend
docker build -t todo-backend -f Dockerfile.dev .
docker run -d -p 4000:4000 --env-file .env -v "$(pwd):/app" -v /app/node_modules --name my-backend todo-backend
```

**► Run the Frontend Only:**
```bash
cd frontend
docker build -t todo-frontend -f Dockerfile.dev .
docker run -d -p 5173:5173 --env-file .env -v "$(pwd):/app" -v /app/node_modules --name my-frontend todo-frontend
```
> 🧠 **Note:** Because the React frontend executes inside your web browser, it will successfully connect to the backend running on `localhost:4000` via your machine's network!

---

## 🛑 Why ALWAYS Test with Docker Before Pushing?

1. **Environment Parity:** Docker eliminates the "It works on my machine" problem. If your code works inside the local container, it is guaranteed to work on the cloud server.
2. **Dependency Integrity:** Did you accidentally install a package globally instead of saving it to `package.json`? Docker builds from a blank slate and will catch this mistake instantly.
3. **Save Money & Time:** CI/CD runners cost money. Failing a cloud build because of a typo is a waste of resources that could have been caught locally.

---

## 🏗️ 4. Production Architecture

Our production setup completely separates the Backend API from the Frontend Client to maximize performance, scalability, and security.

### ⚙️ Backend: Docker + NGINX (Reverse Proxy)
The **Node.js Backend** is containerized using a production-ready `Dockerfile`.
- **Lightweight Image:** We use `npm ci --omit=dev` to skip heavy testing tools in production.
- **NGINX:** Node.js is great at logic but terrible at raw network routing. NGINX sits in front of the Node container as a **Reverse Proxy** to accept HTTPS requests, limit spam, and securely route traffic to the backend.

### 🌐 Frontend: AWS S3 + CloudFront CDN
The **React Frontend** is a Single Page Application (SPA). It doesn't need a heavy Node.js server in production—it's just static files!
- **Build:** We run `npm run build` to generate a highly optimized `dist/` folder.
- **Storage:** These static files are uploaded to an **Amazon S3 Bucket**.
- **Delivery:** **AWS CloudFront** (a global CDN) caches the website in data centers all over the world, ensuring the site loads instantly for users everywhere while shielding the S3 bucket from direct traffic.

---

## 🔄 5. CI/CD Workflows

We use Continuous Integration and Continuous Deployment (CI/CD) to fully automate testing and deployment every time code is pushed to the `main` branch.

**The Pipeline Flow:**
1. **🚀 Trigger:** Developer pushes code to `main`.
2. **🛠️ Setup:** The CI runner checks out the code and sets up Node.js.
3. **🧪 Testing (CI):** The runner executes linters, tests, and security scans.
4. **📦 Build Frontend:** The runner executes `npm run build`.
5. **☁️ Deploy Frontend:** The runner syncs the new files to the AWS S3 Bucket and clears the CloudFront cache.
6. **🐳 Build Backend Image:** The runner builds the backend `Dockerfile`.
7. **🗄️ Push to Registry:** The backend image is pushed to a container registry (like Docker Hub or AWS ECR).
8. **🚀 Deploy Backend (CD):** The runner connects to the production Ubuntu Server via SSH, pulls the latest Docker image, and restarts the backend container seamlessly.

*With this setup, developers can focus 100% on writing code without ever worrying about manual server maintenance!*
