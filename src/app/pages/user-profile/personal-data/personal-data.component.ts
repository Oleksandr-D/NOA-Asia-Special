import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  public user!:any;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.checkUpdatesUserLogin();
    this.update();
  }

  update():void{
    this.user = JSON.parse(localStorage.getItem('currentUser') as string);
   }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.update();
    })
  }

}
