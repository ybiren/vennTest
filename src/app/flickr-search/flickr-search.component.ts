import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { IflickrResult, ISavedSearch } from '../interfaces';
import { SavedSearchesModalComponent } from '../saved-searches-modal/saved-searches-modal.component';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.scss']
})
export class FlickrSearchComponent implements OnInit {

  private flickrResultArr: IflickrResult[] = [];
  private flickrSavedResultArr: IflickrResult[] = [];
  private page: number;
  private totalpages: number;
  private text: string;
  private isDisplaySavedMode = false;
  private numPhotosPerPage = 100;

  constructor(private http: Http, private modalService: NgbModal) { }

  ngOnInit() {
  }

  public getPhotos() {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${this.text}&page=${this.page}`;
    this.http.get(url).subscribe((res) => {
      this.totalpages = res.json().photos.pages;
      const resultsForPage = <IflickrResult[]>res.json().photos.photo;
      this.flickrResultArr.push(...resultsForPage);
    }, (error) => {
      //to do
    });
  }

  private getSavedPhotos() {
    if (this.flickrSavedResultArr.length) {
       this.flickrResultArr.push(...this.flickrSavedResultArr.splice(0, this.numPhotosPerPage));
    }
  }

  public doRequest(text: string) {
    this.page = 1;
    this.text = text;
    this.flickrResultArr = [];
    this.isDisplaySavedMode = false;
    this.getPhotos();
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
    const modalRef = this.modalService.open(SavedSearchesModalComponent, {centered: true, backdrop: 'static'});
    modalRef.componentInstance.savedSearchesArr = this.getSavedSearches();
    modalRef.result.then((resultArr: IflickrResult[]) => {
      this.flickrResultArr = [];
      this.flickrSavedResultArr = resultArr;
      this.isDisplaySavedMode = true;
      this.getSavedPhotos();
    });
  }

  onScroll() {
    if(!this.isDisplaySavedMode) {
      if (this.page < this.totalpages) {
        this.page = this.page + 1;
        this.getPhotos();
      }
    } else {
      this.getSavedPhotos();
    }
  }

}
