import { forwardRef, Module } from '@nestjs/common';
import { LinkController } from 'src/controllers/links/links.controller';
import { LinkService } from 'src/services/links/links.service';
import { AuthModule } from '../auth/middleware.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule, 
    forwardRef(() => AuthModule), 
  ],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinksModule {}