/**
 *@swagger
 *tags:
 *  name: user
 *  description: Documentation for user management
 */
/**
 *@swagger
 *paths:
 *  /user:
 *    get:
 *      operationId: getUsers
 *      summary: Retrieves all records from the `users` table
 *      tags: [user]
 *      parameters:
 *        - in: header
 *          name: offset
 *          schema:
 *            type: integer
 *          description: The starting point for the query
 *        - in: header
 *          name: limit
 *          schema:
 *            type: integer
 *          description: The number of records to retrieve
 *        - in: header
 *          name: orden
 *          schema:
 *            type: string
 *          description: Field used to sort the results
 *        - in: header
 *          name: detalles
 *          schema:
 *            type: integer
 *          description: Include details in the records (1 for yes, 0 for no)
 *      responses:
 *        200:
 *          description: Returns an array of objects or a single object if only one record exists
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/user'
 *        404:
 *          description: The requested resource does not exist
 *        403:
 *          description: The requested resource is not accessible by the user
 *        500:
 *          description: Server error
 *    post:
 *      operationId: createUser
 *      summary: Creates a new record in the `users` table
 *      tags: [user]
 *      requestBody:
 *        required: true
 *        description: Receives an object with the required properties for the `users` table
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        201:
 *          description: Returns the newly created record
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *        400:
 *          description: Bad request, one or more properties of the submitted object do not meet the table requirements
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorDetails'
 *        404:
 *          description: The requested resource does not exist
 *        403:
 *          description: The requested resource is not accessible by the user
 *        500:
 *          description: Server error
 *  /user/{user_id}:
 *    put:
 *      operationId: updateUser
 *      summary: Updates a record in the `users` table
 *      tags: [user]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Unique identifier of the user
 *      requestBody:
 *        required: true
 *        description: Receives an object with the properties required for the `users` table
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        201:
 *          description: Returns the updated record
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *        400:
 *          description: Bad request, one or more properties of the submitted object do not meet the table requirements
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorDetails'
 *        404:
 *          description: The requested resource does not exist
 *        403:
 *          description: The requested resource is not accessible by the user
 *        500:
 *          description: Server error
 *    delete:
 *      operationId: deleteUser
 *      summary: Deletes a record from the `users` table by the specified id
 *      tags: [user]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Unique identifier of the user
 *      responses:
 *        200:
 *          description: Returns a confirmation message of deletion
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/ResponseMessage"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/user"
 *        404:
 *          description: Returns a message indicating the record was not found
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
 *          description: Server error
 *    get:
 *      operationId: getUser
 *      summary: Retrieves a single record from the `users` table by the specified id
 *      tags: [user]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Unique identifier of the user
 *      responses:
 *        200:
 *          description: Returns the found record
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/ResponseMessage"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/user"
 *        404:
 *          description: Returns an empty array if the record was not found
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
 *          description: Server error
 *  /user/authenticate:
 *    post:
 *      operationId: authenticateUser
 *      summary: Authenticates a user and returns a token
 *      tags: [user]
 *      requestBody:
 *        required: true
 *        description: Receives an object with username, password, and app key
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                 user:
 *                   type: string
 *                   description: Username of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: Password of the user
 *                 app:
 *                   type: string
 *                   description: Key of the authenticating application
 *      responses:
 *        200:
 *          description: Returns an object containing the authentication token
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  message:
 *                    type: string
 *                  token:
 *                    type: string
 *                    format: byte
 *        404:
 *          description: The requested resource does not exist
 *        403:
 *          description: The requested resource is not accessible by the user
 *        500:
 *          description: Server error
 */
