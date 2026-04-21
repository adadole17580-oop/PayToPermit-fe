import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload',
  imports: [ RouterModule, CommonModule ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @Output() close = new EventEmitter<void>();
  @Output() upload = new EventEmitter<File>();
  
  displayFileName: string = '';

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.displayFileName = this.selectedFile.name;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
      if (this.selectedFile) {
        this.displayFileName = this.selectedFile.name;
      }
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.upload.emit(this.selectedFile);
    }
  }
}