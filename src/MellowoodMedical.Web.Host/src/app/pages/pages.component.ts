import { Component, OnInit } from '@angular/core';
import {Page} from "@shared/service-proxies/service-proxies";
import {Observable} from "@node_modules/rxjs";
import {ViewChild} from "@node_modules/@angular/core";
import {MatDialog, MatPaginator, MatTableDataSource} from "@node_modules/@angular/material";
import {PageService} from "@app/services/page.service";
import Swal from "sweetalert2";
import {PageCreateComponent} from "@app/pages/page-create/page-create.component";
import {PageEditComponent} from "@app/pages/page-edit/page-edit.component";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  
  selectedPage: Page;
  Pages$: Observable<any>;
  private pages: Page[];

  displayedColumns: string[] = ['id', 'description', 'action'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pageService: PageService, private _dialog: MatDialog) { }

  ngOnInit() {
    this.refresh();

    $(document).on('click', '.editBtn', ($event) => { this.editPage($event); });
    $(document).on('click', '.deleteBtn', ($event) => { this.deletePage($event); });
  }

  deletePage($event) : void
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

        this.pageService.deletePage(id).subscribe(result => {
          this.pageService.clearCache();
          this.refresh();
          swalWithBootstrapButtons.fire(
              'Deleted!',
              'Page has been deleted.',
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

  addPage()
  {
    this.showCreateOrEditPageDialog();
  }

  editPage($event)
  {
    this.selectedPage = new class implements Page {
      pageContent: string;
      action: string;
      description: string;
      id: number;
      title: string;
      isActive: boolean;
    };

    this.selectedPage.id = $event.target.getAttribute('data-editid');
    this.selectedPage.title = $event.target.getAttribute('data-title');
    this.selectedPage.description = $event.target.getAttribute('data-description');
    this.selectedPage.isActive = $event.target.getAttribute('data-outofstock');
   // this.selectedPage.pageContent = $event.target.getAttribute('data-pageContent');

    this.showCreateOrEditPageDialog(this.selectedPage);

  };

  showCreateOrEditPageDialog(page?: any) : void
  {
    let createOrEditPageDialog;
    if (page === undefined || page == null)
    {
      createOrEditPageDialog = this._dialog.open(PageCreateComponent);
    }
    else
    {
      createOrEditPageDialog = this._dialog.open(PageEditComponent, {data: page});
    }

    createOrEditPageDialog.afterClosed().subscribe(result => {

    })
  }

  refresh(): void
  {
    this.Pages$ = this.pageService.getPages();

    this.Pages$.subscribe(result => {
      this.pages = result.result;
      this.pages.forEach((value)  => {
        value.action  =   this.createActionButtons(value);
      });

      this.dataSource = new MatTableDataSource<any>(this.pages);
      this.dataSource.paginator = this.paginator;
    });
  }

  createActionButtons(page: Page) : string
  {
    return "<i class='btn-group' role='group' aria-label='Perform Actions'>" +
        "<button  class='btn btn-warning btn-sm editBtn' name='editBtn' type='button' " +
        " data-editid='" + page.id + "' " +
        " data-title='" + page.title + "' " +
        " data-description='" + page.description + "' " +
        " data-isactive='" + page.isActive + "' " +
        ">Edit" +
        "</button>" +
        "<button type='button' name='Delete' data-delid='" + page.id + "'  class='btn btn-danger btn-sm deleteBtn' " +
        ">Delete" +
        "</button>" +
        "</div>";
  }

}
