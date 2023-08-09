import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostmanService } from 'src/app/services/postman.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private postmanService: PostmanService) { }

  ngOnInit(): void {
  }
  login(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.postmanService.login(form.value.email, form.value.password)
  }

}
