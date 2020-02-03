import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@node_modules/@angular/forms";
import {ProductsServiceService} from "@app/services/products-service.service";
import {Inject, Injector, Optional} from "@node_modules/@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@node_modules/@angular/material";
import {Product} from "@shared/service-proxies/service-proxies";
import {PropertyReader} from "@app/interfaces/property-reader";
import {AppComponentBase} from "@shared/app-component-base";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent extends AppComponentBase implements OnInit {

  insertForm: FormGroup;
  id: number;
  name: FormControl;
  description: FormControl;
  imageUrl: FormControl;
  price: FormControl;
  ratings: FormControl;
  outOfStock: FormControl;
  action: FormControl;


  constructor(private fb: FormBuilder,
              injector: Injector,
              private productService: ProductsServiceService,
              private _dialogRef: MatDialogRef<EditProductComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) private _selectedProduct: Product, ) {
              super(injector);

  }

  ngOnInit() {   
    this.id = this._selectedProduct.id;
    this.name = new FormControl(this._selectedProduct.name, [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl(this._selectedProduct.price, [Validators.required, Validators.min(0), Validators.max(1000)]);
    this.description = new FormControl(this._selectedProduct.description, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]);
    this.imageUrl = new FormControl(this._selectedProduct.imageUrl, [Validators.required]);
    this.outOfStock = new FormControl(this._selectedProduct.outOfStock);
    this.ratings = new FormControl(this._selectedProduct.ratings);

    this.insertForm = this.fb.group(
        {
          'id' : this.id,
          'name': this.name,
          'price': this.price,
          'description': this.description,
          'imageUrl': this.imageUrl,
          'outOfStock': false,
          'ratings': this.ratings
        }
    );
  }

  save(): void
  {
    if (this.findInvalidControls().length > 0) 
    {
      
    }
    else 
      {
        let editProduct = this.insertForm.value;
      
        this.productService.editProduct(editProduct).subscribe(() => {
              Swal.fire({
                icon: 'success',
                title: 'Product Edited Successfully',
                showConfirmButton: false,
              });
          this.productService.clearCache();
          this.productService.component.callRefresh();
          $("#productDiv").trigger('click');
          this.close(true)
        },
        error => console.log('Could Not Update Error'))
      }
    
    
  }
  
  close(result: any): void {
    this._dialogRef.close(result);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.insertForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
