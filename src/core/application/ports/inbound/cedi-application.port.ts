import { CediResponseDto } from "@/infrastructure/dtos/tenant/cedi/cedi-response.dto";
import { CreateCediDto } from "@/infrastructure/dtos/tenant/cedi/create-cedi.dto";
import { UpdateCediDto } from "@/infrastructure/dtos/tenant/cedi/update-cedi.dto";
import { IBaseApplicationPort } from "./common/crud-application.port";

/**
 * ICediApplicationPort interface represents the contract for managing Cedis in the application.
 */
export interface ICediApplicationPort
  extends IBaseApplicationPort<CediResponseDto, CreateCediDto, UpdateCediDto> {}
