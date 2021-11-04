export interface ArtWork {
  title: string;
  caption: string;
  price: number;
  urls: ImageUrls;
  filepaths: string[];
  listPosition: number;
  id?: string;
}

export interface ImageUrls {
  _original: string;
  _200x200: string;
  _320x320: string;
  _430x430: string;
  _640x640: string;
  _1440x1440: string;
}