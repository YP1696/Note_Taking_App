import { Component, ViewChild } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // htmlText = '<p>Testing</p>';
  // hasFocus = false;
  // subject!: string;

  // atValues = [
  //   { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
  //   { id: 2, value: 'Patrik Sjölin' },
  // ];
  // hashValues = [
  //   { id: 3, value: 'Fredrik Sundqvist 2' },
  //   { id: 4, value: 'Patrik Sjölin 2' },
  // ];

  // quillConfig = {
  //   //toolbar: '.toolbar',
  //   toolbar: {
  //     container: [
  //       ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  //       ['code-block'],
  //       ['gallery'],
  //       [{ header: 1 }, { header: 2 }], // custom button values
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //       //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  //       //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  //       //[{ 'direction': 'rtl' }],                         // text direction

  //       //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //       //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //       //[{ 'font': [] }],
  //       //[{ 'align': [] }],

  //       ['clean'], // remove formatting button

  //       ['link'],
  //       //['link', 'image', 'video']
  //     ],
  //   },

  //   mention: {},
  // };

  // constructor() {}

  // test = (event : any) => {
  //   console.log(event.keyCode);
  // };

  // onSelectionChanged = (event : any) => {
  //   if (event.oldRange == null) {
  //     this.onFocus();
  //   }
  //   if (event.range == null) {
  //     this.onBlur();
  //   }
  // };

  // onContentChanged = (event :any) => {
  //   //console.log(event.html);
  // };

  // onFocus = () => {
  //   console.log('On Focus');
  // };
  // onBlur = () => {
  //   console.log('Blurred');
  // };
  @ViewChild('editor') editor: any;

  title : any;
  content : any ;

  quillConfig = {
    placeholder: 'Enter your title...',
  };

  modules = {
    toolbar: [      
      [{ header: [1, 2, 3 , 4, 5] }],
      ['bold', 'italic', 'underline'], 
      ['image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'font': ['Monospaced font','Arial','Verdana'] }],
      [{ 'color': [] }],
    ]
  };

  logChange($event: any) {
    console.log(this.editor);
    console.log($event);
  }
  
}
