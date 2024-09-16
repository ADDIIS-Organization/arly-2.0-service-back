import { PaginationDto } from '@/infrastructure/dtos/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '@/infrastructure/dtos/tenant/user';
import { UserApplicationService } from '@/core/application/services/tenant';
import { SearchService } from '@/core/application/services/common/';
import { BaseCRUDController } from '../common';
import {
  ApiDeleteOperation,
  ApiGetAllOperation,
  ApiPostOperation,
  ApiPutOperation,
  ApiSearchOperation,
} from '@/documentation/swagger/common/api-search.decorator';
import { UserEntity } from '@/infrastructure/persistence';

@ApiTags('users') // Swagger Tag para el controlador de usuarios
@Controller('users')
export class UserController extends BaseCRUDController<
  UserResponseDto,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    userApplicationService: UserApplicationService,
    private readonly searchService: SearchService,
  ) {
    super(userApplicationService);
  }

  @Post()
  @ApiPostOperation('User', CreateUserDto)
  async create(@Body() createDto: CreateUserDto): Promise<UserResponseDto> {
    console.log('start debugging', createDto);
    return super.create(createDto);
  }

  @Put(':id')
  @ApiPutOperation('User', UpdateUserDto)
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return super.update(id, updateDto);
  }

  @Get()
  @ApiGetAllOperation('User')
  async getAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<UserResponseDto[]> {
    return super.getAll(paginationDto);
  }

  @Get('search')
  @ApiSearchOperation('User')
  async searchUsers(
    @Query('field') field: string, // Campo en el que se realizará la búsqueda
    @Query('term') term: string,
  ) {
    return this.searchService.search(UserEntity, field, term);
  }

  @Delete(':id')
  @ApiDeleteOperation('User')
  async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
