import { Routes } from '@angular/router';
import { PostsCardComponent } from './components/posts-card/posts-card.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PostContentComponent } from './page-content/post-content.component';

export const appRoutes: Routes = [
  { path: '',title:"Home", component: PostContentComponent },
  { path: 'home',title:"Home", component: PostContentComponent },
  { path: 'signup',title:"Signup", component: SignupComponent },
  { path: 'login',title:"Login", component: LoginComponent },
  { path: 'post/:userId',title:"My Posts", component: PostContentComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }// Redirect to home page if route not found
];
