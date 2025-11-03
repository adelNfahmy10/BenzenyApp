import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonInput, IonInputPasswordToggle, IonNote } from '@ionic/angular/standalone';
import { Router} from '@angular/router';
import { Login } from 'src/core/services/login/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonNote, IonInput, IonLabel, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonItem, IonButton, IonContent, CommonModule, FormsModule, IonInputPasswordToggle, ReactiveFormsModule ]
})
export class LoginPage {
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Login = inject(Login);

  serverError:string = '';

  loginForm:FormGroup = this._FormBuilder.group({
    username:[null, [Validators.required]],
    password:[null, [Validators.required]]
  });

  submitLoginForm(){
    let data = this.loginForm.value;
    let { username, password } = this.loginForm.value;
    this.serverError = '';

    this._Login.login(data).subscribe({
      next: (res)=>{
        let data = res.data;
        localStorage.setItem('phone', this.loginForm.get('username')?.value);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('fullName', data.fullName);
        localStorage.setItem('refreshToken', data.refreshToken);
        if (username === password) {
          this._Router.navigate(['/verified']);
        } else {
          this._Router.navigate(['/tabs/home']);
          localStorage.setItem('token', data.accessToken);
        }
      },
      error: (err)=>{
        this.serverError = err.error.errors[0];
      }
    });
  }

}
