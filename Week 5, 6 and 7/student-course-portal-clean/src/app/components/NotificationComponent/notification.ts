import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],

  // Component-level provider creates a new NotificationService
  // instance that is scoped only to this component and its children.
  providers: [NotificationService],

  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {
    this.notificationService.setMessage('Welcome to Student Course Portal!');
  }

  get message(): string {
    return this.notificationService.getMessage();
  }
}
