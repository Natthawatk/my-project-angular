import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../index/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ImagePostRequest } from '../../model/data_get_res';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    MatToolbar,
    MatButtonModule,
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    MatCard,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
 // showImage: boolean = true;
 data: any;
 allimage: ImagePostRequest[] = [];
 userId: number | null = null; 

 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private cdr: ChangeDetectorRef,
   private constants: Constants,
   private http: HttpClient
 ) {}

 ngOnInit() {
   this.route.queryParams.subscribe((params) => {
     try {
       if (typeof params['data'] === 'string') {
         this.data = JSON.parse(params['data']);
       } else {
         this.data = params['data'];
       }
     } catch (error) {
       console.error('Error parsing JSON data:', error);
     }
     console.log('Received data in profile:', this.data);
     const firstItem = this.data.length > 0 ? this.data[0] : null;
     this.userId = firstItem ? firstItem.userID : null;
     this.cdr.detectChanges();
   });

   this.getallpic();
 }

 navigateToIndex() {
   this.router.navigate(['/index'], {
     queryParams: { data: JSON.stringify(this.data) },
   });
 }
 navigateToProfile() {
   this.router.navigate(['/profile'], { queryParams: { data: JSON.stringify(this.data) } });
 }

 navigateToList() {
   this.router.navigate(['/list']);
 }

 // changePage1() {
 //   this.router.navigate(['/profile/allpicture'], {
 //     queryParams: { data: JSON.stringify(this.data) },
 //   });
 // }

 
 changePage3() {
   this.router.navigate(['/profile-other/ranked-other'], {
     queryParams: { data: JSON.stringify(this.data) },
   });
 }

 statPage(data: any){
   this.router.navigate(['/stat'], { queryParams: { data: JSON.stringify(data) } });
 }

 getallpic() {
   const url = `${this.constants.API_ENDPOINT}/show/getimage/${this.data.userID}`;

   this.http.get(url).subscribe(
     (response: any) => {
       console.log('API Response:', response, this.data.userID);
       this.allimage = response;
     },
     (error) => {
       console.error('API Error:', error);
     }
   );
 }

}

