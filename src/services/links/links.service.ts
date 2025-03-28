import { Injectable,ConflictException,InternalServerErrorException } from '@nestjs/common';
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

  // async create(linkData: {
  //   userId: string;
  //   arLink: string;
  //   arLinkName?: string;
  //   arLinkSku?: string;
  //   arLinkStatus?: string;
  //   arLinkGenDate?: string | Date;
  //   arLinkFile?: string;
  //   arLinkFileSize?: number;
  //   arLinkCount?: number;
  // }) {
  //   // Convert string date to Date object if needed
  //   const formattedData = {
  //     ...linkData,
  //     arLinkGenDate: linkData.arLinkGenDate ? new Date(linkData.arLinkGenDate) : undefined
  //   };

  //   const [newLink] = await this.drizzleService.db
  //     .insert(links)
  //     .values(formattedData)
  //     .returning();
    
  //   return newLink;
  // }
  
  // async update(id: number, linkData: Partial<{
  //   userId: string;
  //   arLink: string;
  //   arLinkName: string;
  //   arLinkSku: string;
  //   arLinkStatus: string;
  //   arLinkGenDate: string | Date;
  //   arLinkFile: string;
  //   arLinkFileSize: number;
  //   arLinkCount: number;
  // }>) {
  //   // Convert string date to Date object if needed
  //   const formattedData = {
  //     ...linkData
  //   };
    
  //   if (linkData.arLinkGenDate && typeof linkData.arLinkGenDate === 'string') {
  //     formattedData.arLinkGenDate = new Date(linkData.arLinkGenDate);
  //   }

  //   const [updatedLink] = await this.drizzleService.db.update(links)
  //     .set(formattedData)
  //     .where(eq(links.id, id))
  //     .returning();
  //   return updatedLink;
  // }

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

    try {
      const [newLink] = await this.drizzleService.db
        .insert(links)
        .values(formattedData)
        .returning();
      
      return newLink;
    } catch (error) {
      // Check for PostgreSQL error codes
      if (error.code === '23505') { // Unique violation
        // Extract the constraint name and detail to provide a more specific message
        const field = error.constraint_name?.replace('links_', '').replace('_unique', '') || 'field';
        const detailMsg = error.detail || `A record with this ${field} already exists.`;
        
        throw new ConflictException({
          message: 'Duplicate entry detected',
          detail: detailMsg,
          field: field
        });
      }
      
      // For other errors, rethrow or wrap in InternalServerErrorException
      throw new InternalServerErrorException('An error occurred while creating the link');
    }
  }
  
  // Also add error handling to the update method
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
    const formattedData = { ...linkData };
    
    if (linkData.arLinkGenDate && typeof linkData.arLinkGenDate === 'string') {
      formattedData.arLinkGenDate = new Date(linkData.arLinkGenDate);
    }

    try {
      const [updatedLink] = await this.drizzleService.db.update(links)
        .set(formattedData)
        .where(eq(links.id, id))
        .returning();
      return updatedLink;
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        const field = error.constraint_name?.replace('links_', '').replace('_unique', '') || 'field';
        const detailMsg = error.detail || `A record with this ${field} already exists.`;
        
        throw new ConflictException({
          message: 'Duplicate entry detected',
          detail: detailMsg,
          field: field
        });
      }
      
      throw new InternalServerErrorException('An error occurred while updating the link');
    }
  }


  async remove(id: number) {
    return this.drizzleService.db.delete(links).where(eq(links.id, id));
  }
}