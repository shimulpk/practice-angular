import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  MENU, MenuItem } from './menu';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
   standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  menus: MenuItem[] = MENU;

  
  //  Toggle any menu or submenu
   
  toggle(menu: MenuItem): void {
    menu.expanded = !menu.expanded;
  }

  
  //   Check whether a menu has children
  
  hasChildren(menu: MenuItem): boolean {
    return !!menu.children && menu.children.length > 0;
  }


}
