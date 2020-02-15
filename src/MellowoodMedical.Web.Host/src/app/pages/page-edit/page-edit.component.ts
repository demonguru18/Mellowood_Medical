import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@node_modules/@angular/forms";
import {Inject, Injector, Optional} from "@node_modules/@angular/core";
import {ProductsServiceService} from "@app/services/products-service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@node_modules/@angular/material";
import {Page, Product} from "@shared/service-proxies/service-proxies";
import {PageService} from "@app/services/page.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  insertForm: FormGroup;
  id: number;
  title: FormControl;
  description: FormControl;
  pageContent: FormControl; 
  isActive: FormControl;
  action: FormControl;
  page: string;
  
  
  constructor(private fb: FormBuilder,
              injector: Injector,
              private pageService: PageService,
              private _dialogRef: MatDialogRef<PageEditComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) private _selectedPage: Page) { }

  ngOnInit() {
    this.id = this._selectedPage.id;
    
    this.title = new FormControl(this._selectedPage.title, [Validators.required, Validators.maxLength(50)]);
    this.description = new FormControl(this._selectedPage.description, [Validators.required, Validators.maxLength(150)]);
    this.pageContent = new FormControl(this._selectedPage.pageContent);
    this.isActive = new FormControl(this._selectedPage.isActive);
    
    
   
    
    this.insertForm = this.fb.group(
        {
          'id' : this.id,
          'title': this.title,
          'description': this.description,
          'pageContent': this.pageContent,
          'isActive': this.isActive          
        }
    );

    this.loadWsygEditor();
    this.getPageContent(this._selectedPage.id);
  }
  
  getPageContent(id: number) 
  {
    this.pageService.getPageContent(id).subscribe(result => {
      this._selectedPage.pageContent = result.result;
      this.page = result.result;
      $('#pageContent').summernote('codeview.activate');
      $('#pageContent').summernote('code', this.page);
      $('#pageContent').summernote('codeview.deactivate');     
    }, error => {
      this._selectedPage.pageContent = null;
    }); 
    
  }

  save(): void 
  {
    let editPage = this.insertForm.value;
    const markup = $('#pageContent').summernote('code');
    console.log(this.insertForm.value);
    this.insertForm.controls['pageContent'].setValue(markup);
    console.log(this.insertForm.value);
    this.pageService.editPage(editPage).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Page Edited Successfully',
        showConfirmButton: false,
      });
      this.pageService.clearCache();
      this.pageService.component.callRefresh();
      $("#pageDiv").trigger('click');
      this.close(true)},
        error =>
        {
          console.log('attempt 2');
          this.pageService.editPage(editPage).subscribe(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Page Edited Successfully',
                  showConfirmButton: false,
                });
                this.pageService.clearCache();
                this.pageService.component.callRefresh();
                $("#pageDiv").trigger('click');
                this.close(true)},
              error =>
              {

                console.log('Could Not Update Error')
              });
          
          console.log('Could Not Update Error')
        })
           
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

  
  loadWsygEditor() 
  {
    $('#pageContent').summernote({
      placeholder: 'Add Page Contetnt',
      tabsize: 2,
      height: 400,
    });
   
  }

}
