# **Flujo de Autenticación Completo en un Entorno Multitenant con NestJS**

Este documento describe el flujo de autenticación completo para una aplicación multitenant utilizando NestJS, siguiendo las mejores prácticas y una arquitectura hexagonal. El enfoque permite que si un usuario tiene acceso a un solo tenant, se le proporcione la información de inicio de sesión inmediatamente; de lo contrario, se le devuelvan los tenants a los que tiene acceso para que seleccione uno.

---

## **Índice**

1. [Introducción](#introducción)
2. [Arquitectura General](#arquitectura-general)
3. [Entidades y Relaciones](#entidades-y-relaciones)
   - [CentralUserEntity](#centraluserentity)
   - [TenantEntity](#tenantentity)
4. [Servicios y Repositorios](#servicios-y-repositorios)
   - [AuthApplicationService](#authapplicationservice)
   - [TenantContextService](#tenantcontextservice)
5. [Controladores](#controladores)
   - [AuthController](#authcontroller)
6. [DTOs](#dtos)
   - [LoginDto](#logindto)
7. [Estrategias de Autenticación](#estrategias-de-autenticación)
   - [JwtStrategy](#jwtstrategy)
8. [Flujo de Autenticación Paso a Paso](#flujo-de-autenticación-paso-a-paso)
9. [Consideraciones Adicionales](#consideraciones-adicionales)
10. [Resumen](#resumen)

---

## **Introducción**

En una aplicación multitenant, es común gestionar usuarios que pueden tener acceso a uno o múltiples tenants. Este documento detalla cómo implementar un flujo de autenticación que:

- Autentica a los usuarios contra una base de datos central.
- Determina los tenants a los que el usuario tiene acceso.
- Proporciona acceso inmediato si el usuario tiene un solo tenant.
- Permite al usuario seleccionar un tenant si tiene múltiples opciones.

---

## **Arquitectura General**

- **Base de Datos Central**: Contiene información de usuarios y tenants, y las relaciones entre ellos.
- **Esquemas de Tenants**: Cada tenant tiene su propio esquema en la base de datos para aislar sus datos.
- **Servicios de Aplicación**: Gestionan la lógica de negocio y orquestan las operaciones entre la base de datos central y los esquemas de tenants.
- **Controladores**: Exponen endpoints para interactuar con la aplicación.
- **Estrategias de Autenticación**: Manejan la autenticación y autorización utilizando JWT.

---

## **Entidades y Relaciones**

### **CentralUserEntity**

Representa a los usuarios en la base de datos central.

```typescript
// src/infrastructure/persistence/central/central-user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { TenantEntity } from './tenant.entity';

@Entity('central_users')  // Esta tabla pertenece al esquema central
export class CentralUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => TenantEntity, (tenant) => tenant.users)
  @JoinTable({
    name: 'tenant_user',  // Tabla de relación muchos a muchos
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tenant_id', referencedColumnName: 'id' },
  })
  tenants: TenantEntity[];
}
