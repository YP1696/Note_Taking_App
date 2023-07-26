import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  updatedContent: string = '';
  selectedData!: string;
  isMicrophoneMuted: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditComponent>,
    public service: VoiceRecognitionService,
    private Dialog: MatDialog,
    private DataSharing: DataSharingService
  ) {
    this.selectedData = data;
    this.updatedContent = this.data.content;
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('micData');
    this.data = storedData ? JSON.parse(storedData) : []; 
  }
  toggleMicrophone(): void {
    this.isMicrophoneMuted = !this.isMicrophoneMuted;

    if (this.isMicrophoneMuted) {
      this.stopService();
    } else {
      this.startService();
    }
  }

  services = {
    text: localStorage.getItem('editorContent')
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
    const micData = this.selectedData;
    const storedData = localStorage.getItem('micData');
    let data = storedData ? JSON.parse(storedData) : [];

    data.push(micData);

    localStorage.setItem('micData', JSON.stringify(data));
    const updatedData = { ...this.data, content: this.updatedContent };
    this.dialogRef.close(this.selectedData);
    console.log(updatedData);
    this.data = [...data];
    // location.reload();
  }

  
}
