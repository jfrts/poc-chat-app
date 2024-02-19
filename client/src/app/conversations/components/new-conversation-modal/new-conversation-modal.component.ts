import { Component } from '@angular/core';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';

@Component({
  selector: 'app-new-conversation-modal',
  standalone: true,
  imports: [UserThumbnailComponent],
  templateUrl: './new-conversation-modal.component.html',
  styleUrl: './new-conversation-modal.component.scss'
})
export class NewConversationModalComponent {

}
