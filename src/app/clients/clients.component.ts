import { Component, OnInit } from '@angular/core';
import { PostmanService } from '../services/postman.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  totalClients: number;
  clientsPerPage: number = 20;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  records: any[];
  currentFinancialYear: any;
  constructor(private postmanService: PostmanService, private router: Router) { }
  ngOnInit(): void {
    this.postmanService.getExsClients(this.currentPage, this.clientsPerPage).subscribe(res => {
      this.records = res.records
      this.totalClients = res._metaData.total_count
      console.log(res.records)
    })
    this.getCurrentFinancialYear();
  }
  onPageChange(pageData: PageEvent) {
    console.log(pageData)
    this.currentPage = pageData.pageIndex + 1;
    this.clientsPerPage = pageData.pageSize;
    this.postmanService.getExsClients(this.currentPage, this.clientsPerPage).subscribe(res => {
      this.records = res.records
      this.totalClients = res._metaData.total_count
    });
  }
  sendData(id: string) {
    this.postmanService.getCompanyDetails(id, this.currentFinancialYear).subscribe(res => {
    })
    this.router.navigate([`/company-details/${id}`])
  }
  getCurrentFinancialYear() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Adding 1 to convert from 0-indexed to 1-indexed
    const currentYear = today.getFullYear();

    if (currentMonth >= 4) {
      // If the current month is April or later, consider it the next financial year
      this.currentFinancialYear = currentYear + "-" + (currentYear + 1);
    } else {
      // If the current month is before April, consider it the ongoing financial year
      this.currentFinancialYear = (currentYear - 1) + "-" + currentYear;
    }
  }
}
