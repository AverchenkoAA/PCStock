export class User{
    constructor   (login, firstName, lastName, password){
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
    showUser(){
        return "" + this.login +" "+ this.firstName +" "+ this.lastName
    }
}
