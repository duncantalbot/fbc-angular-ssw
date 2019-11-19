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
      tap(c => console.log('Got company list', c)),
      finalize(() => console.log('FINALIZE CALLED BY COMPONENT'))
    );
  }

  deleteCompany(company: Company) {
    console.log('Delete button clicked');
    this.companyService
      .deleteCompany(company)
      .subscribe(c => (this.companies$ = this.loadCompanies()));
  }
}
