// src/infrastructure/adapters/inbound/cli/console-input.service.ts
import * as readlineSync from 'readline-sync';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsoleInputService {
  getCountry(): string {
    return readlineSync.question('Ingrese el país: ');
  }

  getState(): string {
    let state = readlineSync.question('Ingrese el estado (o N si no aplica): ');
    if (state.toUpperCase() === 'N') {
      state = 'dc';
    }
    return state;
  }
}
