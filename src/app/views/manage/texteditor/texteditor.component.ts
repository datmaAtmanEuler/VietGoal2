import { Component, OnInit, ViewChild } from '@angular/core';

@Component({    
  selector: 'app-text-editor',    
  templateUrl: './texteditor.component.html',    
  styleUrls: ['./texteditor.component.scss']    
})    
export class TextEditorComponent implements OnInit {   
  ckeConfig: any;
  content: string = '';
  @ViewChild('myckeditor', {static: false}) ckeditor: any;

  constructor() {
  }

  ngOnInit() {
    this.content = '<p>Test</p>';
    
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }

  onChange($event: any): void {
    console.log($event);
  }

  onPaste($event: any): void {
    console.log($event);
  }
}  