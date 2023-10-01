const {NlpManager} = require('node-nlp');
const express = require('express');
const manager =new NlpManager(({languages: ['en']}));
const app=express();

//add document
manager.addDocument('en','hello','greeting');
manager.addDocument('en','hi','greeting');
manager.addDocument('en','hey you','greeting');
manager.addDocument('en','yo','greeting');
manager.addDocument('en','good morning','greeting');
manager.addDocument('en','good afternoon','greeting');
manager.addDocument('en','good day','greeting');
manager.addDocument('en','bye bye take care','greetings.bye');
manager.addDocument('en','I must go too ','greetings.bye');
manager.addDocument('en','okay dude,see you later','greetings.bye');
manager.addDocument('en','bye for now','greetings.bye');


//add answers
manager.addAnswer('en','greeting','Hey!');
manager.addAnswer('en','greeting','Hey there');
manager.addAnswer('en','greeting','Hi');
manager.addAnswer('en','greeting','Yo whatsup');
manager.addAnswer('en','greeting','Hi');
manager.addAnswer('en','greeting','Yo whatsup');
manager.addAnswer('en','greetings.bye','Till next time');
manager.addAnswer('en','greetings.bye','See you soon');

//train model
manager.train().then(async ()=> {
    manager.save();
    //route and handler
    app.get('/bot', async (req,res) => {
    let response = await manager.process('en',req.query.message);
    res.send(response.answer || 'please rephrase');
    })
    app.listen(3000);
})