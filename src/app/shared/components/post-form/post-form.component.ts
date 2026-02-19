import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
postForm!:FormGroup
isInEditMode:boolean = false;
editId!:string;
optionalVal:Array<string> = ["1","2","3","4","5","6","7","8","9","10"]
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.createForm()
    this.patchVal()
  }

  createForm(){
    this.postForm = new FormGroup({
      title:new FormControl(null,[Validators.required]),
      content:new FormControl(null,[Validators.required]),
      userId:new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
   if(this.postForm.valid){
     let postObj = this.postForm.value;
    this.postService.createPost(postObj).subscribe(res=>{
      if(res){
        this.postForm.reset()
        this.postService.newPost({...postObj,id:res.name})
      }
    })
   }
  }

  patchVal(){
    this.postService.emitEditObj$.subscribe(res=>{
      if(res){
        this.isInEditMode = true;
        this.editId = res.id;
        this.postForm.patchValue(res)
      }
    })
  }

  onUpdate(){
    if(this.postForm.valid){
        let updatedObj:Ipost = {
        ...this.postForm.value,
        id:this.editId
      }
      this.postService.UpdatePost(updatedObj).subscribe(res=>{
          if(res){
            this.postForm.reset()
            this.isInEditMode = false;
            this.postService.UpdatedObj(res)
          }
        })
    }
  }

  get controls(){
    return this.postForm.controls;
  }

}
