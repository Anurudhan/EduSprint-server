export enum BannerStatus {
    Scheduled = 'Scheduled',
    Active = 'Active',
    Expired = 'Expired',
  }

export interface BannerEntity {
  _id?: string;
  title: string;
  imageUrl : string ;
  status?: BannerStatus;
  startDate?: string;
  endDate?: string;
}