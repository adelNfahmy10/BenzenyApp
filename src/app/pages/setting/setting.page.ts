import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonAvatar, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonAvatar, IonItem, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class SettingPage {
  private readonly _Router = inject(Router)

  fullName: string | null = localStorage.getItem('fullName');
  phone: string | null = localStorage.getItem('phone');

  logOut():void{
    localStorage.clear();
    this._Router.navigate(['/login']);
  }
}
