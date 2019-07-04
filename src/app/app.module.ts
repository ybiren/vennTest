import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlickrSearchComponent } from './flickr-search/flickr-search.component';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    FlickrSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
