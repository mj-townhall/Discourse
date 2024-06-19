import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment: any;

  upvotePost() {
    // Implement upvoting logic here
    this.comment.votes++; // Example: Increment upvotes count
  }

  downvotePost() {
    // Implement downvoting logic here
    this.comment.votes--; // Example: Increment downvotes count
  }
}
