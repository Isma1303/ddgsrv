/**
 *@swagger
 *tags:
 *  name: Rol System Action
 *  description: Documentación de Rol System Action
 */
/**
 *@swagger
 *paths:
 *  /role_system_action:
 *    get:
 *      operationId: getRolesSystemActions
 *      summary: Devuelve todos los registros de la tabla `roles_system_actions`
 *      tags: [Rol System Action]
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
 *                $ref: '#/components/schemas/RolSystemAction'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: createRolSystemAction
 *      summary: Crea un registro en la tabla `roles_system_actions`
 *      tags: [Rol System Action]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `roles_system_actions`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RolSystemAction'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RolSystemAction'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `roles_system_actions`
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
 *  /role_system_action/{role_id}/{action_id}:
 *    delete:
 *      operationId: deleteRolSystemAction
 *      summary: Elimina el registro de la tabla `roles_system_actions` que tenga el id enviado como parámetro
 *      tags: [Rol System Action]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `roles`
 *        - in: path
 *          name: system_action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `system_actions`
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
 *                        $ref: "#/components/schemas/RolSystemAction"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RolSystemAction/example"
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
 *  /role_system_action/deleteActions/{role_id}:
 *    delete:
 *      operationId: deleteActions
 *      summary: Elimina los registros de la tabla `roles_system_actions` que tengan el id enviado como parámetro
 *      tags: [Rol System Action]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `roles`
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
 *                        $ref: "#/components/schemas/RolSystemAction"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RolSystemAction/example"
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
 *  /role_system_action/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla `roles_system_actions`
 *      tags: [Rol System Action]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "field": "role_id", "value": 1, "operador": "between", "valueComparacion": 5 } ]
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
 *                $ref: '#/components/schemas/RolSystemAction'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /role_system_action/getSystemActions/{role_id}:
 *    get:
 *      operationId: getSystemActions
 *      summary: Devuelve todos los registros de la tabla `roles_system_actions` asignados al role_id que se envíe como parámetro
 *      tags: [Rol System Action]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `roles`
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/RolSystemAction'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /role_system_action/getRoles/{system_action_id}:
 *    get:
 *      operationId: getRoles
 *      summary: Devuelve todos los registros de la tabla `roles_system_actions` asignados al action_id que se envíe como parámetro
 *      tags: [Rol System Action]
 *      parameters:
 *        - in: path
 *          name: system_action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `system_actions`
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/RolSystemAction'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /role_system_action/getTotalRecords:
 *    get:
 *      operationId: getTotalRecords
 *      summary: Devuelve todos los registros de la tabla `roles_system_actions`
 *      tags: [Rol System Action]
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
