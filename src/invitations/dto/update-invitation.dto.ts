import { IsNotEmpty, IsString } from "class-validator";

export class UpdateInvitationDto {
    @IsString()
    message: string;
}