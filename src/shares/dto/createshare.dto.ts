import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShareDto {
  @IsNotEmpty() @IsString() share: string;
  @IsNotEmpty() @IsString() state: string;
}