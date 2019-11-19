import { Injectable } from '@angular/core';
import { Company } from './company';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/Operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
      catchError(e => this.errorHandler(e)),
      finalize(() => console.log('Completed getting companies'))
    );
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(
        catchError(e => this.errorHandler(e)),
        finalize(() => console.log('Completed deleting company'))
      );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    });
  }

  errorHandler(e: Error): Observable<any> {
    console.error('ERROR HANDLER', e);
    return of({});
  }
}
