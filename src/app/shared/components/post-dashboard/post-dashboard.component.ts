import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../models/post';
import { PostService } from '../../services/post.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
postArr:Ipost[] = []
  constructor(private postService:PostService,
    private snack:SnackBarService
  ) { }

  ngOnInit(): void {
    this.fetchAllPosts()
    this.getNewPost()
    this.getRemoveId()
    this.getUpdatedObj()
  }

fetchAllPosts(){
  this.postService.fetchAllPosts().subscribe({
    next:data=>{
      console.log(data);
      
      this.postArr = data
      this.snack.ShowSuccessMsg(`All ${data.length} posts are fetched successfully😎!!`)
    },error:err=>{
      this.snack.showError('networks errorr!!!😐')
    
    }
  })
}

getNewPost(){
  this.postService.emitNewPost$.subscribe({
    next:data=>{
      this.postArr.unshift(data)
      this.snack.ShowSuccessMsg(`The post with id ${data.id} is added successfully😎!!`)
    },
    error:err=>{
      this.snack.showError(`${err.statusText} !!😐`)
    }
  })
}

 getRemoveId(){
  this.postService.emitRemoveId$.subscribe({
    next:data=>{
      let getIndex = this.postArr.findIndex(post=>post.id === data)
      this.postArr.splice(getIndex,1)
      this.snack.ShowSuccessMsg(`The post with id ${data} is removed successfully😎!!`)
    },
    error:err=>{
      this.snack.showError(`${err.statusText} !!😐`)
    }
  })
 }

 getUpdatedObj(){
  this.postService.emitUpdatedObj$.subscribe({
    next:data=>{
      let getIndex = this.postArr.findIndex(post=> post.id === data.id)
      this.postArr[getIndex] = data;
      this.snack.ShowSuccessMsg(`The post with id ${data.id} is updated successfully😎!!`)
    },error:err=>{
      this.snack.showError(`${err.statusText} !!😐`)
    }
  })
 }

}
