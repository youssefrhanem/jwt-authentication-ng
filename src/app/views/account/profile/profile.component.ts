import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../core/auth/services/account.service';
import {FormBuilder} from '@angular/forms';
import {Account} from '../../../core/auth/_models/account.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  account!: Account;
  success = false;

  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  accoun(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        console.log('firstName : ' + account.firstName);
        console.log('lastName : ' + account.lastName);
        console.log('lastName : ' + account.lastName);
        this.account = account;
      }
    });
  }


  ngOnInit() {
  }

}
