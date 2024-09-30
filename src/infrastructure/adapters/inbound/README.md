# Directorio `inbound`

El directorio `inbound` contiene los adaptadores de entrada para la aplicación. Estos adaptadores son responsables de recibir las solicitudes o eventos externos (entradas) y convertirlos en acciones que la aplicación pueda manejar. Cada subcarpeta tiene un propósito específico basado en el tipo de entrada que maneja.

## `/infrasctructure/adapters/inbound/cli`
Este directorio contiene adaptadores relacionados con la **línea de comandos (Command Line Interface)**. Los comandos dentro de esta carpeta permiten la interacción con la aplicación a través de una consola, permitiendo realizar tareas específicas como scripts de mantenimiento o comandos internos. A continuación, se muestra un ejemplo practico de como se puede implementar un comando CLI en NestJS.

```typescript
// src/infrastructure/adapters/inbound/cli/commands/hello.command.ts

import { Command, Console } from 'nestjs-console';

@Console()
export class HelloCommand {
  @Command({
    command: 'hello',
    description: 'Prints "Hello, World!"',
  })
  async handle() {
    console.log('Hello, World!');
  }
}
```

## `/infrasctructure/adapters/inbound/cron`

Este directorio contiene adaptadores relacionados con la **planificación de tareas (Cron)**. Los adaptadores dentro de esta carpeta permiten programar tareas para que se ejecuten en momentos específicos o de forma periódica. A continuación, se muestra un ejemplo practico de como se puede implementar un cron en NestJS.

```typescript
// src/infrastructure/adapters/inbound/cron/jobs/hello.job.ts

import { Cron, CronExpression } from '@nestjs/schedule';

@Cron(CronExpression.EVERY_10_SECONDS)
export class HelloJob {
  handle() {
    console.log('Hello, World!');
  }
}
```


## `/infrasctructure/adapters/inbound/events`
Aquí se gestionan los **eventos** que provienen de otros sistemas o procesos dentro del mismo sistema. Este directorio suele contener handlers que procesan eventos entrantes en una arquitectura orientada a eventos (Event-Driven). Los eventos pueden estar relacionados con cambios de estado u otras acciones significativas.

## `/infrasctructure/adapters/inbound/fs`
Este directorio contiene adaptadores para manejar **sistemas de archivos (File System)**. Estos adaptadores permiten que la aplicación interactúe con el sistema de archivos para leer, escribir, o modificar archivos. Los watchers permiten observar cambios en archivos para ejecutar tareas automatizadas.

### `/infrasctructure/adapters/inbound/fs/watcher`
Subcarpeta dentro de `fs` que contiene lógica para monitorear y reaccionar a cambios en el sistema de archivos. Puede ser útil para escenarios donde la aplicación debe reaccionar a la creación, modificación o eliminación de archivos.

## `/infrasctructure/adapters/inbound/grpc`
Este directorio contiene adaptadores para manejar **comunicaciones gRPC**. Aquí es donde se implementan los servicios y métodos que permiten que otros sistemas se comuniquen con esta aplicación a través del protocolo gRPC.

¿En que casos se utiliza gRPC?

- Comunicación entre microservicios.
- Comunicación entre servicios y clientes.
- Comunicación entre servicios y aplicaciones.

¿Cuando es útil utilizar gRPC?

- Cuando se necesita una comunicación eficiente y rápida entre servicios.
- Cuando se necesita una comunicación segura y confiable.
- Cuando se necesita una comunicación bidireccional.

¿Por qué utilizar gRPC?

- Protocolo de comunicación eficiente basado en HTTP/2.
- Soporte para múltiples lenguajes de programación.
- Generación automática de código a partir de un archivo `.proto`.

¿Cuando usar gRPC en lugar de REST?

- Cuando se necesita una comunicación eficiente y rápida. Verás, gRPC utiliza HTTP/2, lo que permite la multiplexación de solicitudes y respuestas, lo que lo hace más rápido que REST. Además, gRPC utiliza el formato de serialización binaria, lo que lo hace más eficiente que REST, que generalmente utiliza JSON o XML.

## `infrastructure/adapters/inbound/http/`
Este directorio contiene los adaptadores relacionados con **solicitudes HTTP**. Los controladores que manejan rutas y peticiones HTTP (GET, POST, PUT, DELETE, etc.) se encuentran dentro de esta carpeta.

### `infrastructure/adapters/inbound/http/controllers/`
Subcarpeta dentro de `http` que agrupa los controladores que manejan las rutas y peticiones HTTP específicas. Aquí es donde se define la lógica de cómo manejar las solicitudes que provienen de una API REST.

## `infrastructure/adapters/inbound/queue/`
Contiene adaptadores relacionados con la **gestión de colas de trabajo**. Estos adaptadores permiten manejar tareas en segundo plano que son colocadas en una cola para ser procesadas de manera asíncrona.

### `infrastructure/adapters/inbound/queue/consumers/`
Subcarpeta dentro de `queue` donde se encuentran los **consumidores de colas**. Los consumidores son responsables de tomar mensajes o trabajos de la cola y procesarlos según la lógica de negocio.

## `infrastructure/adapters/inbound/scheduler/`
Subcarpeta que maneja la **planificación de tareas**. Aquí se define la lógica para programar la ejecución de trabajos en momentos específicos.

#### `infrastructure/adapters/inbound/scheduler/jobs/`
Subcarpeta dentro de `scheduler` que contiene los **trabajos o tareas** que se ejecutan periódicamente o en horarios específicos. Los trabajos pueden incluir tareas como el envío de correos, limpiezas automáticas o procesamiento de datos en segundo plano.

## `infrastructure/adapters/inbound/webhooks/`
Este directorio contiene los adaptadores para **webhooks**, que permiten que la aplicación escuche y responda a solicitudes entrantes de otros servicios a través de webhooks. Generalmente, los webhooks son utilizados para recibir notificaciones automáticas desde plataformas externas.

## `infrastructure/adapters/inbound/websockets/`
Contiene adaptadores para manejar **comunicaciones en tiempo real utilizando WebSockets**. Aquí es donde se define la lógica para conexiones bidireccionales que permiten la interacción en tiempo real entre el cliente y el servidor.

