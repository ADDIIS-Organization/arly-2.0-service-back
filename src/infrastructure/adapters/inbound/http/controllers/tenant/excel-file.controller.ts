import { Controller, Post, Body, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExcelFileService } from 'src/core/application/services/tenant/excel-file.service';
import { Express } from 'express';
import { UploadFileDto } from '@/infrastructure/dtos/tenant/excel/darsec-excel.dto';
import { TenantContextService } from '@/core/application/services/tenant/tenant-context.service';

@ApiTags('excel')
@Controller('excel')
export class ExcelFileController {
  constructor(
    private readonly excelFileService: ExcelFileService,
    private readonly tenantContextService: TenantContextService, // Inyectamos el servicio de contexto de tenant
  ) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload an Excel file for processing' })
  @ApiResponse({ status: 201, description: 'File processed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto  // Usamos el DTO para recibir el tenantId
  ) {
    if (!file) {
      throw new HttpException('File must be provided.', HttpStatus.BAD_REQUEST);
    }

    const { tenantId } = uploadFileDto;
    console.log('Tenant ID:', tenantId);

    try {
      // Validamos que el tenant exista en la base de datos central
      await this.tenantContextService.validateTenantExists(tenantId);

      // Establecemos el esquema del tenant en el servicio de contexto
      this.tenantContextService.setTenantSchema(tenantId);

      // Procesamos el archivo Excel usando el DataSource correcto para el tenant
      const data = await this.excelFileService.processExcel(file.buffer);
      
      return { message: 'File processed successfully', data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
