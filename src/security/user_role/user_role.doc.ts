/**
 *@swagger
 *tags:
 *  name: user Rol
 *  description: Documentación de user Rol
 */
/**
 *@swagger
 *paths:
 *  /user_role:
 *    get:
 *      operationId: obtenerusersRoles
 *      summary: Devuelve todos los registros de la tabla `users_roles`
 *      tags: [user Rol]
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
 *                $ref: '#/components/schemas/userRol'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: crearuserRol
 *      summary: Crea un registro en la tabla `users_roles`
 *      tags: [user Rol]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `users_roles`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/userRol'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userRol'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `users_roles`
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
 *  /user_role/{user_id}/{role_id}:
 *    delete:
 *      operationId: eliminaruserRol
 *      summary: Elimina el registro de la tabla `users_roles` que tenga el id enviado como parámetro
 *      tags: [user Rol]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `user`
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
 *                        $ref: "#/components/schemas/userRol"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/userRol/example"
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
 *  /user_role/eliminarRoles/{user_id}:
 *    delete:
 *      operationId: eliminarRoles
 *      summary: Elimina los registros de la tabla `users_roles` que tengan el id enviado como parámetro
 *      tags: [user Rol]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `users`
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
 *                        $ref: "#/components/schemas/userRol"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/userRol/example"
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
 *  /user_role/eliminarusers/{role_id}:
 *    delete:
 *      operationId: eliminarusers
 *      summary: Elimina los registros de la tabla `users_roles` que tengan el id enviado como parámetro
 *      tags: [user Rol]
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
 *                        $ref: "#/components/schemas/userRol"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/userRol/example"
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
 *  /user_role/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla `users_roles`
 *      tags: [user Rol]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "field": "user_role_id", "value": 1, "operador": "between", "valueComparacion": 5 } ]
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
 *                $ref: '#/components/schemas/userRol'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_opcion_menu/obtenerusers/{role_id}:
 *    get:
 *      operationId: obtenerusers
 *      summary: Devuelve todos los registros de la tabla `roles_users` asignados al role_id que se envíe como parámetro
 *      tags: [user Rol]
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
 *                $ref: '#/components/schemas/userRol'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_opcion_menu/getRoles/{user_id}:
 *    get:
 *      operationId: getRoles
 *      summary: Devuelve todos los registros de la tabla `roles_users` asignados al user_id que se envíe como parámetro
 *      tags: [user Rol]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `users`
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/userRol'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /user_role/obtenerusersSinAsignar/{role_id}:
 *    get:
 *      operationId: obtenerusersSinAsignar
 *      summary: Devuelve todos los registros de la tabla `users` que no están asignados al role_id que se envíe como parámetro
 *      tags: [user Rol]
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
 *  /user_role/getTotalRecords:
 *    get:
 *      operationId: getTotalRecords
 *      summary: Devuelve todos los registros de la tabla `users_roles`
 *      tags: [user Rol]
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
