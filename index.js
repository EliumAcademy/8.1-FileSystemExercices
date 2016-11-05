const path = require("path")
const fs = require("fs")

// All functionalities here should be syncronouse!

// Write a syncronouse function called allFilesInPath(path) that takes a path and returns the names (not the path)
// all the files (not Directories) in each of its sub directories - Do not make it recursive
// The path given can both be absolute and relative


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


// Write a syncronouse function called deleteAllFiles(fileType) that deletes all files that end with the given filetype.
// If a directory is present it should try to delete all the files in the subdirectory aswell - Do not make it recursive


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

// Write a syncronouse function called deleteAllFileslike(fileType) that deletes all files that end with the given filetype.
// If a directory is present it should try to delete all the files in the subdirectory aswell - Do not make it recursive

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


// Write a syncronouse function called mkFileIn("data" , ...listOfFolders) that creates a file with the given data.
// The file name should be the last element in listOfFolders.
// The element in listOfFOlders should describe a path relative to the location of the file containing such functionality - Do not make it recursive

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