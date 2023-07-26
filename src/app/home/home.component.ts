import { Component, OnInit } from '@angular/core';
import { MicComponent } from '../mic/mic.component';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingComponent } from '../setting/setting.component';
import { EditComponent } from '../edit/edit.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private ngUnsubscribe = new Subject(); 
  storedData : any[] = [];
  micData: any;
  filteredData: any[] = [];
  value : any;
  selectedData: any = null;
  selectedColor: string = '';

  constructor( private Dialog : MatDialog , private DataSharing : DataSharingService, private sanitizer : DomSanitizer) {
    const localStorageData = localStorage.getItem('micData');
    if (localStorageData) {
      this.storedData = JSON.parse(localStorageData);
    }
   }
   colorData: any[] = [
    { value: 'rgb(172 165 217)', name: 'SkyBlue' },
    { value: 'rgb(251 246 251', name: 'White' },
    { value: 'rgb(255,245,0)', name: 'Yellow' },
    { value: 'rgb(236,64,64)', name: 'Pink' },
    { value: 'rgb(139 134 136)', name: 'grey' }
  ];

  ngOnInit(): void {
    this.filteredData = [...this.storedData];
    this.DataSharing.getMicData()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.micData = data;
        this.updateStoredData();
      });

  }

  updateStoredData(): void {
    const localStorageData = localStorage.getItem('micData');
    if (localStorageData) {
      this.storedData = JSON.parse(localStorageData);
      // this.filterData();

    }
  }

  openAddNoteDialog(): void {
    const dialogRef = this.Dialog.open(MicComponent, {
      width: '500px',
      data: {} 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  openSettingDialog(){
    const dialogRef = this.Dialog.open(SettingComponent, {
      width: '500px',
      data: {} 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  filterData(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchValue = searchInput.value.toLowerCase();
    this.filteredData = this.storedData.filter(item => {
      if (item && typeof item.toString === 'function') {
        const stringValue = item.toString().toLowerCase();
        return stringValue.includes(searchValue);
      }
      return false;
    });
  
    console.log(this.filteredData);
  }
  
  editNote(item: any): void {
    const dialogRef = this.Dialog.open(EditComponent, {
      width: '500px',
      data: item
    });

    dialogRef.afterClosed().subscribe((updatedData: any) => {
      if (updatedData) {
        const index = this.filteredData.indexOf(item);
        if (index !== -1) {
          this.filteredData[index] = updatedData;
          localStorage.setItem('micData', JSON.stringify(this.filteredData));
        }
      }
    });
  }

  openData(item: any): void {
    this.selectedData = item;
    const dialogRef = this.Dialog.open(EditComponent, {
      width: '500px',
      data: this.selectedData
    });

    dialogRef.afterClosed().subscribe(updateData => {

      if(updateData){
        const index = this.storedData.indexOf(this.selectedData);

        if(this.selectedData !== -1){
          this.storedData[index] = updateData;
          localStorage.setItem('micData', JSON.stringify(this.storedData));

        }
      }

    });
  }

  
  deleteNote(item: any): void {
    const index = this.filteredData.indexOf(item);
    if (index !== -1) {
      this.filteredData.splice(index, 1);
      localStorage.setItem('micData', JSON.stringify(this.filteredData));
    }
  }
}
