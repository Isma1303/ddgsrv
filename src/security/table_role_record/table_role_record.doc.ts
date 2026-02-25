/**
 *@swagger
 *tags:
 *  name: Registro Tabla Rol
 *  description: Documentación de Registro Tabla Rol
 */
/**
 *@swagger
 *paths:
 *  /registro_tabla_rol:
 *    get:
 *      operationId: obtenerRegistrosTablaRoles
 *      summary: Devuelve todos los registros de la tabla `registros_tabla_roles`
 *      tags: [Registro Tabla Rol]
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
 *                $ref: '#/components/schemas/RegistroTablaRoles'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: crearRegistroTablaRoles
 *      summary: Crea un registro en la tabla `registros_tabla_roles`
 *      tags: [Registro Tabla Rol]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `registros_tabla_roles`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegistroTablaRoles'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RegistroTablaRoles'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `registros_tabla_roles`
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
 *  /registro_tabla_rol/{registro_id}/{role_id}:
 *    delete:
 *      operationId: eliminarRegistroTablaRoles
 *      summary: Elimina el registro de la tabla `registros_tabla_roles` que tenga el id enviado como parámetro
 *      tags: [Registro Tabla Rol]
 *      parameters:
 *        - in: path
 *          name: registro_id
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
 *                        $ref: "#/components/schemas/RegistroTablaRoles"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RegistroTablaRoles/example"
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
 *  /registro_tabla_rol/eliminarRoles/{registro_id}:
 *    delete:
 *      operationId: eliminarRoles
 *      summary: Elimina los registros de la tabla `registros_tabla_roles` que tengan el id enviado como parámetro
 *      tags: [Registro Tabla Rol]
 *      parameters:
 *        - in: path
 *          name: registro_id
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
 *                        $ref: "#/components/schemas/RegistroTablaRoles"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RegistroTablaRoles/example"
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
 *  /registro_tabla_rol/eliminarRegistrosTabla/{role_id}:
 *    delete:
 *      operationId: eliminarRegistrosTabla
 *      summary: Elimina los registros de la tabla `registros_tabla_roles` que tengan el id enviado como parámetro
 *      tags: [Registro Tabla Rol]
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
 *                        $ref: "#/components/schemas/RegistroTablaRoles"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RegistroTablaRoles/example"
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
 *  /registro_tabla_rol/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla `registros_tabla_roles`
 *      tags: [Registro Tabla Rol]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "field": "registro_tabla_role_id", "value": 1, "operador": "between", "valueComparacion": 5 } ]
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
 *                $ref: '#/components/schemas/RegistroTablaRoles'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_opcion_menu/obtenerRegistrosTabla/{role_id}:
 *    get:
 *      operationId: obtenerRegistrosTabla
 *      summary: Devuelve todos los registros de la tabla `roles_users` asignados al role_id que se envíe como parámetro
 *      tags: [Registro Tabla Rol]
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
 *                $ref: '#/components/schemas/RegistroTablaRoles'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_opcion_menu/getRoles/{registro_id}:
 *    get:
 *      operationId: getRoles
 *      summary: Devuelve todos los registros de la tabla `roles_users` asignados al registro_id que se envíe como parámetro
 *      tags: [Registro Tabla Rol]
 *      parameters:
 *        - in: path
 *          name: registro_id
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
 *                $ref: '#/components/schemas/RegistroTablaRoles'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /registro_tabla_rol/obtenerRegistrosTablaSinAsignar/{role_id}:
 *    get:
 *      operationId: obtenerRegistrosTablaSinAsignar
 *      summary: Devuelve todos los registros de la tabla `users` que no están asignados al role_id que se envíe como parámetro
 *      tags: [Registro Tabla Rol]
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
 *  /registro_tabla_rol/getTotalRecords:
 *    get:
 *      operationId: getTotalRecords
 *      summary: Devuelve todos los registros de la tabla `registros_tabla_roles`
 *      tags: [Registro Tabla Rol]
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
