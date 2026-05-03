import Controller from '../../system/controller'
import IResponse from '../../system/interfaces/response.interface'
import { IProduct, IProductNew, IProductUpdate } from './product.interface'
import { ProductModel } from './product.model'
import { Request } from 'express'
import { getUserId } from '../../system/utils/auth.utils'
import { deleteFromCloudinary, uploadBufferToCloudinary } from '../../system/utils/cloudinary.util'
import { ensureWebp } from '../../system/utils/image.util'

export class ProductController extends Controller<IProduct, IProductNew, IProductUpdate> {
    constructor() {
        super()
        this.model = new ProductModel()
    }

    public async createProduct(req: Request): Promise<IResponse> {
        try {
            const newProduct = req.body
            const userId = await getUserId(req)

            if (!req.file) {
                return {
                    statusCode: 400,
                    message: 'Se requiere una imagen para crear el producto',
                }
            }

            const webpBuffer = await ensureWebp(req.file.buffer, req.file.mimetype, {
                quality: 82,
                maxWidth: 1200,
            })

            const { secure_url, public_id } = await uploadBufferToCloudinary(webpBuffer, 'products', {
                format: 'webp',
            })

            const result = await this.model.add({ ...newProduct, product_img: secure_url, public_id: public_id }, userId)

            return {
                statusCode: 200,
                message: 'Producto creado exitosamente',
                data: result!,
            }
        } catch (error: any) {
            return {
                statusCode: 500,
                message: 'Error al crear el producto',
                errorMessage: error.message,
            }
        }
    }

    public async updateProduct(req: Request): Promise<IResponse> {
        try {
            const productId = +req.params.id
            const updatedProduct = req.body
            const userId = await getUserId(req)

            // Buscar el producto actual para manejar la imagen previa
            const currentProduct = await this.model.getById(productId)
            if (!currentProduct) {
                return {
                    statusCode: 404,
                    message: 'Producto no encontrado',
                }
            }

            if (req.file) {
                const webpBuffer = await ensureWebp(req.file.buffer, req.file.mimetype, {
                    quality: 82,
                    maxWidth: 1200,
                })

                const { secure_url, public_id } = await uploadBufferToCloudinary(webpBuffer, 'products', {
                    format: 'webp',
                })

                if (currentProduct.public_id) {
                    await deleteFromCloudinary(currentProduct.public_id).catch((err) =>
                        console.error('Error al eliminar imagen previa:', err.message),
                    )
                }

                updatedProduct.product_img = secure_url
                updatedProduct.public_id = public_id
            }

            const result = await this.model.updateById({ id: productId, record: updatedProduct, userId })

            if (!result) {
                return {
                    statusCode: 404,
                    message: 'Producto no encontrado',
                }
            }

            return {
                statusCode: 200,
                message: 'Producto actualizado exitosamente',
                data: result,
            }
        } catch (error: any) {
            return {
                statusCode: 500,
                message: 'Error al actualizar el producto',
                errorMessage: error.message,
            }
        }
    }

    public async deleteProduct(req: Request): Promise<IResponse> {
        try {
            const product_id = +req.params.id
            const product = await this.model.getById(product_id)

            if (!product) {
                return {
                    statusCode: 404,
                    message: 'Producto no encontrado',
                }
            }

            if (product.public_id) {
                await deleteFromCloudinary(product.public_id).catch((err) => console.error('Error al eliminar imagen de Cloudinary:', err.message))
            }
            const result = await this.model.deleteById(+product_id)

            if (!result) {
                return {
                    statusCode: 404,
                    message: 'Producto no encontrado',
                }
            }

            return {
                statusCode: 200,
                message: 'Producto eliminado exitosamente',
            }
        } catch (error: any) {
            return {
                statusCode: 500,
                message: 'Error al eliminar el producto',
                errorMessage: error.message,
            }
        }
    }
}
