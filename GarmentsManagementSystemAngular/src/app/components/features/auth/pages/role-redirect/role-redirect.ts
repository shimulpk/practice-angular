import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-redirect',
   standalone: true,
  imports: [],
  templateUrl: './role-redirect.html',
  styleUrl: './role-redirect.css',
})
export class RoleRedirect implements OnInit{


   constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const role = this.storage.getRole();

    switch (role) {

      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;

      case 'MERCHANDISER':
        this.router.navigate(['/merchandising/dashboard']);
        break;

      case 'STORE_MANAGER':
        this.router.navigate(['/inventory/dashboard']);
        break;

      case 'PURCHASE_MANAGER':
        this.router.navigate(['/procurement/dashboard']);
        break;

      case 'CUTTING_MANAGER':
        this.router.navigate(['/cutting/dashboard']);
        break;

      case 'SEWING_MANAGER':
        this.router.navigate(['/sewing/dashboard']);
        break;

      case 'FINISHING_MANAGER':
        this.router.navigate(['/finishing/dashboard']);
        break;

      case 'PACKING_MANAGER':
        this.router.navigate(['/packing/dashboard']);
        break;

      case 'PRODUCTION_MANAGER':
        this.router.navigate(['/production/dashboard']);
        break;

      default:
        this.router.navigate(['/login']);
    }

  }

}
