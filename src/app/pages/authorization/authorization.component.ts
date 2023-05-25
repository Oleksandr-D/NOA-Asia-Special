import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  public authForm!: FormGroup;
  public loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: Firestore,
    private toastr: ToastrService,
    private auth: Auth,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  ngOnDestroy(): void {
    if(this.loginSubscription)
    this.loginSubscription.unsubscribe();
  }

 initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        this.toastr.success('Користувач успішно увішов');
      })
      .catch((e) => {
        console.log('error', e);
        this.toastr.error(e.message);
      });
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid))
    .subscribe((user) => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
          if (user && user['role'] === 'USER') {
          this.router.navigate(['/user-profile']);
        } else if (user && user['role'] === 'ADMIN') {
         this.router.navigate(['/admin']);
         }
        this.accountService.isUserLogin$.next(true);
      },
      (e) => {
        console.log('error', e);
      }
    );
  }

}



