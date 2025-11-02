import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput } from '@ionic/angular/standalone';
import { LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonInput, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class HomePage {
  private readonly _ToastController = inject(ToastController)
  private readonly _LoadingController = inject(LoadingController)

  imageUrl: string | undefined;

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,                        // جودة الصورة
      allowEditing: false,                // السماح بالتعديل بعد الالتقاط
      resultType: CameraResultType.DataUrl, // نحصل على الصورة كـ base64
      source: CameraSource.Camera,        // افتح الكاميرا مباشرة
    });

    this.imageUrl = image.dataUrl; // نخزن الصورة لعرضها في الواجهة

    // عرض الـ Loading
    const loading = await this._LoadingController.create({
      message: 'جارٍ إرسال الصورة...',
      spinner: 'crescent',
      duration: 2000, // يختفي بعد ثانيتين
    });
    await loading.present();

    // ننتظر انتهاء التحميل (كأن الصورة تُرفع)
    setTimeout(async () => {
      await loading.dismiss();

    // بعد انتهاء التحميل نظهر رسالة نجاح
    const toast = await this._ToastController.create({
      message: '..تم إرسال الصورة بنجاح',
      duration: 2000,
      color: 'success',
      position: 'middle',
    });

      await toast.present();
    }, 1500);


  }

  showSearch = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

}
