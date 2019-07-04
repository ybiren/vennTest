export interface IflickrResult {
  id: string;
  secret: string;
  server: string;
  farm: string;
}


export interface ISavedSearch {
  text: string;
  resultArr: IflickrResult[];
}
