import { IsDefined, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateClientsDto {
  @ApiProperty({
    description: 'csv fields',
    required: true,
    example: {
      name: 'John',
    },
  })
  @IsDefined({ message: 'Fields are required' })
  fields: Record<string, string>;

  @ApiProperty({
    description: 'number of lines to generate',
    required: true,
    example: 3,
    type: Number,
  })
  @IsInt()
  @Min(0)
  numberOfClients: number;
}
