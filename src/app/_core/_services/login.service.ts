import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { loginData, FormType } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _httpClient: HttpClient) {
  }

  sendFormData(loginData: loginData, formType: FormType){
    // usunięcie pola password_confirm z obiektu loginData (nie jest potrzebne do wysłania)
    delete loginData.password_confirm;

    if(formType === 'REGISTER') {
      // usuwanie pola remember_me z obiektu loginData (nie jest potrzebne do wysłania podczas rejestracji)
      delete loginData.remember_me;
    } else {
      // usuwanie pola acceptance_regulations z obiektu loginData (nie jest potrzebne do wysłania podczas logowania)  
      delete loginData.acceptance_regulations;
    }

    // dodanie pola formType do obiektu loginData
    loginData.formType = formType;

    // wysłanie danych do serwera
    this._httpClient.post<loginData>('https://jsonplaceholder.typicode.com/posts/', loginData)
    .subscribe(
      // w przypadku sukcesu
      data => {window.alert(`Wysłano poprawnie dane:\n${JSON.stringify(data,null,2)}`);}, 
      // w przypadku błędu
      error => {window.alert(error.message)}
      );
  }
}
