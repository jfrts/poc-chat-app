import Dexie from "dexie";
import { LocalUserImage } from "./local-user-image";
import { from } from "rxjs";

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
}
