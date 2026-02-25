/**
 *@swagger
 *tags:
 *  name: Opcion Menu
 *  description: Documentación de Opcion Menu
 */
/**
 *@swagger
 *paths:
 *  /opcion_menu:
 *    get:
 *      operationId: obtenerOpcion_menus
 *      summary: Devuelve todos los registros de la tabla `opciones_menu`
 *      tags: [Opcion Menu]
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
 *                $ref: '#/components/schemas/OpcionMenu'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: crearOpcion_menu
 *      summary: Crea un registro en la tabla `opciones_menu`
 *      tags: [Opcion Menu]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `opciones_menu`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OpcionMenu'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OpcionMenu'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `opciones_menu`
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
 *  /opcion_menu/{menu_option_id}:
 *    put:
 *      operationId: actualizarOpcion_menu
 *      summary: Actualiza un registro en la tabla `opciones_menu`
 *      tags: [Opcion Menu]
 *      parameters:
 *        - in: path
 *          name: menu_option_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de opciones_menu
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `opciones_menu`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OpcionMenu'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro actualizado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OpcionMenu'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `opciones_menu`
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
 *      operationId: eliminarOpcion Menu
 *      summary: Elimina el registro de la tabla `opciones_menu` que tenga el id enviado como parámetro
 *      tags: [Opcion Menu]
 *      parameters:
 *        - in: path
 *          name: menu_option_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de opciones_menu
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
 *                        $ref: "#/components/schemas/OpcionMenu"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/OpcionMenu/example"
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
 *      operationId: obtenerOpcion Menu
 *      summary: Devuelve el registro con el id indicado por los parámetros de la tabla `opciones_menu`
 *      tags: [Opcion Menu]
 *      parameters:
 *        - in: path
 *          name: menu_option_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de opciones_menu
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
 *                        $ref: "#/components/schemas/OpcionMenu"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/OpcionMenu/example"
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
 *  /opcion_menu/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla `opciones_menu`
 *      tags: [Opcion Menu]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "field": "menu_option_id", "value": 1, "operador": "between", "valueComparacion": 5 } ]
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
 *                $ref: '#/components/schemas/OpcionMenu'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /opcion_menu/getMenuOptions:
 *    get:
 *      operationId: getMenuOptions
 *      summary: Devuelve las opciones de menú formateadas según lo necesario en DevExtreme
 *      tags: [Opcion Menu]
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/OpcionMenuDevExtreme'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /opcion_menu/getMenuOptionsAnidadas:
 *    get:
 *      operationId: getMenuOptionsAnidadas
 *      summary: Devuelve las opciones de menú formateadas según lo necesario en DevExtreme
 *      tags: [Opcion Menu]
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/OpcionMenuAnidadas'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /opcion_menu/getTotalRecords:
 *    get:
 *      operationId: getTotalRecords
 *      summary: Devuelve todos los registros de la tabla `opciones_menu`
 *      tags: [Opcion Menu]
 *      responses:
 *        200:
 *          description: Devuelve un objeto con la property totalRegistros
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalRegistros:
 *                    type: integer
 *                example:
 *                  totalRegistros: 100
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 */
