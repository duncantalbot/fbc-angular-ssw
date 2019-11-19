import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/Operators';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]>;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companies$ = this.loadCompanies();
  }

  loadCompanies() {
    return this.companyService.getCompanies().pipe(
      tap(cmps => console.log('Got company list data', cmps)),
      finalize(() => console.log('Finalize called by component'))
    );
  }

  deleteCompany(company: Company) {
    this.companyService
      .deleteCompany(company)
      .subscribe(c => (this.companies$ = this.loadCompanies()));
  }
}
