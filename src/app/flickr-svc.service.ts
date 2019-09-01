import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ISavedSearch, IflickrResult, Iflickr } from './interfaces';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlickrSvcService {

  constructor(private http: HttpClient) { }

  private flickrBaseUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&
                           format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1`;

 
  public GetTotalPages(text: string): Observable<number> {
    const flickrUrl = `${this.flickrBaseUrl}&text=${text}`;
    return this.http.get<Iflickr>(flickrUrl).pipe(map(x=>x.photos.pages));
  }
 
                           // Given text for search & page number ,excecutes http request to flickr
  public GetPhotos(text: string, page: number): Observable<Iflickr> {
    const flickrUrl = `${this.flickrBaseUrl}&text=${text}&page=${page}`;
    return this.http.get<Iflickr>(flickrUrl);
    //.pipe(map(x => { 'photos': { 'pages': x.photos.pages, 'photo': flickrResultArr.push(...x.photos.photo) } }
      //))
  }

  
  public GetTotalPagesAndPhotoesForFirstPage(
     flickrResultTotalPagesObs: Observable<number>, 
     flickrResultObs: Observable<Iflickr>): Observable<[number, Iflickr]>{
     return forkJoin(flickrResultTotalPagesObs, flickrResultObs);
  }

  //save searches in local storage
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
