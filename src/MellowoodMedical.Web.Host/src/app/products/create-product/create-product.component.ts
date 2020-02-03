import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@node_modules/@angular/forms";
import {ProductsServiceService} from "@app/services/products-service.service";
import Swal from "sweetalert2";
import {MatDialogRef} from "@node_modules/@angular/material";
import {AppComponentBase} from "@shared/app-component-base";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent extends AppComponentBase  implements OnInit  {
  insertForm: FormGroup;
  id: FormControl;
  name: FormControl;
  description: FormControl;
  imageUrl: FormControl;
  price: FormControl;
  ratings: FormControl;
  outOfStock: FormControl;
  action: FormControl;
  
  constructor(private fb: FormBuilder,
              injector: Injector,
              private _dialogRef: MatDialogRef<CreateProductComponent>,
              private productService: ProductsServiceService) {
        super(injector);
  }

  ngOnInit() {
    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.description = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]);
    this.imageUrl = new FormControl('', [Validators.required]);
    this.ratings = new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]);

    this.insertForm = this.fb.group(
        {
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
    let newProduct = this.insertForm.value;
    this.productService.insertProduct(newProduct).subscribe(() => {            
            Swal.fire({
                icon: 'success',
                title: 'Product Added',
                showConfirmButton: false,
            });
            this.productService.clearCache();            
            this.productService.component.callRefresh();
            $("#productDiv").trigger('click');
            this.close(true);
        },
        error => console.log('Could Not Save Error'))
  }

    close(result: any): void {
        this._dialogRef.close(result);
    }
}
