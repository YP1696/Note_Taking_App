import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  constructor() { }

  private selectedColorSubject = new BehaviorSubject<string>('');
  selectedColor$ = this.selectedColorSubject.asObservable();

  setSelectedColor(color: string): void {
    this.selectedColorSubject.next(color);
  }

  
}
