/**
 *@swagger
 *tags:
 *  name: System Actions
 *  description: Documentación de System Actions
 */
/**
 *@swagger
 *paths:
 *  /system_actions:
 *    get:
 *      operationId: getAllSystemActions
 *      summary: Devuelve todos los registros de la tabla `System_actions`
 *      tags: [System Actions]
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
 *          description: Campo sobre el que se ordenará el resultado
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
 *                $ref: '#/components/schemas/SystemAction'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el usuario
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: createSystemAction
 *      summary: Crea un registro en la tabla `System_actions`
 *      tags: [System Actions]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propiedades requeridas para la tabla `System_actions`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SystemAction'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SystemAction'
 *        400:
 *          description: Solicitud incorrecta, una o más propiedades del objeto enviado no cumplen con lor requisitos de la tabla `System_actions`
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorDetails'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el usuario
 *        500:
 *          description: Error del Servidor
 *  /system_actions/{system_action_id}:
 *    put:
 *      operationId: updateSystemAction
 *      summary: Actualiza un registro en la tabla `System_actions` que tenga el id enviado como parámetro
 *      tags: [System Actions]
 *      parameters:
 *        - in: path
 *          name: system_action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de System_actions
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propiedades requeridas para la tabla `System_actions`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SystemAction'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro actualizado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SystemAction'
 *        400:
 *          description: Solicitud incorrecta, una o más propiedades del objeto enviado no cumplen con lor requisitos de la tabla `System_actions`
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorDetails'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el usuario
 *        500:
 *          description: Error del Servidor
 *    delete:
 *      operationId: deleteSystemAction
 *      summary: Elimina el registro de la tabla `System_actions` que tenga el id enviado como parámetro
 *      tags: [System Actions]
 *      parameters:
 *        - in: path
 *          name: system_action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de System_actions
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
 *                        $ref: "#/components/schemas/SystemAction"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/SystemAction/example"
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
 *      operationId: getSystemActionById
 *      summary: Devuelve el registro con el id indicado por los parámetros de la tabla `System_actions`
 *      tags: [System Actions]
 *      parameters:
 *        - in: path
 *          name: system_action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador único de System_actions
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
 *                        $ref: "#/components/schemas/SystemAction"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/SystemAction/example"
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
 *  /system_actions/search:
 *    get:
 *      operationId: searchSystemActions
 *      summary: Devuelve todos los registros de la tabla `System_actions` que cumplan con las condiciones enviadas en el cuerpo de la solicitud
 *      tags: [System Actions]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "campo": "system_action_id", "valor": 1, "operador": "between", "valorComparacion": 5 } ]
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
 *          description: Campo sobre el que se ordenará el resultado
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
 *                $ref: '#/components/schemas/SystemAction'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el usuario
 *        500:
 *          description: Error del Servidor
 *  /system_actions/getTotalRecords:
 *    get:
 *      operationId: getTotalRecordsSystemActions
 *      summary: Devuelve el total de registros de la tabla `System_actions`
 *      tags: [System Actions]
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalRecords:
 *                    type: number
 *                    description: El total de registros de la tabla `System_actions`
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el usuario
 *        500:
 *          description: Error del Servidor
 *  /system_actions/getModelProperties:
 *    get:
 *      operationId: getModelPropertiesSystemActions
 *      summary: Devuelve las propiedades de la tabla `System_actions`
 *      tags: [System Actions]
 *      responses:
 *        200:
 *          description: Devuelve un arreglo con todas las propiedades disponibles sobre la `System_actions`
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  nombreTabla:
 *                    type: string
 *                    description: Nombre de la tabla
 *                  idTabla:
 *                    type: string
 *                    description: Campo identificador de la tabla
 *                  camposTabla:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/TableField'
 *                    description: Arreglo de la definición de todos los campos de la tabla
 *                  nombreCampos:
 *                    type: array
 *                    description: Arreglo con el nombre de todas las propiedades de la tabla
 *                    items:
 *                      type: string
 *                    example: ["string1", "string2", "string3"]
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el usuario
 *        500:
 *          description: Error del Servidor
 *  /system_actions/getAffectedRecordsByQuery:
 *    get:
 *      operationId: getAffectedRecordsByQuerySystemActions
 *      summary: Devuelve el total de los registros que son afectados en las consultas de bases de datos `System_actions`
 *      tags: [System Actions]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "campo": "system_action_id", "valor": 1, "operador": "between", "valorComparacion": 5 } ]
 *          description: Desde que número de registro se hará la consulta
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  affectedRecords:
 *                    type: number
 *                    description: Total de registros afectados en la consulta
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el usuario
 *        500:
 *          description: Error del Servidor
 */
