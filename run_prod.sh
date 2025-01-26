#!/bin/bash

FRONTEND_DIR="./frontend"
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"

function check_node() {
  if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js to proceed."
    exit 1
  else
    echo "Node.js is installed. Version: $(node -v)"
  fi
}

function detect_docker_compose() {
  if command -v docker compose &> /dev/null; then
    echo "docker compose"
  elif command -v docker-compose &> /dev/null; then
    echo "docker-compose"
  else
    echo "Neither 'docker compose' nor 'docker-compose' is installed. Exiting..."
    exit 1
  fi
}

echo "Checking if Node.js is installed..."
check_node

DOCKER_COMPOSE_CMD=$(detect_docker_compose)
echo "Using '${DOCKER_COMPOSE_CMD}' to manage Docker Compose services."

echo "Starting React build process..."
if [ -d "$FRONTEND_DIR" ]; then
  cd "$FRONTEND_DIR" || { echo "Frontend directory not found! Exiting..."; exit 1; }
else
  echo "Frontend directory ($FRONTEND_DIR) does not exist. Exiting..."
  exit 1
fi

echo "Installing npm dependencies..."
npm install --legacy-peer-deps || { echo "Failed to install npm dependencies. Exiting..."; exit 1; }

echo "Building React app..."
npm run build || { echo "React build failed. Exiting..."; exit 1; }

echo "React build completed successfully!"
cd - || exit

echo "Starting Docker Compose services..."
${DOCKER_COMPOSE_CMD} -f "$DOCKER_COMPOSE_FILE" up --build -d || {
  echo "Failed to start Docker Compose services. Exiting..."
  exit 1
}

echo "Deployment completed successfully!"
