import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/db/drizzle.service';
import { links } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class LinkService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    return this.drizzleService.db.select().from(links);
  }

  async findOne(id: number) {
    return this.drizzleService.db.select().from(links).where(eq(links.id, id));
  }

  async findByUserId(userId: string) {
    return this.drizzleService.db.select().from(links).where(eq(links.userId, userId));
  }

  async create(linkData: {
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
    // Convert string date to Date object if needed
    const formattedData = {
      ...linkData,
      arLinkGenDate: linkData.arLinkGenDate ? new Date(linkData.arLinkGenDate) : undefined
    };

    const [newLink] = await this.drizzleService.db
      .insert(links)
      .values(formattedData)
      .returning();
    
    return newLink;
  }
  
  async update(id: number, linkData: Partial<{
    userId: string;
    arLink: string;
    arLinkName: string;
    arLinkSku: string;
    arLinkStatus: string;
    arLinkGenDate: string | Date;
    arLinkFile: string;
    arLinkFileSize: number;
    arLinkCount: number;
  }>) {
    // Convert string date to Date object if needed
    const formattedData = {
      ...linkData
    };
    
    if (linkData.arLinkGenDate && typeof linkData.arLinkGenDate === 'string') {
      formattedData.arLinkGenDate = new Date(linkData.arLinkGenDate);
    }

    const [updatedLink] = await this.drizzleService.db.update(links)
      .set(formattedData)
      .where(eq(links.id, id))
      .returning();
    return updatedLink;
  }

  async remove(id: number) {
    return this.drizzleService.db.delete(links).where(eq(links.id, id));
  }
}