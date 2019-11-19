import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/Operators';

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
    console.log('A company has been deleted');
    return this.httpClient.delete<Company>(
      `${this.API_BASE}/company/${company.id}`
    );
  }

  errorHandler(e: Error): Observable<any> {
    console.error('ERROR HANDLER', e);
    return of({});
  }
}
