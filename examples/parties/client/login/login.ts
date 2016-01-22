'use strict';

import {Page} from 'ionic/ionic';

import {Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';

import {AccountsService, InjectUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

@Page({
  templateUrl: '/client/login/login.html',
  providers: [AccountsService]
})
@InjectUser()
export class Login extends MeteorComponent {
  loginForm: ControlGroup;
  user: Meteor.User;
  private _accounts: AccountsService;

  constructor(accounts: AccountsService) {
    super();
    this._accounts = accounts;
    var fb = new FormBuilder()
    this.loginForm = fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  login(event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      var login = this.loginForm.value;
      this._accounts.login(login.user, login.pwd)
        .then(() => {
          (<Control>this.loginForm.controls['user']).updateValue('');
          (<Control>this.loginForm.controls['pwd']).updateValue('');
        })
        .catch(err => {
          alert(err);
        });
    }
  }

  logout() {
    this._accounts.logout();
  }
}
