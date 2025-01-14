export interface ItineraryUpdate {
  timeTravel: string;
  title: string;
  content: string;
  images: Image[];
  id: number;
}
export interface Image {
  url: string;
  caption: string;
  publicId: number;
  id: number;
}
