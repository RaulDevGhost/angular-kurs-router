import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiURL = `${environment.API_URL}/api/files`;

  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob): Observable<any> {
    console.log(`${this.apiURL}/upload`);
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.apiURL}/upload`, form, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }
}
