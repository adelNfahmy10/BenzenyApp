import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton, IonInputPasswordToggle, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Login } from 'src/core/services/login/login';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonLabel, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, ReactiveFormsModule, IonInputPasswordToggle ]
})
export class ChangepasswordPage {
  private readonly _Router = inject(Router);
  private readonly _Login = inject(Login);

  oldPassword: string = '';
  newPassword: string = '';
  userId: string | '' = localStorage.getItem('userId') || '';


  submitChangePassword(){
    const data = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      userId: this.userId
    }

    this._Login.changePassword(data).subscribe({
      next: (res)=>{
        this._Router.navigate(['/tabs/home']);
        localStorage.setItem('token', res.data.accessToken);
      }
    });
  }

}
