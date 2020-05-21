import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TestCodeSend } from '../models/testCodeSend';
import { TestCodeRecieveInfoDTO } from '../models/testCodeRecieveInfoDTO';

@Injectable({
  providedIn: 'root'
})
export class TestCodeService {

  constructor(private http: HttpClient) { }

  testCode(testCodeSend: TestCodeSend) {
    return this.http.post<TestCodeRecieveInfoDTO>(`${environment.apiURL}testCode/getInformation`, testCodeSend)
        .pipe(map(compilerResponse => {
            return compilerResponse;
          })
        );
}
}
