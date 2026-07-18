import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserResponse } from '../../models/user-response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit{
  users: UserResponse[] = [];

  loading = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers(): void {

    this.loading = true;

    this.userService
      .getAll()
      .subscribe({

        next: (res) => {

          this.users = res;

          this.loading = false;
          this.cdr.markForCheck();

          console.log(this.users);


        },

        error: () => {

          this.loading = false;

        }

      });

  }

  edit(id: number): void {

    this.router.navigate([
      '/users/edit',
      id
    ]);

  }

  details(id: number): void {

    this.router.navigate([
      '/users/details',
      id
    ]);

  }

  delete(id: number): void {

    if (!confirm('Are you sure you want to delete this user?')) {

      return;

    }

    this.userService
      .delete(id)
      .subscribe(() => {

        this.loadUsers();

      });

  }

}
