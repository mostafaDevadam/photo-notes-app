import { IsNotEmpty, IsString } from "class-validator";

export class CreateInvitationDto {
    @IsNotEmpty()
    @IsString()
    note: string;

    @IsNotEmpty()
    @IsString()
    sender: string;

    @IsNotEmpty()
    @IsString()
    receiver: string;

    @IsString()
    message: string;
}