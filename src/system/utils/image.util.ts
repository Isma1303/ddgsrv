import sharp from 'sharp'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface WebpConversionOptions {
    /** Calidad de la imagen WebP (1-100). Default: 82 */
    quality?: number
    /** Redimensionar manteniendo proporción (ancho máximo en px). Default: sin cambio */
    maxWidth?: number
    /** Redimensionar manteniendo proporción (alto máximo en px). Default: sin cambio */
    maxHeight?: number
}

// ─── MIME types de imagen soportados ─────────────────────────────────────────

const IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'image/avif',
    'image/heic',
    'image/heif',
    'image/webp',
]

// ─── Funciones ────────────────────────────────────────────────────────────────

/**
 * Devuelve `true` si el MIME type corresponde a una imagen soportada.
 */
export const isImageMimeType = (mimeType: string): boolean =>
    IMAGE_MIME_TYPES.includes(mimeType.toLowerCase())

/**
 * Convierte un buffer de imagen a WebP.
 * Si la imagen ya es WebP solo reencoda para normalizar metadatos.
 *
 * @param buffer   Buffer original del archivo (proveniente de multer memoryStorage)
 * @param mimetype MIME type original del archivo
 * @param options  Opciones de calidad y redimensionado
 * @returns        Buffer WebP convertido
 */
export const convertToWebp = async (
    buffer: Buffer,
    mimetype: string,
    options: WebpConversionOptions = {},
): Promise<Buffer> => {
    const { quality = 82, maxWidth, maxHeight } = options

    if (!isImageMimeType(mimetype)) {
        throw new Error(
            `[ImageUtil] El archivo con MIME type "${mimetype}" no es una imagen soportada para conversión a WebP.`,
        )
    }

    let pipeline = sharp(buffer)

    // Redimensionar solo si se especifica
    if (maxWidth || maxHeight) {
        pipeline = pipeline.resize({
            width: maxWidth,
            height: maxHeight,
            fit: 'inside',          // mantiene proporción sin recortar
            withoutEnlargement: true, // no agranda si ya es más pequeña
        })
    }

    const webpBuffer = await pipeline.webp({ quality }).toBuffer()

    const originalKB = (buffer.length / 1024).toFixed(1)
    const convertedKB = (webpBuffer.length / 1024).toFixed(1)
    const saving = (((buffer.length - webpBuffer.length) / buffer.length) * 100).toFixed(1)

    console.log(
        `[ImageUtil] ✅ Convertido a WebP: ${originalKB}KB → ${convertedKB}KB (${saving}% reducción)`,
    )

    return webpBuffer
}

/**
 * Convierte el buffer solo si NO es ya un WebP; si ya lo es lo devuelve tal cual.
 * Útil cuando no quieres re-encodar innecesariamente.
 */
export const ensureWebp = async (
    buffer: Buffer,
    mimetype: string,
    options: WebpConversionOptions = {},
): Promise<Buffer> => {
    if (mimetype === 'image/webp') {
        console.log('[ImageUtil] ℹ️  El archivo ya es WebP, se omite conversión.')
        return buffer
    }
    return convertToWebp(buffer, mimetype, options)
}
