import multer = require('multer')

const storage = multer.memoryStorage()
const maxSize = 5 * 1024 * 1024

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword', // doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
        'application/vnd.ms-excel', // xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
        'text/plain',
        'application/json',
    ]

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('File type not allowed'), false)
    }
}

const uploadStrategy = multer({ storage, limits: { fileSize: maxSize }, fileFilter })

const imageUploadConfig = uploadStrategy.single('image')
const singleFileUploadConfig = uploadStrategy.single('file')
const multipleFilesUploadConfig = uploadStrategy.array('files', 10)
const singleFileWithStorageUploadConfig = multer({ storage }).single('file')

export { singleFileUploadConfig, imageUploadConfig, multipleFilesUploadConfig, singleFileWithStorageUploadConfig }
