import { Component, inject } from '@angular/core';
import { UserService } from '../../../users/user.service';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './conversation-page.component.html',
  styleUrl: './conversation-page.component.scss'
})
export default class ConversationPageComponent {
  private userService = inject(UserService);
  protected userInfo = this.userService.getUserInfoSignal();

  public handleLogoutButton() {
    this.userService.logout();
  }
}
