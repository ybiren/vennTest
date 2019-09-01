export interface Iflickr { 
  photos: IflickrPhotos;
}

export interface IflickrPhotos {
  pages: number;
  photo: IflickrResult[]; 
}

export interface IflickrResult {
  id: string;
  secret: string;
  server: string;
  farm: string;
}


export interface ISavedSearch {
  text: string;
  resultArr: IflickrResult[];
  selected?: boolean;
}
