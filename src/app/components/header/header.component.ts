import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  private unsubscribe$ = new Subject<void>();
  showModal :boolean=false;
  showMyPostButton :boolean =true;
  currentUserName :string | null ="";
  showLogout  : boolean =false;
  isDropdownOpen :boolean=false
  // toastr=inject(ToastrService);
  constructor(private router: Router, private authService: AuthService, private toastr:ToastrService) { }

  ngOnInit() {
    // Initialize isLoggedIn based on current authentication status
    this.isLoggedIn = this.authService.isLoggedIn();

    // Subscribe to changes in login status
    this.authService.getLoginStatusObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.currentUserName= localStorage.getItem("user_name")
      });
      console.log(this.currentUserName)
      // to check currently showing my post or all post
  }
  isShowingAllPost():boolean{
    if (this.router.url.startsWith('/post/')) {
      const segments = this.router.url.split('/');
      if (segments.length === 3) { // Expecting '/posts/:userId', so segments length should be 3
        this.showMyPostButton=false;
      }
    }else this.showMyPostButton=true;
    // console.log(this.showMyPostButton)
    return this.showMyPostButton;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.toastr.success("Logged Out")
  }

  navigateToSignupPage() {
    this.router.navigate(['/signup']);
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  navigateToHomePage() {
    this.showMyPostButton=false;
    this.router.navigate(['/home']);
  }

  navigateToMyPost(){
    this.router.navigate(['/post', this.authService.getUserId()]);
    }
    
  addPost(){
    this.router.navigate(['/addPost']);
  }

  openCreatePostForm() {
    this.showModal = true;
  }

  closeCreatePostForm() {
    this.showModal = false;
  }

  toggleLogout(): void {
    this.showLogout = !this.showLogout;
  }

  toggleDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen
  }
}
