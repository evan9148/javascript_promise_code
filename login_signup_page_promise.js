var fs = require("fs");
var readlinesync = require("readline-sync");
var candidate = readlinesync.question("enter your choice whether you want to login / signup:  ")
function signup(){
    if (candidate === "signup"){
        var passwordvalidation = new Promise((resolve,reject) => {
            function Password (){
               if (password.includes("@") || password.includes("#")) {
                    if (password == confirmation_password) {
                        resolve("valid")
                    } else {
                        reject("both are not same")
                    }
                } else {
                    reject("At password contain one special character and one number")
                }
            }
            var readlinesync = require("readline-sync");
            var username = readlinesync.question("enter your username:-   ")
            var password = readlinesync.question("enter your password:-   ");
            var confirmation_password = readlinesync.question("enter your confirmation_password:-   ");
            Password();
        
            var writingfile = (file,data) => {
                return new Promise((resolve,reject) => {
                    fs.writeFile(file, data , (err) => {
                        if(err) {
                            reject("not yet wriiten the complete data", err)
                        }else{
                            resolve("successfully has written the file")
                        }
                    });
                });
            }
            var json_object = { "user": [{ "username": username, "password": password }] };
            var json_data = JSON.stringify(json_object,null,2)
            console.log(json_data)
            writingfile('./user_details.json',json_data).then((message) => {
                console.log(message)
            }).catch((error) => {
                console.log(error)
            })
        
            var readingfile = (file,data) => {
                return new Promise((resolve,reject) => {
                    fs.readFile(file, (err,data) => {
                        if (err) throw err;
                        let convert_data = JSON.parse(data)
                        console.log(convert_data)
                        var value = data["user"]
                        console.log(value)
                        if (username == value[0]["username"]) {
                            resolve ("already exists")
                        }
                    });
                })
            }
            readingfile("user_details.json",data).then((messege) => {
                console.log("succesfully read the file data",messege)
            }).catch((error) => {
                console.log("not had read the file data",error)
            })
        
        
        });
        passwordvalidation.then((message) => {
            console.log(message)
        }).catch((error) => {
            console.log(error)
        })    
    }
}
signup();
