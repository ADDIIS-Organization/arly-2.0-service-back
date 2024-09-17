# Guía para Crear un Tenant

Este documento describe los pasos necesarios para crear un nuevo **tenant** en el sistema utilizando el comando de consola desarrollado. Un **tenant** es una instancia independiente en la base de datos que incluye su propio esquema, lo que permite la segmentación de datos por cliente o instancia.

## Requisitos previos

Antes de proceder con la creación de un tenant, asegúrate de cumplir con los siguientes requisitos:

1. **Entorno de desarrollo configurado**: Asegúrate de que el proyecto esté configurado correctamente y todas las dependencias estén instaladas.

Ejecuta:
```bash
npm install
```

2. **Acceso a la base de datos**: Verifica que tengas acceso al servidor de base de datos y los permisos necesarios para crear nuevos esquemas y realizar operaciones de escritura en la base de datos.

## Pasos para crear un Tenant

El proceso de creación de un tenant es bastante simple y se realiza a través de un comando en la terminal. Aquí te explicamos los pasos a seguir:

### 1. Ejecutar el comando para crear un tenant

Para crear un tenant, ejecuta el siguiente comando:

```bash
npm run create-tenant
```

Este comando iniciará el proceso interactivo de creación de un tenant.

### 2. Ingresar los datos solicitados

El sistema te solicitará la siguiente información:

- **País**: Debes ingresar el nombre del país asociado al tenant. Por ejemplo: `colombia`.
- **Estado**: Si el tenant no aplica a un estado, ingresa `N`. En ese caso, el sistema asignará automáticamente `dc` (distrito capital) como estado.
- **GUID**: El sistema generará automáticamente un GUID único para identificar al tenant.

### 3. Ejemplo de ejecución

A continuación, un ejemplo del proceso:

```bash
$ npm run create-tenant

Ingrese el país: colombia
Ingrese el estado (o N si no aplica): N
Creando tenant con nombre: colombia_dc_123e4567-e89b-12d3-a456-426614174000
Tenant creado exitosamente.
```

### 4. Qué sucede durante la creación del tenant

- **Creación del esquema**: Se crea un esquema en la base de datos para el nuevo tenant.
- **Registro del tenant**: Se almacena la información del tenant en la base de datos central.
- **Migraciones**: Se ejecutan las migraciones en el esquema recién creado para crear las tablas necesarias.
- **Seeders**: Se ejecutan los seeders para poblar las tablas con datos iniciales.

## Consideraciones adicionales

- El tenant debe crearse en una base de datos PostgreSQL.
- Asegúrate de que los nombres de país y estado sean correctos, ya que no se podrán modificar una vez creado el tenant.
- Si ocurre un error durante el proceso, la transacción será revertida, y ningún cambio será aplicado. Esto pues se aplico patron de diseño de transacciones.