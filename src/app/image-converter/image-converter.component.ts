import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-image-converter',
  templateUrl: './image-converter.component.html',
  styleUrls: ['./image-converter.component.css'],
})
export class ImageConverterComponent {
  selectedFile!: File;
  data: any;
  private Url = 'https://visiontextapi.fly.dev/vision/imagen';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
 // FUNCION PARA CONECTAR A LA API Y PROCESAR LA IMAGEN
  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http
      .post<any>(this.Url, formData)
      .subscribe(
        (res) => {
          this.data = res.text;
          //TO DO
          console.log(this.data);
        },
        (err) => {
          //TO DO
          console.log(err.error); // Aquí se muestra el mensaje de error
        }
      );
  }
//FUNCION PARA DESCARGAR EL CONTENIDO DE LA IMAGEN PROCESADA
  downloadText(): void {
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
