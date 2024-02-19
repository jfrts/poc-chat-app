import Dexie from "dexie";
import { defer, from, map } from "rxjs";
import { LocalUserImage } from "./local-user-image";

export class LocalDB {
    private localDB = new Dexie("chat-app");
    private get userTable() {
        return this.localDB.table<LocalUserImage>("users");
    }

    constructor() {
        this.localDB
            .version(1)
            .stores({
                users: "&id, name, imageBlob"
            });
    }

    addUsers(users: LocalUserImage[]) {
        return from(this.userTable.bulkPut(users));
    }

    getUsers() {
        return defer(() => this.userTable.toArray());
    }

    getUserImage(userId: string) {
        return from(this.userTable.get(userId))
            .pipe(
                map(localUserImageBlob => localUserImageBlob!.imageBlob)
            );
    }
}
