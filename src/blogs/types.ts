import { Types } from 'mongoose';

export class BlogInputDTO {
  constructor(
    public name: string,
    public websiteUrl: string,
    public description: string,
  ) {}
}

export class BlogViewDTO {
  constructor(
    public id: Types.ObjectId,
    public name: string,
    public websiteUrl: string,
    public description: string,
    public createdAt: string,
    public isMembership: boolean,
  ) {}
}
