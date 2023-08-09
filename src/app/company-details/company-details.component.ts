import { Component, OnInit } from '@angular/core';
import { PostmanService } from '../services/postman.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  totalClients: number;
  clientsPerPage: number = 20;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  documents: any[];
  currentFinancialYear: string;
  rawData: any[];
  constructor(private postmanService: PostmanService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.getCurrentFinancialYear()
    this.getCompanyDetails()
  }
  getCompanyDetails() {
    let id;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('clientID')) {
        id = paramMap.get('clientID')
      }
    })
    this.postmanService.getCompanyDetails(id, this.currentFinancialYear).subscribe(res => {
      console.log(res)
      this.rawData = res.records
      this.documents = this.rawData
      // for (let doc of this.documents) {
      //   doc = doc.docType.toUpperCase().split('_').join('');
      // }
      this.documents.forEach(doc => doc.docType = doc.docType.toUpperCase().split('_').join(' '))
      // this.documents = this.rawData.map(doc => doc = doc.docType.toUpperCase().split('_').join(''));
    })
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
  upload(id: string, e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files[0]
    console.log(file)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
        this.postmanService.upload(file, id).subscribe(res => alert(res.message));
      }
      if (file.type === 'application/pdf') {
        this.postmanService.upload(file, id).subscribe(res => alert(res.message));
      }
      else return;
    }
    fileReader.readAsDataURL(file)
  }
}
