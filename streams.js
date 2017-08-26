#!/usr/bin/env node

const {createReadStream, createWriteStream, appendFile, readFile, writeFile}= require('fs');
const {Transform, Writable}=require('stream');//prototype source
const makeUpperCase = Transform();//creating an instance that inherits the traits of the parent
const writer=Writable();

const userInput=process.argv[2];

if (userInput){
    readFile(userInput,(err, data)=>{
        if (err) return console.error(err);
        process.stdout.write(data);
    });
}else{
//redefine value of _transform and _write properties on 'child' objects?
makeUpperCase._transform=(buffer, _ , next )=>{//what to do to transform the stream & what to do next
    //assume there's no error by putting in null first
    next(null, buffer.toString().toUpperCase());
    //stringify the data pieces and make them upper case
}
writer._write=(buffer, _ , next)=>{
    writeFile('languages_caps.json', buffer, (err)=>{
        //where to write the file, data, error
        if(err) throw err;
        console.log("Testing to see if it got there!");
    });
    next();
};

createReadStream("languages.json").pipe(makeUpperCase).pipe(writer);
//take languages.json, pipe it to transform, pipe to write, output
}