import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CloudVisionService {


  private baseUrl: string = 'https://visiontextapi.fly.dev';

  constructor(public http: HttpClient) { }


//
  public convertirImg(selectedFile: File) {
    const formData = new FormData();
    formData.append('image', selectedFile)
    return this.http.post<any>(this.baseUrl + "/vision/imagen", formData);
  }

}
