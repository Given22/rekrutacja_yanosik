import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../_core/_services/login.service";

// Typy dla zmiennych formularza
import { showPassword, FormType } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // formularz
  loginForm: FormGroup;

  // zmienne pomocnicze
  formType: FormType = 'LOGIN';
  showPassword: showPassword = 'password';
  showText: string = 'Pokaż hasło';

  // Walidacja hasła, regex 
  PASSWORD_PATTERN: string = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$'

  // Walidacja hasła
  private passwordConfirmValidators = [
    Validators.minLength(6), 
    Validators.pattern(this.PASSWORD_PATTERN),
  ];

  constructor(private readonly _formBuilder: FormBuilder, private readonly _loginService: LoginService) { }

  ngOnInit(): void {
    this._initForm();
  }

  _initForm(): void {
    // Dane formularza
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.PASSWORD_PATTERN)]],
      password_confirm: ['', this.passwordConfirmValidators],
      remember_me: [false],
      acceptance_regulations: [false]
    })
  }

  // Po kliknięciu przycisku "Pokaż hasło" lub "Ukryj hasło"
  showPasswordFn(): void {
    // Zmiana typu inputa z hasłem
    this.showPassword = this.showPassword === 'password' ? 'text' : 'password';
    // Zmiana tekstu przycisku
    this.showText = this.showText === 'Pokaż hasło' ? 'Ukryj hasło' : 'Pokaż hasło';
  }

  changeFormType(): void {
    // Zmiana typu formularza
    this.formType = this.formType === 'REGISTER' ? 'LOGIN' : 'REGISTER';

    // Zmiana validacji pól z względu na typ formularza
    if(this.formType === 'REGISTER') {
      this.loginForm.get('password_confirm')?.setValidators(this.passwordConfirmValidators.concat(Validators.required))
      this.loginForm.get('acceptance_regulations')?.setValidators(Validators.requiredTrue);
    } else {
      this.loginForm.get('password_confirm')?.setValidators(this.passwordConfirmValidators);
      this.loginForm.get('acceptance_regulations')?.clearValidators();
    }
  }

  // Po kliknięciu przycisku typu submit
  onSubmitForm(): void {
    // Sprawdź czy formularz jest poprawny
    if (this.loginForm.valid) {
      console.log('Formularz gotowy do wysyłki');
      this._loginService.sendFormData(this.loginForm.getRawValue(), this.formType);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
