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

  getSelectedSavedSearches() {
    const resultArr: IflickrResult[] = [];
    const arr = this.savedSearchesArr.filter(obj => obj.selected).map(obj => obj.resultArr);
    arr.forEach((obj: IflickrResult[]) => resultArr.push(...obj));
    this.activeModal.close(resultArr);
  }

}
