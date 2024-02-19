import { Component } from '@angular/core';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';
import { NewConversationModalComponent } from '../new-conversation-modal/new-conversation-modal.component';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [UserThumbnailComponent, NewConversationModalComponent],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.scss'
})
export class ConversationListComponent {
  protected isModalOpen: boolean = false;

  protected toggleModal() {
    this.isModalOpen = !(this.isModalOpen);
  }
}
