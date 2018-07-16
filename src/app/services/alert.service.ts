/**
 * Created by s.naik on 7/17/17.
 */
import {Observable} from 'rxjs/Rx';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Injectable} from '@angular/core';
import {DialogComponent} from "../dialog.component";

@Injectable()
export class AlertService {

    constructor(private dialog: MatDialog) {
    }

    public throw(message: string, showIcon: boolean = null): Observable<boolean> {
        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.dialogType = 'error';
        dialogRef.componentInstance.icon = showIcon ? 'error' : null;

        return dialogRef.afterClosed();
    }

    public confirm(message: string, btnOkTxt: string = 'Ok', btnCancelTxt: string = 'Cancel'): Observable<boolean> {

        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.dialogType = 'confirm';
        dialogRef.componentInstance.btnOkTxt = btnOkTxt;
        dialogRef.componentInstance.btnCancelTxt = btnCancelTxt;

        return dialogRef.afterClosed();
    }

    public popup(message: string, icon: string = null): Observable<boolean> {

        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.dialogType = 'popup';
        dialogRef.componentInstance.icon = icon;

        return dialogRef.afterClosed();

    }

    public loader(message: string, icon: string = null): MatDialogRef<DialogComponent> {

        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent, {disableClose: true});
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.dialogType = 'loader';
        dialogRef.componentInstance.icon = icon;

        return dialogRef;

    }
}