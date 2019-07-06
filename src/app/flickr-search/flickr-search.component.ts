import { Component, OnInit } from '@angular/core';
import { IflickrResult, ISavedSearch } from '../interfaces';
import { SavedSearchesModalComponent } from '../saved-searches-modal/saved-searches-modal.component';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FlickrSvcService } from '../flickr-svc.service';

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.scss']
})
export class FlickrSearchComponent implements OnInit {

  private flickrResultArr: IflickrResult[] = [];  // Contains the results of flickr query
  private flickrSavedResultArr: IflickrResult[] = []; // contains saved results
  private page: number; // Keeps the current page
  private totalpages: number; // Number of results total pages
  private text: string;  // Search text
  private isDisplaySavedMode = false; // Indicates if gallery contains online results or saved results
  private numPhotosPerPage = 100; // Used for saved results
  private localStorageKey = 'flickr_saved';

  public displaySuccessAlert = false;
  public displayErrorAlert = false;

  constructor(private modalService: NgbModal,
    private flickrSvc: FlickrSvcService) { }

  ngOnInit() {
  }

  // Get photos from flickr by text and page
  public getPhotos() {
    this.flickrSvc.GetPhotos(this.text, this.page).subscribe((res) => {
      this.totalpages = res.json().photos.pages;
      const resultsForPage = <IflickrResult[]>res.json().photos.photo;
      this.flickrResultArr.push(...resultsForPage);
    }, (error) => {
      this.displayErrorAlert = true;
    });
  }

  // Get nrxt numPhotosPerPage=100 from saved photos array
  private getSavedPhotos() {
    if (this.flickrSavedResultArr.length) {
       this.flickrResultArr.push(...this.flickrSavedResultArr.splice(0, this.numPhotosPerPage));
    }
  }

  // Get first page of photos for searched text
  public doRequest(text: string) {
    this.page = 1;
    this.text = text;
    this.flickrResultArr = [];
    this.isDisplaySavedMode = false;
    this.getPhotos();
  }

  // photo url - https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  public photoUrl(flickrResult: IflickrResult) {
    return `https://farm${flickrResult.farm}.staticflickr.com/${flickrResult.server}/${flickrResult.id}_${flickrResult.secret}.jpg`;
  }

  // Save search by adding its results to local storage
  public saveSearch(text: string) {
    if (this.flickrResultArr.length) {
      this.flickrSvc.SaveSearch(this.localStorageKey, text, this.flickrResultArr);
      this.displaySuccessAlert = true;
      setTimeout(() => {this.displaySuccessAlert = false;
      } , 3000);
    }
  }

  // Get saved searches from local storage
  public getSavedSearches(): ISavedSearch[] {
    return this.flickrSvc.GetSavedSearches(this.localStorageKey);
  }

  // Open saved searches modal dialog
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

  // Called when load more photos is needed according to infinite scroll position
  onScroll() {
    if (!this.isDisplaySavedMode) {
      if (this.page < this.totalpages) { // Get next page of photos
        this.page = this.page + 1;
        this.getPhotos();
      }
    } else { // Get next page of saved photos
      this.getSavedPhotos();
    }
  }

}
