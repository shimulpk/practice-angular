import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserResponse } from '../../models/user-response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
 standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit{

 user?: UserResponse;

  loading = false;

  constructor(

    private userService: UserService,

    private route: ActivatedRoute,

    private router: Router

  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {

      this.loadUser(id);

    }

  }

  loadUser(id: number): void {

    this.loading = true;

    this.userService
      .getById(id)
      .subscribe({

        next: (res) => {

          this.user = res;

          this.loading = false;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  back(): void {

    this.router.navigate([
      '/users'
    ]);

  }


}
