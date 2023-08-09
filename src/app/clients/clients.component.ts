import { Component, OnInit } from '@angular/core';
import { PostmanService } from '../services/postman.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private postmanService: PostmanService) { }

  ngOnInit(): void {
    this.postmanService.getExsClients()
  }

}
