import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButton, MatIconAnchor } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { ImagePostRequest } from '../../model/data_get_res';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Constants } from '../../config/constants';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [MatToolbar, MatButton, HttpClientModule, CommonModule, MatCardModule, MatIconModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss',
})
export class VoteComponent implements OnInit {
  randompic: any;

  constructor(private http: HttpClient, private constants: Constants) {}

  ngOnInit(): void {
    this.getRandomPictures();
  }

  getRandomPictures() {
    
    // ดึง URL ของ API ที่มีข้อมูลรูปภาพสุ่ม
    const urlall = this.constants.API_ENDPOINT+'/show/randompicture';
    
    // ใช้ HTTP GET เพื่อเรียกข้อมูลรูปภาพ
    this.http.get(urlall).subscribe((picran: any) => {
      this.randompic = picran;
      for(let i=0;i<this.randompic.length;i++){
        this.randompic[i].url_image = this.constants.API_ENDPOINT+this.randompic[i].url_image;
        //console.log(this.randompic[i]);

      }
    console.log(this.randompic); // แสดงฟังก์ชัน randomimage
    });
  }
}
