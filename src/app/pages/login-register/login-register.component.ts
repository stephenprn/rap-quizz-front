import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  public login: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.login = this.route.snapshot.data['login'];
  }
}
