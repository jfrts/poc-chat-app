import { Component } from '@angular/core';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [UserThumbnailComponent],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.scss'
})
export class ConversationListComponent {

}
