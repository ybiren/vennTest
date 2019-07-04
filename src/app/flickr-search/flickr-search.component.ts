import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { IflickrResult, ISavedSearch } from '../interfaces';

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.scss']
})
export class FlickrSearchComponent implements OnInit {

  private flickrResultArr: IflickrResult[] = [];
  constructor(private http: Http) { }

  ngOnInit() {
  }

  public doRequest(text: string) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=obama&text=${text}`;
    this.http.get(url).subscribe((res) => {
      this.flickrResultArr = <IflickrResult[]>res.json().photos.photo;
    }, (error) => {
      //to do
    });
  }

  public imgUrl(flickrResult: IflickrResult) {
    return `https://farm${flickrResult.farm}.staticflickr.com/${flickrResult.server}/${flickrResult.id}_${flickrResult.secret}.jpg`;
  }

  public saveSearch(text: string) {

    if (this.flickrResultArr.length) {
      const search: ISavedSearch = {text: text, resultArr: this.flickrResultArr};
      const savedSearchesArr: ISavedSearch[] = this.getSavedSearches();
      savedSearchesArr.push(search);
      localStorage.setItem('flickr_saved1', JSON.stringify(savedSearchesArr));
    }
  }

  public getSavedSearches(): ISavedSearch[] {

    let savedSearchesArr: ISavedSearch[] = [];
    const savedSearchesStr = localStorage.getItem('flickr_saved1');
    if (savedSearchesStr) {
      savedSearchesArr = <ISavedSearch[]>JSON.parse(savedSearchesStr);
    }
    return savedSearchesArr;
  }

  public openSavedSearches() {
    alert(this.getSavedSearches().length);
  }

}
