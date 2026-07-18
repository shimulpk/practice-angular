import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { StorageService } from '../../../features/auth/services/storage.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
   standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

    @Output()
  menuClick = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private router: Router
  ) {}

  toggleSidebar(): void {
    this.menuClick.emit();
  }

  logout(): void {

    if(confirm('Are you sure you want to logout?')){
      this.authService.logout();
    }

  }

  get user(){
    return this.storage.getUser();
  }

}
