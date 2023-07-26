import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  // @Output() colorSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedColor!: string;
  constructor() { }
  public arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
    Yellow: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  
  

  ngOnInit(): void {
  }

  // onColorSelect(color : string){
  //   this.colorSelected.emit(color);
  // }


  changeCardColor(color: string) {
    this.selectedColor = color;
    console.log(this.selectedColor);
  }

  getColorArray(obj: any) {
    return Object.keys(obj).map(key => ({
      colorName: key,
      hexValue: obj[key]
    }));
  }

}
