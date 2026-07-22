import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MENU, MenuItem } from './menu';

import { StorageService } from '../../../features/auth/services/storage.service';
import { Role } from '../../../features/user/models/role';
import { ROLE_PERMISSIONS } from '../../../../core/security/role-permissions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  menus: MenuItem[] = [];

  constructor(
    private storage: StorageService
  ) {}

  ngOnInit(): void {
     console.log('Sidebar Init');
    this.loadMenu();
  }

  toggle(menu: MenuItem): void {
    menu.expanded = !menu.expanded;
  }

  hasChildren(menu: MenuItem): boolean {
    return !!menu.children?.length;
  }

  // ==========================
  // Load Menu by Role
  // ==========================

  private loadMenu(): void {

    const role = this.storage.getRole() as Role;

      console.log("ROLE =", role);

    if (!role) {
      this.menus = [];
      return;
    }

    const permission = ROLE_PERMISSIONS[role];

      console.log("PERMISSION =", permission);

    if (!permission) {
      this.menus = [];
      return;
    }

    this.menus = this.filterMenus(
      MENU,
      permission.modules
    );
      console.log("FILTERED MENU =", this.menus);

  }

  // ==========================
  // Recursive Menu Filter
  // ==========================

private filterMenus(
  menus: MenuItem[],
  allowedModules: string[]
): MenuItem[] {

  return menus
    .map((menu): MenuItem | null => {

      // Parent module check
      const selfAllowed =
        menu.module
          ? allowedModules.includes(menu.module)
          : true;

      // যদি parent module না থাকে, child filter করো
      const children = menu.children
        ? this.filterMenus(menu.children, allowedModules)
        : [];

      // যদি parent-এর module থাকে এবং permission না থাকে
      // তাহলে পুরো branch বাদ
      if (menu.module && !selfAllowed) {
        return null;
      }

      return {
        ...menu,
        expanded: false,
        children
      };

    })
    .filter((menu): menu is MenuItem => menu !== null);

}

}