import { Component, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrl: './posts-card.component.scss'
})
export class PostsCardComponent {
  @Input() post: any; // Input property to receive post data from parent component

  constructor(private router: Router) { }

  // Optional: Add methods for handling upvotes, downvotes, and adding comments
  upvotePost() {
    // Implement upvoting logic here
    this.post.votes++; // Example: Increment upvotes count
  }

  downvotePost() {
    // Implement downvoting logic here
    this.post.votes--; // Example: Increment downvotes count
  }

  handleAddComment(comment: string) {
    // Implement adding comment logic here
    console.log(`Adding comment "${comment}" to post with content: ${this.post.content}`);
    // Example: Push comment to a comments array or send to a service
  }

  openPost(id:number){
    this.router.navigate(['/post']); 
    // this.router.navigate(['/post', id]); 
    console.log(id);
  }
}
