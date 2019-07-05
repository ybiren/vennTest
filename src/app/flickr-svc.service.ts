import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { ISavedSearch, IflickrResult } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class FlickrSvcService {

  constructor(private http: Http) { }

  private flickrBaseUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&
                           format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1`;


  public GetPhotos(text: string, page: number) {
    const flickrUrl = `${this.flickrBaseUrl}&text=${text}&page=${page}`;
    return this.http.get(flickrUrl);
  }

  public SaveSearch(key: string, text: string, flickrResultArr: IflickrResult[]) {
    const search: ISavedSearch = {text: text, resultArr: flickrResultArr};
    const savedSearchesArr: ISavedSearch[] = this.GetSavedSearches(key);
    // Add search to saved searches
    savedSearchesArr.push(search);
    localStorage.setItem(key, JSON.stringify(savedSearchesArr));
  }

  // Get saved searches from local storage
  public GetSavedSearches(key: string): ISavedSearch[] {
    let savedSearchesArr: ISavedSearch[] = [];
    const savedSearchesStr = localStorage.getItem(key);
    if (savedSearchesStr) {
      savedSearchesArr = <ISavedSearch[]>JSON.parse(savedSearchesStr);
    }
    return savedSearchesArr;
  }

}
