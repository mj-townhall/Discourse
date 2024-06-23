import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../../Model/Comment';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { PostService } from '../../services/post-comment/post.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
    selector: 'app-posts-card',
    templateUrl: './posts-card.component.html',
    styleUrls: ['./posts-card.component.scss'],
    animations: [
        trigger('fadeInOut', [
          transition(':enter', [
            style({ opacity: 10 }),
            animate('3000ms', style({ opacity: 1 })),
          ]),
          transition(':leave', [
            animate('300ms', style({ opacity: 0 })),
          ]),
        ]),
      ],
})
export class PostsCardComponent {
    @Input() post: any;
    @Input() showComments: boolean = false;
    @Input() selectedPostId :number |null=null;
    showDeleteButton: boolean = false;
    newCommentText: string = '';
    newCommentDataBuilder: Comment | null = null; 
    isLoggedIn: boolean = false;
    isExpanded :boolean =false;
    showModal :boolean =false;
  private unsubscribe$ = new Subject<void>();

    @Output() viewComments = new EventEmitter<number>();
    @Output() deletePost = new EventEmitter<number>();
    @Output() editPost = new EventEmitter<number>();
    @Output() newCommentData = new EventEmitter<Comment>(); // Emitting Comment object 

    constructor(private router: Router, private authService:AuthService, private postService:PostService) {}

    ngOnInit() {
        if (this.router.url.startsWith('/post/')) {
            const segments = this.router.url.split('/');
            if (segments.length === 3) {
                this.showDeleteButton = true;
            }
        }
        // Initialize newCommentDataBuilder with postId if available
        this.newCommentDataBuilder = {
            postId: this.post.id,
            userId: 0, // Replace with actual userId
            content: '',
            email: '',
            // Optional: Provide default values for other properties if needed
        };


        this.isLoggedIn = this.authService.isLoggedIn();

    // Subscribe to changes in login status
    this.authService.getLoginStatusObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
    }

    omViewCommentsClick(): void {
        this.viewComments.emit(this.post.id);
    }

    onDeletePostClick(): void {
        this.deletePost.emit(this.post.id);
    }

    upvotePost() {
        this.post.votes++;
        this.postService.editPost(this.post);
    }

    downvotePost() {
        this.post.votes--;
        this.postService.editPost(this.post);
    }

    toggleExpand(){
      this.isExpanded=!this.isExpanded
    }
    onSubmit() {
        if (this.newCommentText.trim() !== '') {
            if (this.newCommentDataBuilder) {
                this.newCommentDataBuilder.content = this.newCommentText;
                // Emit the entire comment object
                this.newCommentData.emit(this.newCommentDataBuilder);
                console.log("comment data emitted")
                this.newCommentText = ''; // Clear input after submission
            }
        }
    }

    openCreatePostForm(){
      this.showModal=true;
    }
    closeCreatePostForm(){
      this.showModal=false;
    }
}
