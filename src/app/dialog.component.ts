/**
 * Created by s.naik on 7/14/17.
 */

import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
    selector: 'confirm-dialog',
    template: `
    <mat-card tabindex="0" class="alert-mat-card">
    <mat-card-header *ngIf="dialogType != 'loader' && dialogType != 'popup'">
        <span class="space-fill"></span>
        <a (click)="dialogRef.close(false)">
            <mat-icon class="material-icons pointer" mdTooltip="close">close</mat-icon>
        </a>

    </mat-card-header>
    <mat-card-content>
        <div [ngClass]="{'error-div': dialogType == 'error'}">
            <span class="float-left"  *ngIf="icon" >
            <mat-icon class="material-icons" aria-hidden="true" [ngClass]="{'action-btn': dialogType == 'popup' && icon != 'warning', 'grey-text': dialogType == 'loader', 'error-text': icon == 'warning'}">{{icon}}
            </mat-icon> &nbsp;
            </span>
            <span [ngClass]="{'float-left': icon}" [innerHTML]="message" >
            </span>
            <br style="clear: left" />
            
        </div>
        <div *ngIf="dialogType == 'popup'" align="center">
            <a (click)="dialogRef.close()" class="link-text">close</a>

        </div>
        <div *ngIf="dialogType == 'loader'">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </div>
        <div *ngIf="dialogType == 'confirm'">
            <button mat-button [mat-dialog-close]="true">{{btnOkTxt}}
            </button>
            <button mat-button type="button" mat-dialog-close>{{btnCancelTxt}}
            </button>
        </div>
    </mat-card-content>
</mat-card>`,
    styles: [".mat-dialog-container { padding: 0; min-width: 400px;} .mat-card-header-text{ margin: 0 }"],
    encapsulation: ViewEncapsulation.None

})
export class DialogComponent {

    public message: string;
    public dialogType: string;
    public icon: string;

    public btnOkTxt: string;
    public btnCancelTxt: string;

    public constructor(public dialogRef: MatDialogRef<DialogComponent>) {
    }


}