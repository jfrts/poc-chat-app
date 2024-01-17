import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, forkJoin, map, of, switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "./user.model";
import { LocalDB } from "../local-db/local-db";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private http = inject(HttpClient);
  private usersEndpoint = `${environment.urlApi}/users`;

  public getUsers(): Observable<UserData[]> {
    const users = this.http.get<User[]>(this.usersEndpoint);
    const usersDataAndImage = users.pipe(
      switchMap(users => {
        const userImageRequests = users
          .map(user => this.getUserImage(user.id)
            .pipe(
              catchError(_ => of(null)),
              map(image => ({ user, image })))
          );
        return forkJoin(userImageRequests);
      }),

      tap(usersImages => {
        new LocalDB()
          .addUsers(usersImages.map(userImage => ({
            id: userImage.user.id,
            name: userImage.user.name,
            imageBlob: userImage.image
          })));
      }),

      map(usersData => usersData.map(userData => {
        return {
          user: userData.user,
          imageUrl: userData.image && URL.createObjectURL(userData.image)
        } as UserData
      }))
    );
    return usersDataAndImage;
  }

  private getUserImage(userId: string) {
    const userImageEndpoint = `${this.usersEndpoint}/${userId}/image`;
    return this.http.get(userImageEndpoint, { responseType: "blob" });
  }

  public uploadUserImage(userId: string, image: ArrayBuffer) {
    const blobImage = new Blob([image]);
    const formData = new FormData();
    formData.append('image', blobImage);
    const userImageEndpoint = `${this.usersEndpoint}/${userId}/image`;
    return this.http.put(userImageEndpoint, formData);
  }
}

type UserData = {
  user: {
    id: string;
    name: string;
  },
  imageUrl: string
}