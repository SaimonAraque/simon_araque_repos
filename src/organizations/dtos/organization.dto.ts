import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly status: number;
}

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly status: number;
}
