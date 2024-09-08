import {
  CreateCediDto,
  CediResponseDto,
  UpdateCediDto,
} from '@/infrastructure/dtos/cedi';
import { IBaseApplicationPort } from './common';

/**
 * ICediApplicationPort interface represents the contract for managing Cedis in the application.
 */
export interface ICediApplicationPort
  extends IBaseApplicationPort<CediResponseDto, CreateCediDto, UpdateCediDto> {}
