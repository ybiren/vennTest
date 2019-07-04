import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlickrSearchComponent } from './flickr-search/flickr-search.component';
import { HttpModule } from '@angular/http';
import { SavedSearchesModalComponent } from './saved-searches-modal/saved-searches-modal.component';
import { NgbModalModule } from '../../node_modules/@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    FlickrSearchComponent,
    SavedSearchesModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SavedSearchesModalComponent
  ]
})
export class AppModule { }
