// typy dla zmiennych formularza
export type FormType = 'LOGIN' | 'REGISTER';
export type showPassword = 'password' | 'text';

// Dane formularza
export type loginData = {
  email: string;
  password: string;
  remember_me?: boolean;
  acceptance_regulations?: boolean;
  password_confirm?: string;
  formType?: FormType;
}