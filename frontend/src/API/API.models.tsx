export interface UserData {
    id: number,
    username: string,
    email: string, 
    password: string,
    elections: [],
}

export interface UserCreate {
    username: string | undefined, 
    email: string | undefined, 
    password: string | undefined
}
