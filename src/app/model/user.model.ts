export class User {
    userId: number;
    username: string;
    userPassword: string;
    email: string;
    role: string;
    profilePicture: ArrayBuffer;

    constructor(userId: number, username: string, userPassword: string, email: string, role: string, profilePicture: ArrayBuffer) {
        this.userId = userId;
        this.username = username;
        this.userPassword = userPassword;
        this.email = email;
        this.role = role;
        this.profilePicture = profilePicture;
    }
}
