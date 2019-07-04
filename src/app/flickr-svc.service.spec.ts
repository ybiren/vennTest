import { TestBed, inject } from '@angular/core/testing';

import { FlickrSvcService } from './flickr-svc.service';

describe('FlickrSvcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlickrSvcService]
    });
  });

  it('should be created', inject([FlickrSvcService], (service: FlickrSvcService) => {
    expect(service).toBeTruthy();
  }));
});
