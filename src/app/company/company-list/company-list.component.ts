import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];

  constructor() {}

  ngOnInit() {
    this.companies = [
      { name: 'Comapny A', email: 'companyA@ssw.com.au', phone: 1234 },
      { name: 'Comapny B', email: 'companyB@ssw.com.au', phone: 5678 },
      { name: 'Comapny C', email: 'companyC@ssw.com.au', phone: 9133 }
    ];
  }
}
