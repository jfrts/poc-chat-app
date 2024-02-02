import { Component } from '@angular/core';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [UserThumbnailComponent],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.scss'
})
export class ChatAreaComponent {

}
