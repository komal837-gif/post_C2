import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ipost, IPostName } from '../models/post';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
emitNewPost:Subject<Ipost> = new Subject<Ipost>()
emitRemoveId:Subject<string> = new Subject<string>()
emitEditObj:Subject<Ipost> = new Subject<Ipost>()
emitUpdatedObj:Subject<Ipost> = new Subject<Ipost>()

emitUpdatedObj$:Observable<Ipost> = this.emitUpdatedObj.asObservable()
emitEditObj$:Observable<Ipost> = this.emitEditObj.asObservable()
emitRemoveId$:Observable<string> =this.emitRemoveId.asObservable()
emitNewPost$:Observable<Ipost> = this.emitNewPost.asObservable()

UpdatedObj(post:Ipost){
  this.emitUpdatedObj.next(post)
}

EditObj(post:Ipost){
  this.emitEditObj.next(post)
}


removeId(id:string){
  this.emitRemoveId.next(id)
}

newPost(post:Ipost){
  return this.emitNewPost.next(post)
}

BASE_URL = environment.BASE_URL
POST_URL = `${this.BASE_URL}/blogs.json`

  constructor(private http:HttpClient) { }


  fetchAllPosts(){
    return this.http.get<Ipost[]>(this.POST_URL)
      .pipe(
        map(obj=>{
          let postArr :Array<Ipost> = []

          for(const key in obj){
            postArr.unshift({...obj[key],id:key})
          }

          return postArr
        })
      )
  }

  createPost(post:Ipost):Observable<IPostName>{
    return this.http.post<any>(this.POST_URL,post)
  }

  removePost(id:string):Observable<string>{
    let REMOVE_URL = `${this.BASE_URL}/blogs/${id}.json`
    return this.http.delete<string>(REMOVE_URL)
  }


  UpdatePost(post:Ipost):Observable<any>{
    let UPDATE_URL = `${this.BASE_URL}/blogs/${post.id}.json`
    return this.http.patch<any>(UPDATE_URL,post)
  }
}
