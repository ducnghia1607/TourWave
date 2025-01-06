export interface Review {
  id: number;
  tourId: number;
  appUserId: number;
  description: string;
  rating: number;
  createdAt: Date;
}
