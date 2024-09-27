# Arly 2.0 Service Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Table of Contents

- [Description](#description)
- [Project Specifications](#project-specifications)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Import Guidelines](#import-guidelines)
- [Contributing](#contributing)
- [Support](#support)
- [Stay in Touch](#stay-in-touch)
- [License](#license)

## Description

Arly 2.0 Service Backend is a robust and scalable server-side application built with [Nest](https://github.com/nestjs/nest) framework. It implements a Clean Architecture approach to ensure maintainability, testability, and separation of concerns.

## Project Specifications

### Swagger

- API documentation is available at `http://localhost:3000/api-docs`

### Versioning

- PgAdmin 4: 8.1

### File Naming Conventions

- DTOs:
  - Input DTOs (for create or update operations): `action-entity.dto.ts`
  - Output DTOs (for responses): `entity-response.dto.ts`

### Folder Structure

```
├── dist/                      # Compiled files
│   └── src/                   # Mirror of src structure with compiled files
├── guidelines/                # Project guidelines
├── src/                       # Source files
│   ├── core/
│   │   ├── application/
│   │   │   ├── guards/
│   │   │   ├── ports/
│   │   │   │   └── inbound/
│   │   │   ├── services/
│   │   │   └── strategies/
│   │   └── domain/
│   │       ├── entities/
│   │       ├── ports/
│   │       │   ├── inbound/
│   │       │   └── outbound/
│   │       └── services/
│   ├── infrastructure/
│   │   ├── adapters/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── exceptions/
│   │   ├── modules/
│   │   ├── persistence/
│   │   ├── seeds/
│   │   │   ├── data/
│   │   │   └── interfaces/
│   │   └── utils/
│   └── seeds/
└── test/  src/
├── core/
│   ├── application/
│   │   ├── ports/
│   │   └── services/
│   └── domain/
│       ├── entities/
│       ├── ports/
│       │   ├── inbound/
│       │   └── outbound/
│       └── services/
└── infrastructure/
    ├── adapters/
    ├── config/
    ├── controllers/
    ├── dtos/
    ├── exceptions/
    ├── modules/
    └── persistence/
test/
```

#### Key Directories Explained:

- `dist/`: Contains the compiled JavaScript files. It mirrors the structure of the `src/` directory.
- `guidelines/`: Houses project-specific guidelines such as import guidelines.
- `src/`: The main source code directory.
  - `core/`: Contains the core business logic.
    - `application/`: Application-specific logic, including guards, inbound ports, services, and strategies.
    - `domain/`: Core domain logic, including entities, inbound/outbound ports, and domain services.
  - `infrastructure/`: Handles external concerns and implements interfaces defined in the core.
    - `adapters/`: Implements interfaces defined in the core.
    - `config/`: Configuration files.
    - `controllers/`: Handles incoming HTTP requests.
    - `dtos/`: Data Transfer Objects for input/output.
    - `exceptions/`: Custom exception handlers.
    - `modules/`: NestJS modules.
    - `persistence/`: Database-related implementations.
    - `seeds/`: Database seeding scripts and interfaces.
    - `utils/`: Utility functions and helpers.
  - `seeds/`: Additional seeding scripts (if any).
- `test/`: Contains all test files for the project.

This structure follows the principles of Clean Architecture, separating concerns and maintaining a clear boundary between the core business logic and external dependencies.

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/ADDIIS-Organization/arly-2.0-service-back.git
   cd arly-2.0-service-backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up your environment variables (create a `.env` file based on the one provided to you)

4. Start the development server
   ```bash
   npm run start:dev
   ```

## Development

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Import Guidelines

We follow a strict import order to maintain consistency across the project. For detailed guidelines, please refer to the [Import Guidelines](./guidelines/import.guidelines.md) document.

## Contributing

We welcome contributions to the Arly 2.0 Service Backend! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in Touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

This project is [MIT licensed](LICENSE).
