import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RetornoCep } from './retorno-cep';

@Injectable({
  providedIn: 'root'
})
export class CepServiceService {

  constructor(private httpClient: HttpClient) { }

  buscar(cep: string): Observable<RetornoCep> {
      return this.httpClient.get<RetornoCep>(`https://viacep.com.br/ws/${cep}/json`);      
  }

}
