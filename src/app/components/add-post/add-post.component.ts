import { Component, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post-comment/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  constructor(private postService:PostService, private toastr :ToastrService){}
  @Output() closeForm = new EventEmitter<void>();
  showModal = false;
  post = {
    title: '',
    content: ''
  };

  submitForm() {
    console.log('Form submitted with:', this.post);
    this.postService.addPost(this.post);
    this.closeForm.emit();
    this.toastr.success("Post created successfully")
    setTimeout(()=> window.location.reload(),1000)
  }

  openCreatePostForm() {
    this.showModal = true;
  }

  onCloseForm() {
    this.closeForm.emit();
    console.log('Closing form...');
  }
}
