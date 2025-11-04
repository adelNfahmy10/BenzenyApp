import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonAvatar, IonImg, IonLabel, IonModal, IonSearchbar, IonList, IonChip, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RouterLink } from '@angular/router';
import { Ads } from 'src/core/services/ads/ads';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonButton, IonChip, IonList, IonSearchbar, IonModal, IonLabel, IonImg, IonAvatar, IonItem, IonInput, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink, IonTitle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  private readonly _ToastController = inject(ToastController)
  private readonly _LoadingController = inject(LoadingController)
  private readonly _Ads = inject(Ads)

  imageUrl: string | undefined;
  allAds:WritableSignal<any[]> = signal([]);
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
  // toggleSearch() {
  //   this.showSearch = !this.showSearch;
  // }

  isModalOpen = false;
  countTimeAds: number = 3;
  showCloseBtn: boolean = false;
  intervalId: any;

  ngOnInit(): void {
    this.isModalOpen = true;
    this.getAllAds()
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getAllAds(){
    this._Ads.login().subscribe(res=>{
      this.allAds.set(res.data.items);
      this.timeAds()
    });
  }

  timeAds(): void {
  this.countTimeAds = 3;
  this.showCloseBtn = false;

  this.intervalId = setInterval(() => {
    this.countTimeAds--;
    if (this.countTimeAds === 0) {
      clearInterval(this.intervalId);
      this.showCloseBtn = true;
    }
  }, 1000);
}
}
