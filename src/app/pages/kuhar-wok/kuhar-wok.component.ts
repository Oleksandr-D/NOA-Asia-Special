import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kuhar-wok',
  templateUrl: './kuhar-wok.component.html',
  styleUrls: ['./kuhar-wok.component.scss']
})
export class KuharWokComponent {
  public questionForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.questionForm = this.fb.group({
      name: [null, [Validators.required, ]],
      surname: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required]],
    });
  }
}
