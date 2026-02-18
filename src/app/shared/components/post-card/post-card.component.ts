import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../models/post';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmedComponent } from '../get-confirmed/get-confirmed.component';
import { filter, switchMap } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() postObj!:Ipost;
  constructor(private matDialog:MatDialog,
    private postService:PostService
  ) { }

  ngOnInit(): void {
    console.log(this.postObj);
    
  }

  OnEdit(post:Ipost){
    this.postService.EditObj(post)
  }

  OnRemove(post:Ipost){
    let matConfig = new MatDialogConfig()
    matConfig.width = '500px';
    matConfig.disableClose = true;
    matConfig.data = `Are you sure, You want to remove this post who's id is ${post.id}??`
    let matDialogRef = this.matDialog.open(GetConfirmedComponent,matConfig)
    matDialogRef.afterClosed()
        .pipe(
          filter(flag=> flag === true),
          switchMap(()=>{
            return this.postService.removePost(post.id)
          })
        ).subscribe(res=>{
          this.postService.removeId(post.id)
        })

  }

}
