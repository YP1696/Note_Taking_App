import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private micData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  sendMicData(data: string): void {
    this.micData.next(data);
    console.log(this.micData);
  }

  getMicData(): BehaviorSubject<string> {
    return this.micData;
  }
}
