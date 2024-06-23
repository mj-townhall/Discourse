import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../Model/Post';
import { PostService } from '../services/post-comment/post.service';
import { Comment } from '../Model/Comment';
import { trigger, transition, style, animate } from '@angular/animations';

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

  constructor(
    private postService: PostService,
    private route: ActivatedRoute ,
    private router:Router
  ) {}

  async ngOnInit() {
    // console.log('Current Route:', this.router.url);
    // Check if current route is '/posts/:userId'
    if (this.router.url.startsWith('/post/')) {
      const segments = this.router.url.split('/');
      // console.log(segments);
      if (segments.length === 3) { // Expecting '/posts/:userId', so segments length should be 3
        const userIdFromRoute = segments[2];
        // console.log("current userId --",userIdFromRoute);
        this.userId = +userIdFromRoute; // Convert to number, if required
      }
    }
    // else console.log("url not found")
    this.data = await this.postService.getPosts(this.userId) as Post[];
    // console.log(this.data);
    for (let post of this.data) {
      const comments :any= await this.postService.getComments(post.id);
      this.commentData.set(post.id, comments);
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
  window.location.reload()

}

}
