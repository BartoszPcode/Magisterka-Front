import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompileSend } from '../models/compileSend';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CodeAnalyzeInfoDTO } from '../models/codeAnalyzeInfoDTO';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http: HttpClient) { }



  compileJava(model: CompileSend) {
      return this.http.post<any>(`${environment.apiURL}compiler/java/Compile`, model)
          .pipe(map(compilerResponse => {
              return compilerResponse;
            })
          );
  }

  compileGroovy(model: CompileSend) {
    return this.http.post<any>(`${environment.apiURL}compiler/groovy/Compile`, model)
        .pipe(map(compilerResponse => {
            return compilerResponse;
          })
        );
}

  javaCyclomaticComplexity(model: CompileSend): Observable<CodeAnalyzeInfoDTO[]> {
      return this.http.post<any>(`${environment.apiURL}compiler/java/CyclomaticComplexity`, model)
          .pipe(map(compilerResponse => {
              return compilerResponse;
            })
          );
  }
}
