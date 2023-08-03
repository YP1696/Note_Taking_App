import { Component, Inject, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';
import { BackgroundService } from '../services/background.service';

@Component({
  selector: 'app-mic',
  templateUrl: './mic.component.html',
  styleUrls: ['./mic.component.scss'],
})
export class MicComponent implements OnInit {
  selectedData!: 'Note';
  storedData: any[] = [];
  text = '';
  isMicrophoneMuted: boolean = true;
  selectedColor: string = '';
  updatedContent: string = '';
  isEditMode: boolean = false;

  colorData: any[] = [
    { value: 'rgb(172 165 217)', name: 'Lavender Mist' },
    { value: 'rgb(255,245,0)', name: 'Yellow' },
    { value: 'rgb(236,64,64)', name: 'Crimson' },
    { value: 'rgb(139 134 136)', name: 'Slate Gray' },
    { value: '#FFB7B2', name: 'Pink'},
    { value: '#C7CEEA', name: 'Pale Cornflower Blue'},
    { value: '#FFDAC1', name: 'Peachy Nude'},
  ];
  selectedIndex: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MicComponent>,
    public service: VoiceRecognitionService,
    private Dialog: MatDialog,
    private DataSharing: DataSharingService,
    private backgroundColor: BackgroundService
  ) {
    this.service.init();
    this.selectedData = data.item;
    this.updatedContent = this.data.content;
  }
  toggleMicrophone(): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.update();
    } else {
      this.save();
    }
  }
  toggleButton(): void {
    this.isMicrophoneMuted = !this.isMicrophoneMuted;

    if (this.isMicrophoneMuted) {
      this.stopService();
    } else {
      this.startService();
    }
  }

  onColorSelected(): void {
    this.backgroundColor.setSelectedColor(this.selectedColor);
  }
  ngOnInit(): void {
    this.service.text = this.data.item.micData
    this.selectedColor = this.data.item.color
    this.selectedIndex = this.data.index
    console.log(this.selectedIndex);
    console.log(this.data);
    const storedData = localStorage.getItem('micData');
    this.data = storedData ? JSON.parse(storedData) : [];
    // if (this.data && this.data.item && this.data.index !== undefined) {
    //   this.isEditMode = true;
    //   this.updatedContent = this.data.item.content;
    // }
    this.isEditMode = this.data?.isEdited || false;

  }
  services = {
    text: localStorage.getItem('editorContent'),
  };

  startService() {
    this.service.start();
  }

  stopService() {
    this.service.stop();
    let micData = this.service.text;
    localStorage.setItem('editorContent', micData);
    this.DataSharing.sendMicData(micData);
    console.log(micData);
  }

  save(): void {
    const micData = this.service.text;
    const selectedColor = this.selectedColor;
    const index = this.selectedIndex;
    console.log(index);
    this.backgroundColor.setSelectedColor(this.selectedColor);

    const storedData = localStorage.getItem('micData');
    let data = storedData ? JSON.parse(storedData) : [];
    const newDataItem = {
      micData: micData,
      color: selectedColor,
      index : index,
    };

    if (this.selectedData) {
      const index = data.findIndex((item: any) => item.micData === this.selectedData);

      if (index !== -1) {
        data[index].micData = micData;
        console.log('micData: ', micData);
        data[index].color = selectedColor;
      }
    } else {
      data.push(newDataItem);
    }

    localStorage.setItem('micData', JSON.stringify(data));
    const updatedData = { ...this.data, content: micData };
    console.log(updatedData);
    this.dialogRef.close(updatedData);
    this.service.text = '';
    // this.selectedData = null;
    this.data = [...data];
    this.service.stop();
    // location.reload();
  }
  update(){
    this.dialogRef.close(this.updatedContent);
  }
}
