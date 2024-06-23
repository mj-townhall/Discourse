import { Routes } from '@angular/router';
import { PostsCardComponent } from './components/posts-card/posts-card.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PostContentComponent } from './post-content/post-content.component';

export const appRoutes: Routes = [
  { path: '', component: PostContentComponent },
  { path: 'home', component: PostContentComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post/:userId', component: PostContentComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }// Redirect to home page if route not found
];
