#!/bin/bash

check_node() {
    if ! command -v node &> /dev/null; then
        echo "Node.js is not installed. Please install Node.js to proceed."
        exit 1
    else
        echo "Node.js is installed. Version: $(node -v)"
    fi
}

install_frontend_dependencies() {
    if [ -d "frontend/node_modules" ]; then
        echo "Frontend dependencies are already installed."
    else
        echo "Installing frontend dependencies..."
        cd frontend || exit 1
        npm install --legacy--peer-deps
        if [ $? -ne 0 ]; then
            echo "Failed to install frontend dependencies."
            exit 1
        fi
        cd ..
    fi
}

start_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        DOCKER_COMPOSE_CMD="docker-compose"
    elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
        DOCKER_COMPOSE_CMD="docker compose"
    else
        echo "Neither 'docker-compose' nor 'docker compose' is installed. Please install Docker Compose to proceed."
        exit 1
    fi

    echo "Using Docker Compose command: $DOCKER_COMPOSE_CMD"
    echo "Starting Docker Compose..."
    $DOCKER_COMPOSE_CMD up --build
}

echo "Starting setup process..."
check_node
install_frontend_dependencies
start_docker_compose
