import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {
  @Input('By') By: null | number = null;
  @Output() success: EventEmitter<any> = new EventEmitter();

  constructor(private uploadService: UploadService) { }
 
 onFilesAdded(fileInput) {
   this.uploadService.UpdateBy(this.By);

    const files: FileList = fileInput.target.files;
    if (files.length <= 0)
      return;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.uploadService.addToQueue(files[key]);
      }
    }

    this.uploadService.done.subscribe((fileUpload: any) => {
        this.success.emit(fileUpload);
    });
  }

  ngOnDestroy() {
    this.success.complete();
  }
}