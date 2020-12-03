import { Component, Output, EventEmitter } from '@angular/core';
import { IAuthenticate } from '../../../../../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'star-buddy-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() submit: EventEmitter<IAuthenticate> = new EventEmitter<IAuthenticate>();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    this.submit.emit({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    } as IAuthenticate);
  }
}
