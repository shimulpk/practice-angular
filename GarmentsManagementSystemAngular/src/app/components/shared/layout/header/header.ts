import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
   standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

   @Output()
  menuClick = new EventEmitter<void>();

  toggleSidebar(): void {

    this.menuClick.emit();

  }
}
