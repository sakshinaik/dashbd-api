import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIService } from './api.service';
import * as config from "../config/api";


@Injectable()
export class DownloaderService {
  constructor(
      private api:APIService,
    private http: HttpClient) { }

  getTextFile() {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    console.log("testing");

    this.api.get(config.api.download)
    .subscribe(res => {
        console.log(res);
        var blob = new Blob([res], { type: 'text/csv' });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
      },
      e =>{

        console.log("rror========");
        console.log(e);
        return e;
      })

   /* return this.http.get(filename, {responseType: 'text'})
      .pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
      */
  }

  private log(filename: string, data: string) {
    const message = `DownloaderService downloaded "${filename}" and got "${data}".`;
    console.log(message);
  }

  private logError(filename: string, error: any) {
    const message = `DownloaderService failed to download "${filename}"; got error "${error.message}".`;
    console.error(message);
    console.log(message);
  }
}
