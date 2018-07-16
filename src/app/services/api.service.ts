import { Injectable } from "@angular/core";
import { environment } from "../../environments";
import { HttpClient } from "@angular/common/http";
import { ResponseData } from "../models/models";
import { DialogService } from "./dialog.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";

@Injectable()
export class APIService {
  api = "";
  constructor(
    private http: HttpClient,
  ) {
    this.api = environment.api;
  }
  put(route: string, payload: {}) {
    console.log("Requesting PUT... " + `${this.api}${route}`);

    return this.http
      .put(`${this.api}${route}`, JSON.stringify(payload))
      .map(this.extractData)
      .catch(this.handleError);
  }
  post(route: string, payload: {}) {
    console.log("Requesting POST... " + `${this.api}${route}`);
    console.log(JSON.stringify(payload));

    return this.http
      .post(`${this.api}${route}`, JSON.stringify(payload))
      .map(this.extractData)
      .catch(this.handleError);
  }
  get(route: string) {
    console.log("Requesting GET... " + `${this.api}${route}`);
    return this.http
      .get(`${this.api}${route}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(route: string) {
    console.log("Requesting DELETE... " + `${this.api}${route}`);
    return this.http
      .delete(`${this.api}${route}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res) {
    let r: ResponseData;
    r = <ResponseData>res;
    console.log("HTTP Response:  " + JSON.stringify(res.data));
    return r.data;
  }
  private handleError(errorResponse: Response | any) {
    let err = JSON.stringify(errorResponse);

    if (errorResponse.error && errorResponse.error.hasOwnProperty("message")) {

      err = errorResponse.error.message;

    } else if (errorResponse instanceof Response) {

      const body = errorResponse.json() || "";
      if (!body.hasOwnProperty("error")) {
        err = `${errorResponse.url} <br> ${
          errorResponse.status
        } - ${errorResponse.statusText || ""}`;
      }
    }
    console.log(errorResponse.error.error);
    console.log(errorResponse.error);

    return Observable.throw(err);
  }
}
