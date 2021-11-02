import {
  Body,
  Controller,
  Header,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ROUTES } from '../../shared/config/routes';
import { CsvGeneratorService } from '../services/csv-generator.service';
import { configService } from '../../shared/config/config.service';
import { GenerateClientsDto } from '../dto/in/generate-clients.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: 'Validation error',
})
@Controller(ROUTES.CSV_GENERATOR.MAIN)
export class CsvGeneratorController {
  constructor(private readonly _csvGeneratorService: CsvGeneratorService) {}

  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', `attachment; filename=Clients`)
  @Post()
  async generateClientsList(
    @Res() res: Response,
    @Body() data: GenerateClientsDto,
  ): Promise<void> {
    const clients = await this._csvGeneratorService.generateCsv(data);
    clients.pipe(res);
  }
}
