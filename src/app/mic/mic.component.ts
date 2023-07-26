import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { MatDialog } from '@angular/material/dialog';
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
  data: string[] = [];
  selectedColor: string = '';
  colorData: any[] = [
    { value: 'rgb(172 165 217)', name: 'SkyBlue' },
    { value: 'rgb(251 246 251', name: 'White' },
    { value: 'rgb(255,245,0)', name: 'Yellow' },
    { value: 'rgb(236,64,64)', name: 'Pink' },
    { value: 'rgb(139 134 136)', name: 'grey' },
  ];

  constructor(
    public service: VoiceRecognitionService,
    private Dialog: MatDialog,
    private DataSharing: DataSharingService,
    private backgroundColor: BackgroundService
  ) {
    this.service.init();
  }
  toggleMicrophone(): void {
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
    const storedData = localStorage.getItem('micData');
    this.data = storedData ? JSON.parse(storedData) : [];
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
    this.backgroundColor.setSelectedColor(this.selectedColor);

    const storedData = localStorage.getItem('micData');
    let data = storedData ? JSON.parse(storedData) : [];

    data.push(micData);

    localStorage.setItem('micData', JSON.stringify(data));
    this.service.text = '';
    this.data = [...data];
    this.service.stop();
    location.reload();
  }
}
