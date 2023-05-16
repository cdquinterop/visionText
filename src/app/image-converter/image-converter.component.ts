import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CloudVisionService } from '../services/cloud-vision.service';
@Component({
  selector: 'app-image-converter',
  templateUrl: './image-converter.component.html',
  styleUrls: ['./image-converter.component.css'],
})
export class ImageConverterComponent {
  selectedFile!: File;
  selectedFileData!: string;
  isDragging = false;
  label = 'Arrastra y suelta o selecciona una imagen';
  data: any;

  constructor(private cloudVisionService: CloudVisionService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.readFile();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.onDragLeave(event);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.readFile();
    }
  }

  readFile() {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFileData = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    this.cloudVisionService.convertirImg(this.selectedFile).subscribe(
      (res) => {
        this.data = res.text;
        // TO DO
        console.log(this.data);
      },
      (err) => {
        // TO DO
        console.log(err.error); // Aquí se muestra el mensaje de error
      }
    );
  }

  downloadText(): void {
    console.log(this.data);
    if (this.data) {
      const text = this.data.replace(/\n/g, '\r\n'); // Reemplazar saltos de línea por retorno de carro + salto de línea
      const blob = new Blob([text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'texto_extraido.txt';
      link.click();

    } else {
      console.log('No se encontró texto extraído');
    }
  }
}
//FUNCION PARA MOSTRAR TEXTO


