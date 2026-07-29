import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotificationComponent } from '../../components/NotificationComponent/notification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  // Interpolation
  portalName = 'Student Course Portal';

  // Property Binding
  isPortalActive = true;

  // Event Binding
  message = '';

  // Two-Way Binding
  searchTerm = '';

  constructor() {}

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
