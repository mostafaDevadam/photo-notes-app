export type RESPONSE_TYPE<T> = {
    statusCode: number,
    message: string,
    data: T,
}

export type USER_TYPE = {
    _id?: string,
    id?: string,
    name?: string,
    fullName?: string,
    email?: string,
    accessToken?: string
}

export type NOTE_TYPE = {
    _id?: string,
    content?: string,
    isPublic?: boolean
    user?: USER_TYPE | any,
    createdAt?: string,
    updatedAt?: string,
}

export type FOLDER_TYPE = {
    _id?: string,
    name?: string,
    description?: string,
    user?: USER_TYPE | any,
    createdAt?: string,
    updatedAt?: string,
}

export type PHOTO_TYPE = {
    _id?: string
    url?: string
    description?: string
    folder?: FOLDER_TYPE | any
    note?: NOTE_TYPE | any
    user?: USER_TYPE | any
}

export type SHARE_TYPE = {
    _id?: string
    share?: NOTE_TYPE | PHOTO_TYPE | FOLDER_TYPE | any
    state?: string
    user?: USER_TYPE | any

}

export type INVITATION_TYPE = {
    _id?: any
    note?: NOTE_TYPE | any
    sender?: USER_TYPE | any
    receiver?: USER_TYPE | any
    message?: string
    user?: USER_TYPE | any
    isInvited?: boolean;
    isConfirmed?: boolean;
    isCanceled?: boolean

}

export type COLLABORATION_TYPE = {
    _id?: any
    members: USER_TYPE[] | any[]
    note?: NOTE_TYPE | any
}

export type UPLOAD_TYPE = {
    file: File
}

export type SERVER_ACTION_PAYLOAD_TYPE<T> = {
    success?: boolean,
    error?: string,
    data?: T | any

}