const multer = require('multer')
const path = require('path')
const fs = require('fs')
const uploadFolder = path.join(__dirname, '../uploads')


// check folder
// fs.exists(uploadFolder, (exists) => {
//     exists ? console.log('folder exsits') : fs.mkdir(uploadFolder, (err) => {
//         err ? console.log(err) : console.log('folder created!')
//     })
// })

// creating file storage
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, path.join(path.dirname(__dirname), "uploads"))
    // },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname)
    }

})

// creating file filter
const fileFilter = (req, file, cb) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp'? cb(null, true) : cb({
        message: 'file format not supported'
    }, false)
}

// multer initialization
module.exports = upload = multer({
    storage: storage,
    fileFilter: fileFilter
})