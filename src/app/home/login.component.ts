import { Component, ViewEncapsulation } from "@angular/core";
import { User } from "../models/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as app from "../store/actions/app";
import * as config from "../config/api";
import { APIService } from "../services/api.service";
import { AuthGuard } from "../services/auth-guard.service";

@Component({
  selector: "home-page",
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private apiService: APIService,
    private  auth: AuthGuard
  ) {
    this.store.dispatch(new app.SetTitle("Home / Login"));
    this.initForm();
  }
  initForm() {
    if (
      sessionStorage.getItem("username") == "undefined" ||
      sessionStorage.getItem("username") == null
    ) {
      this.loginForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
      });
    } else {
      this.store.dispatch(new app.SetTitle("Home / User Profile"));
      
    }
  }
  login() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(JSON.stringify(this.loginForm.value));
    this.loading = true;
    this.apiService.post(config.api.login, this.loginForm.value).subscribe(
      data => {
       let user = <User>data;

        sessionStorage.setItem("username", user.Username);
        sessionStorage.setItem("userID", `${user.ID}`);
        console.log(sessionStorage.getItem("username"))

        this.store.dispatch(new app.LoadUserSuccess(data));

        this.loginForm = null;
        this.error = null;
        this.loading = false;
      },
      err => {
        this.initForm();
        this.error = "Login Failed: Username not found.";
        this.loading = false;
      }
    );
  }

  logout(): void {

    this.auth.logout();
    this.initForm();
  }
}
