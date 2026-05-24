/**
 *@swagger
 *tags:
 *  name: Rol Accion
 *  description: Documentación de Rol Accion
 */
/**
 *@swagger
 *paths:
 *  /rol_action:
 *    get:
 *      operationId: getRolesAcciones
 *      summary: Devuelve todos los registros de la tabla `roles_actions`
 *      tags: [Rol Accion]
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
 *                $ref: '#/components/schemas/RolAccion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: crearRolAccion
 *      summary: Crea un registro en la tabla `roles_actions`
 *      tags: [Rol Accion]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `roles_actions`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RolAccion'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RolAccion'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `roles_actions`
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
 *  /rol_action/{role_id}/{action_id}:
 *    delete:
 *      operationId: eliminarRolAccion
 *      summary: Elimina el registro de la tabla `roles_actions` que tenga el id enviado como parámetro
 *      tags: [Rol Accion]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `roles`
 *        - in: path
 *          name: action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `actions`
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
 *                        $ref: "#/components/schemas/RolAccion"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RolAccion/example"
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
 *  /rol_action/eliminarAcciones/{role_id}:
 *    delete:
 *      operationId: eliminarAcciones
 *      summary: Elimina los registros de la tabla `roles_actions` que tengan el id enviado como parámetro
 *      tags: [Rol Accion]
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
 *                        $ref: "#/components/schemas/RolAccion"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RolAccion/example"
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
 *  /rol_action/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla `roles_actions`
 *      tags: [Rol Accion]
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
 *                $ref: '#/components/schemas/RolAccion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_action/getActions/{role_id}:
 *    get:
 *      operationId: getActions
 *      summary: Devuelve todos los registros de la tabla `roles_actions` asignados al role_id que se envíe como parámetro
 *      tags: [Rol Accion]
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
 *                $ref: '#/components/schemas/RolAccion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_action/getRoles/{action_id}:
 *    get:
 *      operationId: getRoles
 *      summary: Devuelve todos los registros de la tabla `roles_actions` asignados al action_id que se envíe como parámetro
 *      tags: [Rol Accion]
 *      parameters:
 *        - in: path
 *          name: action_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `actions`
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/RolAccion'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_action/getActionsSinAsignar/{role_id}:
 *    get:
 *      operationId: getActionsSinAsignar
 *      summary: Devuelve todos los registros de la tabla `actions` que no están asignados al role_id que se envíe como parámetro
 *      tags: [Rol Accion]
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
 *                   type: object
 *                   properties:
 *                     contacto_id:
 *                        type: integer
 *                        description: Identificador único del contacto
 *                     contacto:
 *                        type: string
 *                        description: Nombre del contacto
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_action/getTotalRecords:
 *    get:
 *      operationId: getTotalRecords
 *      summary: Devuelve todos los registros de la tabla `roles_actions`
 *      tags: [Rol Accion]
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
