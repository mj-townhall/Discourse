import { Injectable } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Post } from '../../Model/Post';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postData: Post[] = []; // Private to encapsulate access
  showModal :boolean =false;
  constructor(private axiosService: AxiosService, private authService :AuthService, private toastr:ToastrService) {}

  async getPosts(userId: number | null): Promise<Post[]> {
    if (userId === null) {
      await this.fetchAllPosts();
    } else {
      console.log(userId);
      await this.fetchAllPostsByUser(userId);
    }
    // console.log(this.postData);
     this.convertToDate(this.postData);
     this.sortDataByTimestamp(this.postData);
    return this.postData;
  }

  private async fetchAllPosts(): Promise<void> {
    try {
      const response = await this.axiosService.request('GET', '/api/post', {});
      // console.log(response);
      this.postData = response.data as Post[];
    } catch (error) {
      console.error('Error fetching posts:', error);
      this.postData = []; // Reset to empty array on error
    }
  }

  private async fetchAllPostsByUser(userId: number): Promise<void> {
    let response;
    try {
       response = await this.axiosService.request('GET', `/api/post/${userId}`, {}, true);
      this.postData = response.data as Post[];
    } catch (error) {
      console.error('Error fetching posts:', error);
      this.postData = []; // Reset to empty array on error
    }
    // console.log(response.data)
  }

  async getComments(postId : number) :Promise<any[]>{
    const response=await this.axiosService.request('GET', `/api/comment/${postId}`, {});
    // convertToDate()
    this.convertToDate(response.data);
    this.sortDataByTimestamp(response.data);
    return response.data;
  }
  async addComment( comment :any) :Promise<void>{
    const response=await this.axiosService.request('POST', `/api/comment`, {
        userData: {
          id: this.authService.getUserId()
        },
        postId:comment.postId,
        "createdAt": 767,   //any random no. as it will be handled in backend
        "content": comment.content,
        "votes" :0
    },true);
    return response.data;
  }
  async addPost( post :any) :Promise<void>{
    const response=await this.axiosService.request('POST', `/api/post`, {
        content: post.content,
        createdAt: 0,
        userData: {
          id: this.authService.getUserId() 
        },
        title :post.title,
        votes :0,
        editBy: this.authService.getUserId()
    }, true);
    this.toastr.info("comment added")
  setTimeout(() => {
    window.location.reload()
  }, 2000);
    return response.data;
  }
  async deletePost(postId : number) :Promise<void>{
    const response=await this.axiosService.request('DELETE', `/api/post/${postId}`, {},true);
    console.log("post deleted ",response.data);
    return response.data;
  }

  async editPost(post :any):Promise<void>{
    const response=await this.axiosService.request('PUT', `/api/post`, {
      content: post.content,
      createdAt: post.createdAt,
      userData: {
        id: post.userId 
      },
      title :post.title,
      votes :post.votes,
      id: post.id,
      editBy: this.authService.getUserId()
    },true);
    if(response.data.message==="already voted"){
      this.toastr.info("You have already voted")
      } 
    setTimeout(()=>{window.location.reload();},2000);
    // return response.data;
  }

  convertToDate(data :any): void {
    const now = new Date().getTime();
    data.forEach( (item :any)=> {
      const timestamp = new Date(item.createdAt).getTime();
      const difference = now - timestamp;

      if (difference < 60000) { // less than a minute
        item.date = 'Just now';
      } else if (difference < 3600000) { // less than an hour
        const minutes = Math.floor(difference / 60000);
        item.date = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (difference < 86400000) { // less than a day
        const hours = Math.floor(difference / 3600000);
        item.date = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else { // more than a day
        const days = Math.floor(difference / 86400000);
        item.date = `${days} day${days > 1 ? 's' : ''} ago`;
      }
    });
  }

  private sortDataByTimestamp(data :any): void {
    data.sort((a :any, b :any) => b.createdAt - a.createdAt);
  }
}
