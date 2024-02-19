import { Component, OnInit, inject } from '@angular/core';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';
import { UserService } from '../../../users/user.service';
import { UserImage } from '../../../users/user-image.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [UserThumbnailComponent, AsyncPipe],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.scss'
})
export class ChatAreaComponent implements OnInit {
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
}
