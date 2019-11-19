import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company = {} as Company;
  companyId: any;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;
    this.buildForm();
  }

  buildForm(): void {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['']
    });
  }

  saveCompany(): void {
    if (!this.isNewCompany) {
      this.companyService
        .addCompany(this.companyForm.value)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }
}
