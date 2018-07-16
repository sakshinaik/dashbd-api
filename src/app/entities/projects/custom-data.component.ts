import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "custom-data-form",
  templateUrl: "./custom-data.html",
  styleUrls: ["../entities.css"],
  encapsulation: ViewEncapsulation.None
})
export class CustomDataComponent {
  entityForm: FormGroup;
  label: string;

  constructor(
    public thisDialogRef: MatDialogRef<CustomDataComponent>,
    private fb: FormBuilder
  ) {
    this.initForm();
  }
  initForm() {
    this.entityForm = this.fb.group({
      data: ["", Validators.required]
    });
  }

  submit() {
    if (!this.entityForm.valid) {
      return;
    }
    this.thisDialogRef.close({
      data: this.entityForm.value.data
    });
  }
}
