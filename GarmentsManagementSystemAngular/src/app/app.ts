import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/shared/layout/sidebar/sidebar';
import { Header } from './components/shared/layout/header/header';
import { Footer } from './components/shared/layout/footer/footer';

@Component({
  selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet,Sidebar,Header,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('GarmentsManagementSystemAngular');

   sidebarCollapsed = false;

  toggleSidebar(){

    this.sidebarCollapsed = !this.sidebarCollapsed;

  }
}
