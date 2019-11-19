import { Component, OnInit, Input, Output } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {
  @Input()
  companies: Company[];

  constructor() {}

  ngOnInit() {}

  deleteCompany() {}
}
