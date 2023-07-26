import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  isStopSpeechRecognition = false;
  public text = '';
  tempWords: any;

  constructor() {}

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-UK';
  
    this.recognition.addEventListener('result', (e: any) => {
      const transcript =  Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      this.tempWords = transcript;
      // console.log(transcript);  
    });
  }
  


  // start() {
  //   this.isStopSpeechRecognition = false;
  //   this.recognition.start();
  //   let lastTimestamp = 0 ;
  //   let currentTimeStamp = new Date().getTime();
  //   let timesinceLastTimeStamp = currentTimeStamp - lastTimestamp;
  //   if(timesinceLastTimeStamp > 5000){
  //     this.wordConcat()
  //   }
  
  //   this.recognition.addEventListener('end', () => {
  //     if (this.isStopSpeechRecognition) {
  //       this.recognition.stop();
  //     } else {
  //       this.wordConcat();
  //       this.recognition.start();
  //     }
  //   });
  // }
  start() {
    this.isStopSpeechRecognition = false;
    this.recognition.start();
    let lastPhrase = '';
  
    this.recognition.addEventListener('end', () => {
      if (this.isStopSpeechRecognition) {
        this.recognition.stop();
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }
  

  stop(){
    this.isStopSpeechRecognition = true;
    this.wordConcat();
    this.recognition.stop();
  }

  wordConcat(){
    if(this.tempWords){
      this.text = this.text + ' ' + this.tempWords + ' ';
      this.tempWords = '';
    }
    }
  // wordConcat(): void {
  //   if (this.tempWords.trim() !== '') {
  //     this.text = this.text +' '+ this.tempWords;
  //     this.tempWords = '';
  //   }
  // }
}
