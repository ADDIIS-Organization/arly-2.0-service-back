# NestJS Import Guidelines

When working with NestJS projects, it's important to maintain a consistent and organized approach to importing modules and dependencies. This guide outlines the recommended order for imports and includes additional information about importing built-in Node.js modules.

## Import Order

Follow this order for your imports:

1. External libraries and frameworks
2. NestJS specific imports
3. Built-in Node.js modules
4. Application-specific imports (using aliases)
5. Relative imports from the same module

### Example:

```typescript
// 1. External libraries and frameworks
import { Module, OnModuleInit, Logger, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 2. NestJS specific imports
// (None in this example, but would go here if needed)

// 3. Built-in Node.js modules
import * as fs from 'fs';
import * as path from 'path';

// 4. Application-specific imports (using aliases)
import { RoleRepository } from '@/core/domain/ports/outbound';
import { RoleRepositoryAdapter } from '@/infrastructure/adapters';
import { seedRoles } from '@/infrastructure/seeds/role.seed';
import { RoleEntity } from '@/infrastructure/persistence';

// 5. Relative imports from the same module
import { RoleModule } from './';
```

## Importing Built-in Node.js Modules

When you need to use built-in Node.js modules, import them after the framework-specific imports and before your application-specific imports. Common built-in modules include:

- `fs` (File System)
- `path` (Path manipulation)
- `http` / `https` (HTTP/HTTPS servers)
- `crypto` (Cryptographic functionality)
- `os` (Operating system-related utility methods)
- `util` (Utility functions)

Example:

```typescript
import { Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
```

## Using Aliases

In the example provided, aliases (e.g., `@/core/domain/ports/outbound`) are used for application-specific imports. This approach helps maintain cleaner and more readable import statements. Ensure your `tsconfig.json` is configured to support these aliases.

## Circular Dependencies

When dealing with circular dependencies, use `forwardRef()` as demonstrated in the example:

```typescript
@Module({
  imports: [
    forwardRef(() => RoleModule), // Use forwardRef to avoid circular dependency
  ],
  // ...
})
```

This allows NestJS to resolve circular dependencies between modules.

## Best Practices

1. Group imports by their categories (as outlined in the import order section).
2. Use specific imports rather than importing entire modules when possible.
3. Consider using barrel files (index.ts) to simplify imports from complex directory structures.
4. Keep your imports organized and clean to improve code readability and maintainability.

By following these guidelines, you'll maintain a consistent and organized codebase, making it easier for you and your team to navigate and understand the project structure.