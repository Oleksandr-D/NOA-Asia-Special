import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUserResponse } from 'src/app/shared/interfaces/user/user.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  public user:any = {};
  public userForm!: FormGroup;
  private currentUserId!: string;

  constructor(
    private accountService: AccountService,
    private fu: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initUserForm();
    this.checkUpdatesUserLogin();
    this.update();
  }

  initUserForm(): void {
    this.userForm = this.fu.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{9}$') ]],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      address:[null, [Validators.required]],
      street:[null, [Validators.required]],
      house:[null, [Validators.required]],
      flat:[null, [Validators.required]],
      entrance:[null, [Validators.required]],
      floor:[null, [Validators.required]],
      intercom:[null]
    });
  }

  update(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      this.userForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email,
        address:this.user.address,
        street:this.user.street,
        house:this.user.house,
        flat:this.user.flat,
        entrance:this.user.entrance,
        floor:this.user.floor,
        intercom:this.user.intercom,
      });
      this.currentUserId = this.user.uid || this.user.id;
    }
  }
  
  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.update();
    })
  }

  async saveUser(): Promise<void> {
    await this.accountService.updateFirebase(this.userForm.value, this.currentUserId as string);
    await this.getUser(); 
    this.toastr.success('Ваші дані успішно оновлено!');
  }
  
  getUser():void{
    this.accountService.getOneFirebase(this.currentUserId).subscribe(data =>{
      this.user  = data as IUserResponse;
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      this.checkUpdatesUserLogin();
    })
  }

}
