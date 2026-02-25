/**
 *@swagger
 *tags:
 *  name: Rol Opcion Menu
 *  description: Documentación de Rol Opcion Menu
 */
/**
 *@swagger
 *paths:
 *  /rol_opcion_menu:
 *    get:
 *      operationId: obtenerRolOpcionMenu
 *      summary: Devuelve todos los registros de la tabla `roles_opciones_menu`
 *      tags: [Rol Opcion Menu]
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
 *                $ref: '#/components/schemas/RolOpcionMenu'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *    post:
 *      operationId: crearRolOpcionMenu
 *      summary: Crea un registro en la tabla `roles_opciones_menu`
 *      tags: [Rol Opcion Menu]
 *      requestBody:
 *        required: true
 *        description: Recibe un objeto con las propertyes requeridas para la tabla `roles_opciones_menu`
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RolOpcionMenu'
 *      responses:
 *        201:
 *          description: Devuelve un objeto con el registro creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RolOpcionMenu'
 *        400:
 *          description: Solicitud incorrecta, una o más propertyes del objeto enviado no cumplen con lor requisitos de la tabla `roles_opciones_menu`
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
 *  /rol_opcion_menu/{role_id}/{menu_option_id}:
 *    delete:
 *      operationId: eliminarRolOpcionMenu
 *      summary: Elimina el registro de la tabla `roles_opciones_menu` que tenga el id enviado como parámetro
 *      tags: [Rol Opcion Menu]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `roles`
 *        - in: path
 *          name: menu_option_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `opciones_menu`
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
 *                        $ref: "#/components/schemas/RolOpcionMenu"
 *                    example:
 *                      data:
 *                        $ref: "#/components/schemas/RolOpcionMenu/example"
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
 *  /rol_opcion_menu/deleteMenuOptions/{role_id}:
 *    delete:
 *      operationId: deleteMenuOptions
 *      summary: Elimina los registros de la tabla `roles_opciones_menu` que tengan el id enviado como parámetro
 *      tags: [Rol Opcion Menu]
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
 *  /rol_opcion_menu/search:
 *    get:
 *      operationId: search
 *      summary: Devuelve todos los registros de la tabla que esten incluidos en la búsqueda realizada `roles_opciones_menu`
 *      tags: [Rol Opcion Menu]
 *      parameters:
 *        - in: header
 *          name: condiciones
 *          schema:
 *            type: text
 *            example:
 *              condiciones: [ { "field": "rol_menu_option_id", "value": 1, "operador": "between", "valueComparacion": 5 } ]
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
 *                $ref: '#/components/schemas/RolOpcionMenu'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_opcion_menu/getMenuOptions/{role_id}:
 *    get:
 *      operationId: getMenuOptions
 *      summary: Devuelve todos los registros de la tabla `roles_opciones_menu` asignados al role_id que se envíe como parámetro
 *      tags: [Rol Opcion Menu]
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
 *                $ref: '#/components/schemas/RolOpcionMenu'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_opcion_menu/getRoles/{menu_option_id}:
 *    get:
 *      operationId: getRoles
 *      summary: Devuelve todos los registros de la tabla `roles_opciones_menu` asignados al menu_option_id que se envíe como parámetro
 *      tags: [Rol Opcion Menu]
 *      parameters:
 *        - in: path
 *          name: menu_option_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Llave foránea de la tabla `opciones_menu`
 *      responses:
 *        200:
 *          description: Devuelve un arreglo de objetos, si solo existe un registro devuelve un objeto con el registro
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/RolOpcionMenu'
 *        404:
 *          description: El recurso solicitado no existe
 *        403:
 *          description: El recurso solicitado no es accesible por el user
 *        500:
 *          description: Error del Servidor
 *  /rol_opcion_menu/getMenuOptionsSinAsignar/{role_id}:
 *    get:
 *      operationId: getMenuOptionsSinAsignar
 *      summary: Devuelve todos los registros de la tabla `opciones_menu` que no están asignados al role_id que se envíe como parámetro
 *      tags: [Rol Opcion Menu]
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
 *  /rol_opcion_menu/getTotalRecords:
 *    get:
 *      operationId: getTotalRecords
 *      summary: Devuelve todos los registros de la tabla `roles_opciones_menu`
 *      tags: [Rol Opcion Menu]
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
