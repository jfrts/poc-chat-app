import { Component, inject } from '@angular/core';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';
import { NewConversationModalComponent } from '../new-conversation-modal/new-conversation-modal.component';
import { UserService } from '../../../users/user.service';
import { UserImage } from '../../../users/user-image.model';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [UserThumbnailComponent, NewConversationModalComponent],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.scss'
})
export class ConversationListComponent {
  protected isModalOpen: boolean = false;
  private _userService = inject(UserService);
  protected userInfo = this._userService.getUserInfoSignal();
  protected userImageURL$ = this._userService.getCurrentUserImage();
  protected loggedUser!: UserImage;

  ngOnInit(): void {
    const subscription = this.userImageURL$.subscribe(imageURL => {
      this.loggedUser = {
        id: this.userInfo()!.id,
        name: this.userInfo()!.name,
        imageUrl: imageURL
      }
    });
  }

  protected toggleModal() {
    this.isModalOpen = !(this.isModalOpen);
  }
}
