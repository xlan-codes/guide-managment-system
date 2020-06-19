

export class AuthUser {

    constructor(email: string, password: string){
        this.Email = email;
        this.Password = password;
    }

    public Email: string;
    public Password: string;
}
