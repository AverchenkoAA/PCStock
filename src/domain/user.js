export function user({login, firstName, lastName, password}){
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.showUser = showUser;
}

function showUser(){
    return "" + this.login +" "+ this.firstName +" "+ this.lastName
}