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

    if (!role) {
      this.menus = [];
      return;
    }

    const permission = ROLE_PERMISSIONS[role];

    if (!permission) {
      this.menus = [];
      return;
    }

    this.menus = this.filterMenus(
      MENU,
      permission.modules
    );

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

      const children = menu.children
        ? this.filterMenus(menu.children, allowedModules)
        : [];

      const hasPermission =
        !menu.module ||
        allowedModules.includes(menu.module);

      if (!hasPermission && children.length === 0) {
        return null;
      }

      return {
        ...menu,
        children
      };

    })
    .filter((menu): menu is MenuItem => menu !== null);

}

}