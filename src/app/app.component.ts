import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'post_C2';
  isLoding:boolean = false;

  private loaderService = inject(LoaderService)

ngOnInit(): void {
  this.loaderService.emitLoadingStatus$.subscribe(res=>{
    this.isLoding = res 
  })
}
}
