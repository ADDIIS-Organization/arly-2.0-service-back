import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';

export function ApiSearchOperation( entityName: string) {
  return applyDecorators(
    ApiOperation({ summary : `Search with any field for a ${entityName}` }),
    ApiQuery({
      name: 'field',
      type: 'string',
      description: `Field of the ${entityName} to search by`,
      required: true,
    }),
    ApiQuery({
      name: 'term',
      type: 'string',
      description: 'Term to search for',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: `Return matching ${entityName}s.`,
    }),
    ApiResponse({
      status: 404,
      description: `No matching ${entityName}s found.`,
    }),
  );
}

export function ApiPostOperation( entityName: string, dto:any) {
  return applyDecorators(
    ApiOperation({ summary: `Create a new ${entityName}` }),
    ApiBody({ type: dto }),
    ApiResponse({
      status: 201,
      description: `The ${entityName} has been successfully created.`,
    }),
    ApiResponse({
      status: 400,
      description: `Bad Request.`,
    }),
  )
}


export function ApiPutOperation( entityName: string , dto : any) {
  return applyDecorators(
    ApiOperation({ summary: `Update a ${entityName}` }),
    ApiBody({ type: dto }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({
      status: 200,
      description: `The ${entityName} has been successfully updated.`,
    }),
    ApiResponse({
      status: 400,
      description: `Bad Request.`,
    }),
    ApiResponse({
      status: 404,
      description: `The ${entityName} not found.`,
    }),
  )
}
  

export function ApiDeleteOperation( entityName: string) {
  return applyDecorators(
    ApiOperation({ summary : `Delete a ${entityName}` }),
    ApiParam({ name: 'id', type: 'number' }),
  HttpCode(204),
    ApiResponse({
      status: 204,
      description: `The ${entityName} has been successfully deleted.`,
    }),
    ApiResponse({
      status: 404,
      description: `The ${entityName} not found.`,
    }),
  )
}


export function ApiGetAllOperation(  entityName: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get all ${entityName}s` }),
    ApiResponse({
      status: 200,
      description: `Return all ${entityName}s.`,
    }),
  )
}