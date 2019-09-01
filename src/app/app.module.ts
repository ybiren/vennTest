import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlickrSearchComponent } from './flickr-search/flickr-search.component';
import { SavedSearchesModalComponent } from './saved-searches-modal/saved-searches-modal.component';
import { NgbModalModule } from '../../node_modules/@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { FlickrSvcService } from '../app/flickr-svc.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FlickrSearchComponent,
    SavedSearchesModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    InfiniteScrollModule,
    FormsModule
  ],
  providers: [FlickrSvcService],
  bootstrap: [AppComponent],
  entryComponents: [
    SavedSearchesModalComponent
  ]
})
export class AppModule { }
