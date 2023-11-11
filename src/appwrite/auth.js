//This file is for SignUp (CreateAccount), Login, Logout where it will allow user to create new account
//This code Snippet is very usefull

import conf from "../conf/conf"
import {Client,Account,ID} from "appwrite";
//all these this of creating the account, login are given in appwrite->authentication docs
class  AuthService{
    client = new Client();  // create from the Client that is imported from appwrite  
    account; //client and account are variables

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl) //Pass the API endpoint from the  environment variable 
        .setProject(conf.appWriteProjectId);//Pass the Project Id  from the  environment variable 
        this.account = new Account(this.client); //This creates object of Account
        

    }

    //we will get email, password and name in the Object and we have to destructure it
    //There is a chance for not creating an account so we use try and catch
    //we are using methods to create Account because in future if we want to create account using other backend service(eg: fire base instead of Appwrite) in such condition we need to change the code inside the method
    async createAccount({email,password,name}){
        try{
            //To know what parameters to pass to create new accout refer appwrite documnetation
                const userAccount=this.account.create(ID.unique(),email,password,name);

                if (userAccount) {
                    //Call another method so if the user account is created user can redirected be login
                    return this.login({email,password})
                } else {
                    return userAccount; //if not created handle it with the error we got in userAccount
                }
        }
        catch(err){
            throw err;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);

            
        } catch (error) {
            throw error;
        }
    }


    async getCurrentUser(){
         //used this method to check weather the user has directly entered the home page
        try {
           return await this.account.get();
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    //deleteSession is logout in appwrite documentation

async logout(){
    try {
        await this.account.deleteSessions(); //this will logout the user from all the browsers because we have used the deleteSessions not the deleteSession
    } catch (error) {
        console.log(error);
        throw error;
    }
}
}

const authService = new AuthService(); //Instead of passing the class we can pass an object so that user can access all methods(createAccount, login, logout) with worrying about creating object

export default authService;