import { Injectable } from '@angular/core';
import { Company } from './company';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/Operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  private companiesSubject$: BehaviorSubject<Company[]> = new BehaviorSubject<
    Company[]
  >([]);
  companies$ = this.companiesSubject$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  loadCompanies() {
    this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        catchError(e => this.errorHandler(e)),
        finalize(() => console.log('Completed getting companies'))
      )
      .subscribe(list => this.companiesSubject$.next(list));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  deleteCompany(company: Company) {
    this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .subscribe(c => this.loadCompanies());
  }

  addCompany(company: Company) {
    this.httpClient
      .post<Company>(`${this.API_BASE}/company`, company, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(c => this.loadCompanies());
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(
      `${this.API_BASE}/company/${companyId}`
    );
  }

  updateCompany(company: Company) {
    this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(c => this.loadCompanies());
  }

  errorHandler(e: Error): Observable<any> {
    console.error('ERROR HANDLER', e);
    return of({});
  }
}
