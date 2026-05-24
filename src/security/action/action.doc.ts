/**
 *@swagger
 *tags:
 *  name: Accion
 *  description: Documentación de Accion
 */
/**
 *@swagger
 *paths:
 *  /action:
 *    get:
 *      operationId: obtenerAccions
 *      summary: Devuelve todos los registros de la tabla `actions`
 *      tags: [Accion]
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
 *                $ref: '#/components/schemas/Accion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: crearAccion
 *      summary: Crea un registro en la tabla `actions`
 *      tags: [Accion]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `actions`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Accion'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Accion'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `actions`
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
 *  /action/{action_id}:
 *    put:
 *      operationId: actualizarAccion
 *      summary: Actualiza un registro en la tabla `actions`
 *      tags: [Accion]
 *      parameters:
 *        - in: path
 *          name: action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de actions
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `actions`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Accion'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro actualizado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Accion'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `actions`
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
 *      operationId: eliminarAccion
 *      summary: Elimina el registro de la tabla `actions` que tenga el id enviado como parámetro
 *      tags: [Accion]
 *      parameters:
 *        - in: path
 *          name: action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de actions
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
 *                        $ref: "#/components/schemas/Accion"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/Accion/example"
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
 *      operationId: obtenerAccion
 *      summary: Devuelve el registro con el id indicado por los parámetros de la tabla `actions`
 *      tags: [Accion]
 *      parameters:
 *        - in: path
 *          name: action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de actions
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
 *                        $ref: "#/components/schemas/Accion"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/Accion/example"
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
 *  /action/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla `actions`
 *      tags: [Accion]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "field": "action_id", "value": 1, "operador": "between", "valueComparacion": 5 } ]
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
 *                $ref: '#/components/schemas/Accion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /action/getTotalRecords:
 *    get:
 *      operationId: getTotalRecords
 *      summary: Devuelve todos los registros de la tabla `actions`
 *      tags: [Accion]
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
