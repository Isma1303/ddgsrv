import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary'
import configuration from '../../config'

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = configuration.CLOUDINARY_URL

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error(
        'Faltan credenciales de Cloudinary. Verifica las variables de entorno:',
        'CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET',
    )
} else {
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    })

    console.log(`Conexión configurada correctamente a Cloudinary`)
}

/**
 * Sube un buffer de imagen a Cloudinary.
 * @param buffer  Buffer del archivo (proveniente de multer memoryStorage)
 * @param folder  Carpeta destino en Cloudinary (ej. 'products')
 * @param options Opciones adicionales de Cloudinary
 */
export const uploadBufferToCloudinary = (buffer: Buffer, folder: string = 'uploads', options: UploadApiOptions = {}): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadOptions: UploadApiOptions = {
            folder,
            use_filename: false,
            unique_filename: true,
            overwrite: false,
            resource_type: 'auto',
            format: 'webp', // forzar salida webp en Cloudinary también
            ...options,
        }

        const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) {
                console.error('Error al subir archivo:', error.message)
                return reject(error)
            }
            if (!result) {
                return reject(new Error('La respuesta del upload fue vacía'))
            }
            resolve(result)
        })

        uploadStream.end(buffer)
    })
}

/**
 * Sube un archivo desde URL o path local a Cloudinary.
 * @param source  URL pública o path local del archivo
 * @param folder  Carpeta destino en Cloudinary
 * @param options Opciones adicionales de Cloudinary
 */
export const uploadToCloudinary = async (source: string, folder: string = 'uploads', options: UploadApiOptions = {}): Promise<UploadApiResponse> => {
    const uploadOptions: UploadApiOptions = {
        folder,
        use_filename: false,
        unique_filename: true,
        overwrite: false,
        resource_type: 'auto',
        format: 'webp',
        ...options,
    }

    const result = await cloudinary.uploader.upload(source, uploadOptions)
    return result
}

/**
 * Elimina un archivo de Cloudinary por su public_id
 * @param publicId  Public ID del recurso en Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    const result = await cloudinary.uploader.destroy(publicId)
    if (result.result !== 'ok') {
        throw new Error(`No se pudo eliminar el recurso: ${publicId}`)
    }
}

export default cloudinary
