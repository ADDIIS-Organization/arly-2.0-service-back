import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ApiDeleteOperation,
  ApiGetAllOperation,
  ApiPostOperation,
  ApiPutOperation,
  ApiSearchOperation,
} from '@/documentation/swagger/common/api-search.decorator';
import { BaseCRUDController } from '../common/base-crud.controller';
import { UserResponseDto } from '@/infrastructure/dtos/tenant/user/user-response.dto';
import { CreateUserDto } from '@/infrastructure/dtos/tenant/user/create-user.dto';
import { UpdateUserDto } from '@/infrastructure/dtos/tenant/user/update-role.dto';
import { UserApplicationService } from '@/core/application/services/tenant/user-application.service';
import { SearchService } from '@/core/application/services/common/search.service';
import { UserEntity } from '@/infrastructure/persistence/tenant/user.entity';
import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';

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
