import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Constants } from '../../config/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPostRequest } from '../../model/data_get_res';

@Component({
  selector: 'app-canvote',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './canvote.component.html',
  styleUrl: './canvote.component.scss',
})
export class CanvoteComponent {
  data: UserPostRequest[] = [];

  randompic: any;

  constructor(
    private http: HttpClient,
    private constants: Constants,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRandomPictures();

    this.route.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['data']);
      console.log('Received data in profile:', this.data);

      this.cdr.detectChanges(); // Force change detection
    });
  }

  getRandomPictures() {
    // ดึง URL ของ API ที่มีข้อมูลรูปภาพสุ่ม
    const urlall = this.constants.API_ENDPOINT + '/show/randompicture';

    // ใช้ HTTP GET เพื่อเรียกข้อมูลรูปภาพ
    this.http.get(urlall).subscribe((picran: any) => {
      this.randompic = picran;
      for (let i = 0; i < this.randompic.length; i++) {
        this.randompic[i].url_image =
          this.constants.API_ENDPOINT + this.randompic[i].url_image;
        //console.log(this.randompic[i]);
      }
      console.log(this.randompic); // แสดงฟังก์ชัน randomimage
    });
  }
}
