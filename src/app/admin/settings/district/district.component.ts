import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DistrictService } from './district.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  District } from './district.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddDistrictFormComponent } from './add/add-form/add-form.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from './../../../shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';

@Component({
  selector: 'app-districct',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss'],
})
export class  DistrictComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'code',
    'name',
    'country_name',
    'state_name',
    'status',
    'actions',
  ];
  exampleDatabase?:  DistrictService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<District>(true, []);
  id?: number;
  district?: District;
  breadscrums = [
    {
      title: 'All District',
      items: [' District'],
      active: 'All',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public districtService:  DistrictService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddDistrictFormComponent, {
      data: {
        district: this.district,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        if(this.districtService.failureCode === 0){
        this.exampleDatabase?.dataChange.value.push(
          {...this.districtService.getDialogData(), status: 1}
        );
        /* this.exampleDatabase?.dataChange.value.unshift(
           {...this.countryService.getDialogData(), status: 1}
         );*/
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add District Successfully...!!!',
          'top',
          'center'
        );
      }
      else{
        this.showNotification(
          'snackbar-danger',
          'Same district code already inserted...!!!',
          'top',
          'center'
        );
      }
    }
    });
  }
  editCall(row: District) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddDistrictFormComponent, {
      data: {
        district: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)

        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.districtService.getDialogData();
          // And lastly refresh table

          this.refreshTable();
          this.showNotification(
            'snackbar-success',
            'Edit District Successfully...!!!',
            'top',
            'center'
          );
        }
      }
    });
  }

  deleteItem(row: District) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    /* const dialogRef = this.dialog.open(DeleteDialogComponent, {
       data: row,
       direction: tempDirection,
     });*/
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
      (x) => x.id === this.id
    );
    // for delete we use splice in order to remove single object from DataService
    if (foundIndex != null && this.exampleDatabase) {
      this.districtService.deleteDistrict(this.id);
      this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
      this.showNotification(
        'snackbar-danger',
        'Delete District Successfully...!!!',
        'top',
        'center'
      );
    }
    //   }
    // });
  }

  statusItem(row: District) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    // const dialogRef = this.dialog.open(ConfirmDialog, {
    //   data: row,
    //   direction: tempDirection,
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
      (x) => x.id === this.id
    );
    // for delete we use splice in order to remove single object from DataService
    if (foundIndex != null && this.exampleDatabase) {
      this.districtService.statusDistrict(this.id);
      // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
      this.showNotification(
        'snackbar-info',
        'Status Updated Successfully...!!!',
        'top',
        'center'
      );
    }
    //  }
    // });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      console.log(item.id);
      this.deleteItem(item);
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      // this.exampleDatabase?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<District>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new  DistrictService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'District code' : x.code,
        'Districct Name': x.name,
        'Country' : x.country,
        'State' : x.state,
        'Status': x.status,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item:  District) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
export class ExampleDataSource extends DataSource<District> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData:  District[] = [];
  renderedData:  District[] = [];
  constructor(
    public exampleDatabase:  DistrictService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<District[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getDistrict();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((district:  District) => {
            const searchStr = (
              district.code +
              district.name +
              district.country_name +
              district.state_name +
              district.status
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    // disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: District[]):  District[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'code':
          [propertyA, propertyB] = [a.code, b.code];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'country_name':
          [propertyA, propertyB] = [a.country_name, b.country_name];
          break;
        case 'state_name':
          [propertyA, propertyB] = [a.state_name, b.state_name];
          break;
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
