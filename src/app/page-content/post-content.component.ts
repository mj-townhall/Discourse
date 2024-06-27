import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../Model/Post';
import { PostService } from '../services/post-comment/post.service';
import { Comment } from '../Model/Comment';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  data: Post[] = [];
  commentData: Map<number, any[]> = new Map<number, any[]>();  
  userId: number | null = null; 
  showComments : boolean =false;
  selectedPostId: number | null = null;
  commentSizeMap :Map<number, number> = new Map<number, number>()  ;
  isLoading =false
  constructor(
    private postService: PostService,
    private route: ActivatedRoute ,
    private router:Router,
    private toastr:ToastrService
  ) {}

  async ngOnInit() {
    if (this.router.url.startsWith('/post/')) {
      const segments = this.router.url.split('/');
      if (segments.length === 3) {
        const userIdFromRoute = segments[2];
        this.userId = +userIdFromRoute;
      }
    }

    try {
      this.data = await this.postService.getPosts(this.userId) as Post[];

      for (let post of this.data) {
        const comments = await this.postService.getComments(post.id) as Comment[];
        this.commentData.set(post.id, comments);
        this.commentSizeMap.set(post.id, comments.length);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setTimeout(()=>this.isLoading = false,2000)
       // Set isLoading to false after data fetching completes
    }
  }
  toggleViewComments(postId: number): void {
    if (this.selectedPostId === postId) {
      this.showComments = !this.showComments; // Toggle comments visibility
    } else {
      this.showComments = true; // Show comments for the selected post
    }
    this.selectedPostId = postId; // Set the selected post id
  }
async loadPosts(){
//   this.postService.getPosts(this.userId).subscribe((data) => {
//       this.posts = data;
//   });
this.data= await this.postService.getPosts(this.userId);
}
onDeletePost(postId: number): void {
    this.postService.deletePost(postId);
    window.location.reload()
}
onEditPost(postId: number): void {
  this.postService.editPost(postId);
    window.location.reload()
}
addNewComment(commentData :Comment){
  this.postService.addComment(commentData);
  this.toastr.info("comment added")
  setTimeout(() => {
    window.location.reload()
  this.ngOnInit()
  }, 2000);
  

}

}
