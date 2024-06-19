import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../axios.service';

export interface Post {
  id:number;
  content: string;
  email: string;
  votes: number ;
  timeStampMillis: number;
  date?: Date;
}

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  data: Post[] = [];

  constructor(private axiosService: AxiosService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.axiosService.request('GET', '/posts', {}).then(
      (response) => {
        this.data = response.data as Post[];
        this.convertToDate(); // Call method to convert timeStampMillis to Date
        this.sortDataByTimestamp(); // Call method to sort data by timeStampMillis
      }).catch(
      (error) => {
        console.error('Error fetching posts:', error);
        if (error.response && error.response.status === 401) {
          this.axiosService.setAuthToken(null);
        } else {
          this.data = []; // Handle error case by resetting data
        }
      }
    );
  }

  convertToDate(): void {
    this.data.forEach(post => {
      post.date = new Date(post.timeStampMillis);
    });
  }

  sortDataByTimestamp(): void {
    this.data.sort((a, b) => b.timeStampMillis - a.timeStampMillis);
  }
}
