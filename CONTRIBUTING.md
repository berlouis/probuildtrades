# Contributing to Renosolutions Builder Verification System

Thank you for your interest in contributing to the Renosolutions Builder Verification System! This document provides guidelines and instructions for contributing to this project.

## Project Structure Overview

This repository contains an integrated solution with two primary components:

1. **Builder Verification System**: A Next.js web application for builder verification management
2. **Redis Cache System**: A specialized caching module for optimizing performance

## Development Setup

### Prerequisites

- Node.js 18 or higher
- Bun (preferred) or npm/yarn
- Docker and Docker Compose (for Redis)
- Git

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/renosolutions.git
   cd renosolutions
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Set up Redis:
   ```bash
   bash scripts/start-redis.sh
   ```
5. Run the development server:
   ```bash
   bun dev
   ```

## Project Workflow

### Branching Strategy

- `main` - stable release branch
- `develop` - development branch, all feature branches merge here
- `feature/feature-name` - branch for new features
- `bugfix/bug-description` - branch for bug fixes
- `release/version` - release preparation branches

### Commit Message Format

We follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

Example:
```
feat(cache): add geographic distribution to Redis cache

Implement location-based caching strategy with configurable regions
to reduce latency for geographically distributed users.

Closes #123
```

### Pull Request Process

1. Create a branch from `develop` for your changes
2. Make your changes and write/update tests as necessary
3. Ensure all tests pass
4. Update documentation as needed
5. Submit a pull request to the `develop` branch

## Development Guidelines

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Use ESLint and Prettier for code formatting

### Testing

- Write tests for new features and bug fixes
- Test both success and failure cases
- For cache components, test with simulated load

### Documentation

- Update documentation for any changed functionality
- Document new features, APIs, and configuration options
- Include JSDoc comments for functions and classes

## Working with Specific Components

### Builder Verification System

The main application code is in the `src/` directory. This includes:

- Next.js routes and API endpoints
- React components
- Utility functions
- Hooks and contexts

### Redis Cache System

The cache system is in the `reno-cache-system/` directory. This includes:

- Cache service implementation
- Cache analytics
- ML-based predictive caching
- Cache monitoring and alerting

When working with the cache system, be mindful of:
- Performance implications of changes
- Memory usage
- Cache invalidation strategies
- TTL (Time To Live) settings

## Questions and Support

If you have any questions or need support, please:

1. Check existing issues and documentation
2. Open a new issue if you can't find an answer
3. Tag issues with appropriate labels (`question`, `bug`, `enhancement`, etc.)

Thank you for contributing to make the Renosolutions Builder Verification System better!
