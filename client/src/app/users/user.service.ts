import { HttpClient } from "@angular/common/http";
import { Injectable, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, forkJoin, map, of, switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { LocalDB } from "../local-db/local-db";
import { UserStorageInfo } from "./user-storage-info.model";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private usersEndpoint = `${environment.urlApi}/users`;
  private userInfo = signal<UserStorageInfo | null>(null);

  constructor() {
    effect(() => {
      window.localStorage.setItem("chat-userInfo", JSON.stringify(this.userInfo()));
    })
  }

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

  public getUserInfoSignal() {
    return this.userInfo.asReadonly();
  }

  public uploadUserImage(userId: string, image: ArrayBuffer) {
    const blobImage = new Blob([image]);
    const formData = new FormData();
    formData.append('image', blobImage);
    const userImageEndpoint = `${this.usersEndpoint}/${userId}/image`;
    return this.http.put(userImageEndpoint, formData);
  }

  public setCurrentUser(user: UserStorageInfo) {
    this.userInfo.set(user);
  }

  public login(userId: string): Observable<UserStorageInfo> {
    const authEndPoint = `${environment.urlApi}/auth`;
    return this.http.post<UserStorageInfo>(authEndPoint, { userId });
  }

  public logout(): void {
    this.userInfo.set(null);
    window.localStorage.removeItem("chat-userInfo")
    this.router.navigate(["login"]);
  }

  public isUserLogged(): boolean {
    return !!this.userInfo();
  }

  public trySyncLocalStorage(): void {
    const localStorageData = localStorage.getItem("chat-userInfo");

    if (!localStorageData) {
      return;
    }

    const userData: UserStorageInfo = JSON.parse(localStorageData);
    this.userInfo.set(userData);
  }
}

type UserData = {
  user: {
    id: string;
    name: string;
  },
  imageUrl: string
}