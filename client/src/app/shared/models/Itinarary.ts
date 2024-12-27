export interface Itinerary {
  timeTravel: string;
  title: string;
  content: string;
  images: Image[];
}
export interface Image {
  url: string;
  caption: string;
}
