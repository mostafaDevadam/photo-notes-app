import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('collaborations')
@UseGuards(AuthGuard)
export class CollaborationsController {
    constructor(private readonly collService: CollaborationsService) { }
    // get all by user/member
    // remove

    @Get("/all/member/:memberId")
    async getAllByMember(@Param("memberId") memberId: any) {
        const collaborations = await this.collService.findAllByMember(memberId);
        return { statusCode: 200, message: 'Get collaborations by member successfully', data: collaborations }
    }

    @Get("/:id")
    async findOneById(@Param("id") id: any) {
        const collaboration = await this.collService.findOneById(id);
        return { statusCode: 200, message: 'Get collaboration successfully', data: collaboration }
     }

     @Patch("/:id/remove/member/:memberId")
    async removeMember(@Param("id") id: any, @Param("memberId") memberId: any) {
          const removed = await this.collService.removeMember(id, memberId);
          return { statusCode: 200, message: 'Removed member from collaboration successfully', data: removed }
    }

    @Delete("/:id")
    async remove(@Param("id") id: any) {
        const removed = await this.collService.remove(id);
        return { statusCode: 200, message: 'Removed collaboration successfully', data: removed }
    }   


}
