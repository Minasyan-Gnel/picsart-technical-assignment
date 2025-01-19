export interface Photo {
  id: number;
  url: string;
  width: number;
  height: number;
  liked: boolean;
  alt: string | null;
  photographer: string;
  photographer_id: string;
  photographer_url: string;
  avg_color: string | null;
  src: {
    tiny: string;
    large: string;
    small: string;
    medium: string;
    large2x: string;
    original: string;
    portrait: string;
    landscape: string;
  };
}

export interface PhotoWithTop extends Photo {
  top: number;
}