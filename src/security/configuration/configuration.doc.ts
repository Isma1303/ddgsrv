/**
 *@swagger
 *tags:
 *  name: Configuracion
 *  description: Documentación de Configuracion
 */
/**
 *@swagger
 *paths:
 *  /configuracion:
 *    get:
 *      operationId: obtenerConfiguracions
 *      summary: Devuelve todos los registros de la tabla `configuraciones`
 *      tags: [Configuracion]
 *      parameters:
 *        - in: header
 *          name: offset
 *          schema:
 *            type: integer
 *          description: Desde que número de registro se hará la consulta
 *        - in: header
 *          name: limit
 *          schema:
 *            type: integer
 *          description: Cuántos registros deben obtenerse
 *        - in: header
 *          name: orden
 *          schema:
 *            type: string
 *          description: Campo sobre el que se ordenará el result
 *        - in: header
 *          name: detalles
 *          schema:
 *            type: integer
 *          description: Incluir los detalles en los registros 1 o 0
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/Configuracion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: crearConfiguracion
 *      summary: Crea un registro en la tabla `configuraciones`
 *      tags: [Configuracion]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `configuraciones`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Configuracion'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Configuracion'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `configuraciones`
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorDetails'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /configuracion/{configuracion_id}:
 *    put:
 *      operationId: actualizarConfiguracion
 *      summary: Actualiza un registro en la tabla `configuraciones`
 *      tags: [Configuracion]
 *      parameters:
 *        - in: path
 *          name: configuracion_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de configuraciones
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `configuraciones`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Configuracion'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro actualizado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Configuracion'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `configuraciones`
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorDetails'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    delete:
 *      operationId: eliminarConfiguracion
 *      summary: Elimina el registro de la tabla `configuraciones` que tenga el id enviado como parámetro
 *      tags: [Configuracion]
 *      parameters:
 *        - in: path
 *          name: configuracion_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de configuraciones
 *      responses:
 *        200:
 *          description: Devuelve un objeto con el mensaje de eliminación
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/ResponseMessage"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/Configuracion"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/Configuracion/example"
 *        404:
 *          description: Devuelve un objeto con un mensaje que indica que no se encontró el registro que se desea eliminar
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/ResponseMessage"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                    example:
 *                      data: []
 *        500:
 *          description: Error del Servidor
 *    get:
 *      operationId: obtenerConfiguracion
 *      summary: Devuelve el registro con el id indicado por los parámetros de la tabla `configuraciones`
 *      tags: [Configuracion]
 *      parameters:
 *        - in: path
 *          name: configuracion_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de configuraciones
 *      responses:
 *        200:
 *          description: Devuelve un objeto con el registro encontrado
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/ResponseMessage"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/Configuracion"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/Configuracion/example"
 *        404:
 *          description: Devuelve un arreglo vacío
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/ResponseMessage"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                    example:
 *                      data: []
 *        500:
 *          description: Error del Servidor
 *  /configuracion/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla `configuraciones`
 *      tags: [Configuracion]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "field": "configuracion_id", "value": 1, "operador": "between", "valueComparacion": 5 } ]
 *          description: Desde que número de registro se hará la consulta
 *        - in: header
 *          name: offset
 *          schema:
 *            type: integer
 *          description: Desde que número de registro se hará la consulta
 *        - in: header
 *          name: limit
 *          schema:
 *            type: integer
 *          description: Cuántos registros deben obtenerse
 *        - in: header
 *          name: orden
 *          schema:
 *            type: string
 *          description: Campo sobre el que se ordenará el result
 *        - in: header
 *          name: detalles
 *          schema:
 *            type: boolean
 *          description: Incluir los detalles en los registros
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/Configuracion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 */
