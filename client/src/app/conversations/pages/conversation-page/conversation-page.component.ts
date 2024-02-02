import { Component, inject } from '@angular/core';
import { UserService } from '../../../users/user.service';
import { ConversationListComponent } from '../../components/conversation-list/conversation-list.component';
import { ChatAreaComponent } from '../../components/chat-area/chat-area.component';

@Component({
  standalone: true,
  imports: [ConversationListComponent, ChatAreaComponent],
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
