import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@node_modules/@angular/forms";
import Swal from "sweetalert2";
import {MatDialogRef} from "@node_modules/@angular/material";
import {AppComponentBase} from "@shared/app-component-base";
import {PageService} from "@app/services/page.service";


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent extends AppComponentBase  implements OnInit  {
    
    insertForm: FormGroup;
    id: FormControl;
    title: FormControl;
    description: FormControl;
    pageContent: FormControl;
    isActive: FormControl;
    action: FormControl;

    constructor(private fb: FormBuilder,
                injector: Injector,
                private _dialogRef: MatDialogRef<CreatePageComponent>,
                private pageService: PageService)
    {
        super(injector);
    }

    ngOnInit() {
        this.title = new FormControl('', [Validators.required, Validators.maxLength(100)]);
        this.description = new FormControl('', [Validators.required]);
        this.pageContent = new FormControl('');

        this.insertForm = this.fb.group(
            {
                'title': this.title,
                'description': this.description,
                'pageContent': this.pageContent,
                'isActive': false
            }
        );
    }

    save(): void
    {
        let newPage = this.insertForm.value;
        this.pageService.insertPage(newPage).subscribe(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Page Added',
                    showConfirmButton: false,
                });
                this.pageService.clearCache();
                this.pageService.component.callRefresh();
                $("#pageDiv").trigger('click');
                this.close(true);
            },
            error => console.log('Could Not Save Error'))
    }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}
