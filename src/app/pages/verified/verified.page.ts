import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonRouterLink } from '@ionic/angular/standalone';
import { NgxOtpInputComponent, NgxOtpInputComponentOptions } from 'ngx-otp-input';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-verified',
  templateUrl: './verified.page.html',
  styleUrls: ['./verified.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, NgxOtpInputComponent, IonRouterLink, RouterLink]
})
export class VerifiedPage {
  private readonly _Router = inject(Router)

  otpOptions: NgxOtpInputComponentOptions = {};

  otpCode: string = ''; // هنا بيتخزن الكود اللي المستخدم كتبه
  otpArray: string[] = [];


  // لما المستخدم يغيّر أي رقم
  onOtpChange(codeArray: string[]) {
    this.otpArray = codeArray;
    console.log('OTP Array:', this.otpArray);
  }

  // لما المستخدم يكمّل الكود بالكامل
  onOtpComplete(code: string) {
    this.otpCode = code;
    console.log('Complete OTP:', this.otpCode);
  }

  // عند الضغط على زر "Verify"
  verifyCode() {
    if (this.otpCode.length === 6) {
      console.log('Final OTP Code:', this.otpCode);
      this._Router.navigate(['/home'])
    } else {
      console.log('Please enter the full OTP code');
    }
  }

  @ViewChild('otpInput') otpInput: NgxOtpInputComponent | any;

  resetForm() {
    this.otpInput.reset();
  }
}
