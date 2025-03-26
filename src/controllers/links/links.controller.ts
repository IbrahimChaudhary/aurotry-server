import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { LinkService } from 'src/services/links/links.service';
import { AuthGuard } from 'src/guards/auth.guard.';

@Controller('links')
// @UseGuards(AuthGuard) 
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  findAll() {
    return this.linkService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.linkService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.linkService.findOne(id);
  }

  @Post()
  create(@Body() linkData: {
    userId: string;
    arLink: string;
    arLinkName?: string;
    arLinkSku?: string;
    arLinkStatus?: string;
    arLinkGenDate?: string | Date;
    arLinkFile?: string;
    arLinkFileSize?: number;
    arLinkCount?: number;
  }) {
    return this.linkService.create(linkData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() linkData: Partial<{
      userId: string;
      arLink: string;
      arLinkName: string;
      arLinkSku: string;
      arLinkStatus: string;
      arLinkGenDate: string | Date;
      arLinkFile: string;
      arLinkFileSize: number;
      arLinkCount: number;
    }>
  ) {
    return this.linkService.update(id, linkData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.linkService.remove(id);
  }
}