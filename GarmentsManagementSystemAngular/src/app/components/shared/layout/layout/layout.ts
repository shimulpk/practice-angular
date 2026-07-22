import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout',
   standalone: true,
  imports: [ CommonModule,
    RouterOutlet,
    Sidebar,
    Header,
    Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  
}
