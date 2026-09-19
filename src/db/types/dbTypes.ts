export enum Role {
    admin = "администратор",
    logistician = "логист",
    driver = "водитель",
}

export interface UserData {
    max_id: Number,
    name: String,
    role: Role,
}