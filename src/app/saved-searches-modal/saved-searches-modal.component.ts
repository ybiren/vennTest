import { Component, OnInit, Input } from '@angular/core';
import { ISavedSearch, IflickrResult } from '../interfaces';
import { NgbActiveModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-saved-searches-modal',
  templateUrl: './saved-searches-modal.component.html',
  styleUrls: ['./saved-searches-modal.component.scss']
})
export class SavedSearchesModalComponent implements OnInit {

  @Input()  savedSearchesArr: ISavedSearch[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  // Filter display of saved searches by user selection
  getSelectedSavedSearches() {
    const resultArr: IflickrResult[] = [];
    // Filter saved searches
    const arr = this.savedSearchesArr.filter((search: ISavedSearch) => search.selected).map(search => search.resultArr);
    // Unite filtered searches to one array
    arr.forEach((item: IflickrResult[]) => resultArr.push(...item));
    this.activeModal.close(resultArr);
  }

}
