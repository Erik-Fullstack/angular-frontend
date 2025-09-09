

export enum MethodType {
    None = 0,
    Create = "createUser",
    Read = "getUser",
    ReadMany = "getAllUsers",
    Update = "updateUser",
    Delete = "deleteUser"
}

export type User = {
    id?: string,
    name: string,
    email?: string,
    password?: string
}