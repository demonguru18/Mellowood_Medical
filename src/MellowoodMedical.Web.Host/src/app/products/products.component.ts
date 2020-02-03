import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "@node_modules/rxjs";
import {Product} from "@shared/service-proxies/service-proxies";
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from "@node_modules/@angular/material";
import {CreateProductComponent} from "@app/products/create-product/create-product.component";
import {ProductsServiceService} from "@app/services/products-service.service";
import {EditProductComponent} from "@app/products/edit-product/edit-product.component";
import {PropertyReader} from "@app/interfaces/property-reader";
import Swal from "sweetalert2";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, PropertyReader {

  title: string = 'Products';
  selectedProduct: Product;
  Products$: Observable<any>;
  private products : Product[];

  


  // Interface member 
  public callRefresh<T>() {
    this.refresh();    
  }

  public close<T>()
  {
    
  }

  /*Test*/
  displayedColumns: string[] = ['id', 'name', 'description', 'imageUrl', 'price', 'ratings', 'outOfStock', 'action'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private productServiceService : ProductsServiceService, private _dialog: MatDialog) 
  {
     productServiceService.registerComponent(this);    
  }

  ngOnInit() {
      this.refresh();
    
      $(document).on('click', '.editBtn', ($event) => { this.editProduct($event); });
      $(document).on('click', '.deleteBtn', ($event) => { this.deleteProduct($event); });
  }

  createActionButtons(product: Product) : string
  {
    return "<i class='btn-group' role='group' aria-label='Perform Actions'>" +      
        "<button  class='btn btn-warning btn-sm editBtn' name='editBtn' type='button' " +
        " data-editid='" + product.id + "' " +
        " data-title='" + product.name + "' " +
        " data-description='" + product.description + "' " +
        " data-price='" + product.price + "' " +
        " data-outofstock='" + product.outOfStock + "' " +
        " data-imageurl='" + product.imageUrl + "' " +
        " data-ratings='" + product.ratings + "' " +
        ">Edit" +        
        "</button>" +
        "<button type='button' name='Delete' data-delid='" + product.id + "'  class='btn btn-danger btn-sm deleteBtn' " +
        ">Delete" +       
        "</button>" +
        "</div>";
  }

  addProduct() : void
  {
    this.showCreateOrEditProductDialog();
  }

  deleteProduct($event) : void 
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        let id = $event.target.getAttribute('data-delid');

        this.productServiceService.deleteProduct(id).subscribe(result => {
          this.productServiceService.clearCache();
          this.refresh();
          swalWithBootstrapButtons.fire(
              'Deleted!',
              'Product has been deleted.',
              'success'
          )
        });         
      } else if (         
          result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
            'Cancelled',
            'Process Cancelled)',
            'error'
        )
      }
    })
    
  }

  editProduct($event) 
  {
    this.selectedProduct = new class implements Product {
      action: string;
      description: string;
      id: number;
      imageUrl: string;
      name: string;
      outOfStock: boolean;
      price: number;
      ratings: number;
    };
    
    this.selectedProduct.id = $event.target.getAttribute('data-editid');
    this.selectedProduct.name = $event.target.getAttribute('data-title');
    this.selectedProduct.description = $event.target.getAttribute('data-description');
    this.selectedProduct.imageUrl = $event.target.getAttribute('data-imageurl');
    this.selectedProduct.price = $event.target.getAttribute('data-price');
    this.selectedProduct.ratings = $event.target.getAttribute('data-ratings');
    this.selectedProduct.outOfStock = $event.target.getAttribute('data-outofstock');

    this.showCreateOrEditProductDialog(this.selectedProduct);
    
  };
  

  showCreateOrEditProductDialog(product?: any) : void
  {
    let createOrEditProductDialog;
    if (product === undefined || product == null)
    {
      createOrEditProductDialog = this._dialog.open(CreateProductComponent);
    }
    else
    {
      createOrEditProductDialog = this._dialog.open(EditProductComponent, {data: product});
    }

    createOrEditProductDialog.afterClosed().subscribe(result => {
      
    })
  }
  refresh() : void
  {
    this.Products$ = this.productServiceService.getProducts();
    this.Products$.subscribe(result => {
      this.products = result.result;
      this.products.forEach((value)  => {
        value.action  =   this.createActionButtons(value);
      });

      this.dataSource = new MatTableDataSource<any>(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }
}
