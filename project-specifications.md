# Arly 2.0 Service Backend

## Project Specifications

### 0. Swagger
- Swagger is available at `http://localhost:3000/api-docs`

### 1. Versioning
- PgAdmin 4: 8.1

### 2. File Naming Conventions
- DTOs:
  - Input DTOs (for create or update operations): `action-entity.dto.ts`
  - Output DTOs (for responses): `entity-response.dto.ts`

### 3. Folder Structure

```
src/
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

## Project Architecture

This project follows a Clean Architecture approach, separated into the following layers:

1. **Core**: Contains the business logic of the application.
   - **Domain**: Defines the core business logic and rules.
     - `entities`: Core business objects.
     - `ports`: Interfaces defining the boundaries of the domain.
       - `inbound`: Interfaces for incoming operations.
       - `outbound`: Interfaces for outgoing operations.
     - `services`: Implementation of domain-specific business rules.
   - **Application**: Orchestrates the flow of data to and from the domain.
     - `ports`: Interfaces for application-level operations.
     - `services`: Implementation of application-specific use cases.

2. **Infrastructure**: Handles external concerns and implements the interfaces defined in the core.
   - `adapters`: Implements interfaces defined in the core.
   - `config`: Configuration files for the application.
   - `controllers`: Handles incoming HTTP requests.
   - `dtos`: Data Transfer Objects for input/output.
   - `exceptions`: Custom exception handlers.
   - `modules`: NestJS modules.
   - `persistence`: Database-related implementations.

3. **Test**: Contains all test files for the project.

## Getting Started

(Add instructions for setting up and running the project here)

## Contributing

(Add guidelines for contributing to the project here)

## License

(Add license information here)