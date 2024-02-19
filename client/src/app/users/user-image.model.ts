import { User } from "./user.model"

export type UserImage = {
    imageUrl: string | null
} & User;