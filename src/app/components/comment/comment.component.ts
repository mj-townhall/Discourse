import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment: any;
  isExpanded :boolean =false
  
  upVote() {
    // Implement upvoting logic here
    this.comment.votes++; // Example: Increment upvotes count
  }

  downVote() {
    // Implement downvoting logic here
    this.comment.votes--; // Example: Increment downvotes count
  }
  toggleExpand(){
    this.isExpanded=!this.isExpanded
  }
}
