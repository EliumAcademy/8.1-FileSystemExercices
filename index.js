const path = require("path")
const fs = require("fs")


function allFilesInOnefolder (dirPath){
    return  fs.readdirSync(dirPath).filter( (name) => !fs.lstatSync(path.join(dirPath,name)).isDirectory() )
}

module.exports.allFilesInPath = function  (dirPath){
    let fl1 = fs.readdirSync(dirPath)
    fileList = []
    fl1.map( (name) => {
        let pathtodir = path.join(dirPath, name)
        if (fs.lstatSync(pathtodir).isDirectory()) {
            fileList = fileList.concat(allFilesInOnefolder(pathtodir)) 
        } else {
            fileList.push(name)
        }
    })
    return fileList
}




function deleteallFilesInOnefolder (dirPath){
    return  fs.readdirSync(dirPath).map( (name) =>{
        let pathtodir = path.join(dirPath, name)
        if(!fs.lstatSync(pathtodir).isDirectory()){
            fs.unlinkSync(pathtodir)
        }
    })
}

module.exports.deleteAllFiles = function  (dirPath){
    let fl1 = fs.readdirSync(dirPath)
    fl1.map( (name) => {
        let pathtodir = path.join(dirPath, name)
        if (fs.lstatSync(pathtodir).isDirectory()) {
            deleteallFilesInOnefolder(pathtodir)
        } else {
            fs.unlinkSync(pathtodir)
        }
    })
    return fileList
}


function deleteallFilesInOnefolderConditional (dirPath, condition){
    return  fs.readdirSync(dirPath).map( (name) =>{
        let pathtodir = path.join(dirPath, name)
        let match     = (path.basename(pathtodir) === path.basename(pathtodir, condition))
        if(!fs.lstatSync(pathtodir).isDirectory() && match){
            fs.unlinkSync(pathtodir)
        }
    })
}

module.exports.deleteAllFileslike = function  (dirPath, condition){
    let fl1 = fs.readdirSync(dirPath)
    fl1.map( (name) => {
        let pathtodir = path.join(dirPath, name)
        let match     = (path.basename(pathtodir) !== path.basename(pathtodir, condition))
        if (fs.lstatSync(path.join(dirPath, name)).isDirectory()) {
            deleteallFilesInOnefolderConditional(pathtodir)
        } else if (match) {
            fs.unlinkSync(pathtodir)
        }
    })
    return fileList
}




module.exports.mkFileIn = function (data, ...list){
    let last = list.slice(-1)[0]
    let totPath = ""
    for( ele in list){
        totPath = path.join(totPath, list[ele])
        if(list[ele] === last){
            fs.writeFileSync(totPath, data)
        } else{
            if(!fs.existsSync(totPath)) fs.mkdirSync(totPath)
        }
    }
}