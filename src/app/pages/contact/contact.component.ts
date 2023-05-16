import {
  Component
} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  public questionForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm(): void {
    this.questionForm = this.fb.group({
      name: [null, [Validators.required, ]],
      surname: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required]],
    });
  }

  






}