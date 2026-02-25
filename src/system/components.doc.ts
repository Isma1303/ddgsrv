/**
 * @swagger
 *components:
 *  schemas:
 *    SystemAction:
 *      type: object
 *      properties:
 *        system_action_id:
 *          type: integer
 *          description: Identificador único de la tabla
 *        system_action_name:
 *          type: string
 *          description: name of the system action
 *        component_id:
 *          type: string
 *          description: React Component identifier of the action
 *        module_name:
 *          type: string
 *          description: Name of the action module in the system
 *        route_path:
 *          type: string
 *          description: Path of the action in the system
 *        http_method:
 *          type: string
 *          description: HTTP method of the action in the system (GET, POST, PUT, DELETE)
 *        action_type:
 *          type: string
 *          description: Type of action in the system (CRUD, REPORT, OTHER, DIV, BUTTON, LINK)
 *        priority:
 *          type: number
 *          description: Priority of the action in the system
 *        description:
 *          type: string
 *          description: Description of the action in the system
 *        is_active:
 *          type: boolean
 *          description: Indicates if the action is active in the system
 *      example:
 *        system_action_id: 1
 *        system_action_name: create product
 *        component_id: create-product
 *        module_name: inventory
 *        route_path: /inventory/create-product
 *        http_method: POST
 *        action_type: Button
 *        priority: 5
 *        description: Description of the action
 *        is_active: true
 *    RolOpcionMenu:
 *      type: object
 *      properties:
 *        role_id:
 *          type: integer
 *          description: Llave foránea Rol
 *        menu_option_id:
 *          type: integer
 *          description: Llave foránea Opción Menú
 *    RolAccion:
 *      type: object
 *      properties:
 *        role_id:
 *          type: integer
 *          description: Llave foránea Rol
 *        action_id:
 *          type: integer
 *          description: Llave foránea Acción
 *    RolSystemAction:
 *      type: object
 *      properties:
 *        role_id:
 *          type: integer
 *          description: Llave foránea Rol
 *        system_action_id:
 *          type: integer
 *          description: Llave foránea System Action
 *      example:
 *        role_id: 1
 *        system_action_id: 1
 *    userRol:
 *      type: object
 *      properties:
 *        user_id:
 *          type: integer
 *          description: Llave foránea user
 *        role_id:
 *          type: integer
 *          description: Llave foránea Rol
 *    Rol:
 *      type: object
 *      properties:
 *        role_id:
 *          type: integer
 *          description: Identificador único de la tabla
 *        rol:
 *          type: string
 *          description: Nombre del rol
 *        status:
 *          type: integer
 *          description: Id de estado del Rol 0 = Activo, 1 = Inactivo
 *      example:
 *        role_id: 125
 *        rol: Cadena de ejemplo
 *        status: Cadena de ejemplo
 *    Accion:
 *      type: object
 *      properties:
 *        action_id:
 *          type: integer
 *          description: Identificador único de la tabla
 *        action:
 *          type: string
 *          description: Nombre de la action
 *        tabla:
 *          type: string
 *          description: Nombre de la tabla a la que afecta esta action
 *        write_permission:
 *          type: boolean
 *          description: Determina si la acción tiene permiso de write_permission o solo lectura
 *    OpcionMenu:
 *      type: object
 *      properties:
 *        menu_option_id:
 *          type: integer
 *          description: Identificador único de la tabla
 *        opcion_menu:
 *          type: string
 *          description: Nombre de la Opción de Menú
 *        icono:
 *          type: string
 *          description: Icono de la opción de menú
 *        ruta:
 *          type: string
 *          description: Ruta de la opción de menú
 *        orden:
 *          type: string
 *          description: Orden alfabético del menú
 *        opcion_menu_padre_id:
 *          type: integer
 *          description: Opción de menú padre
 *    OpcionMenuDevExtreme:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador único de la tabla
 *        text:
 *          type: string
 *          description: Nombre de la Opción de Menú
 *        icon:
 *          type: string
 *          description: Icono de la opción de menú
 *        path:
 *          type: string
 *          description: Ruta de la opción de menú
 *        parentId:
 *          type: integer
 *          description: Opción de menú padre
 *      example:
 *        id: 15
 *        text: Opción de menú
 *        icon: bi bi-search
 *        path: opcion_menu/busqueda
 *        parentId: 12
 *    OpcionMenuAnidadas:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador único de la tabla
 *        text:
 *          type: string
 *          description: Nombre de la Opción de Menú
 *        icon:
 *          type: string
 *          description: Icono de la opción de menú
 *        path:
 *          type: string
 *          description: Ruta de la opción de menú
 *        items:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/OpcionMenuAnidadas'
 *    Estado:
 *      type: object
 *      properties:
 *        status:
 *          type: integer
 *          description: Identificador único de la tabla
 *        estado:
 *          type: string
 *          description: Nombre del Estado
 *      example:
 *        status: 125
 *        estado: Cadena de ejemplo
 *    user:
 *      type: object
 *      properties:
 *        user_id:
 *          type: integer
 *          description: Identificador único de la tabla
 *        user:
 *          type: string
 *          description: user dentro de la aplicación
 *        name:
 *          type: string
 *          description: Nombre del user
 *        email:
 *          type: string
 *          description: Correo electrónico
 *        password:
 *          type: string
 *          description: Contraseña
 *        status:
 *          type: integer
 *          description: Id del user 0 = Activo 1 = Inactivo
 *      example:
 *        user_id: 1
 *        user: user
 *        name: Nombre del user
 *        email: user@correo.com
 *        password: $olc0mpCor3*
 *        status: 0
 *    SalesUser:
 *      type: object
 *      properties:
 *        user_id:
 *          type: integer
 *        is_sales_rep:
 *          type: boolean
 *        is_sales_manager:
 *          type: boolean
 *        status:
 *          type: boolean
 *        reports_to_user_id:
 *          type: integer
 *          nullable: true
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *      example:
 *        user_id: 15
 *        is_sales_rep: true
 *        is_sales_manager: false
 *        status: true
 *        reports_to_user_id: 3
 *        creation_date: 2025-01-15T12:15:00Z
 *        modification_date: 2025-02-01T09:30:00Z
 *    SalesUserInput:
 *      allOf:
 *        - $ref: '#/components/schemas/SalesUser'
 *      required:
 *        - user_id
 *        - is_sales_rep
 *        - is_sales_manager
 *        - status
 *      properties:
 *        user_id:
 *          type: integer
 *    SalesUserUpdate:
 *      type: object
 *      properties:
 *        is_sales_rep:
 *          type: boolean
 *        is_sales_manager:
 *          type: boolean
 *        status:
 *          type: boolean
 *        reports_to_user_id:
 *          type: integer
 *          nullable: true
 *    Account:
 *      type: object
 *      properties:
 *        account_id:
 *          type: integer
 *        name:
 *          type: string
 *        code:
 *          type: string
 *          nullable: true
 *        status:
 *          type: boolean
 *        owner_user_id:
 *          type: integer
 *          nullable: true
 *        tax_id:
 *          type: string
 *          nullable: true
 *        segment:
 *          type: string
 *          nullable: true
 *        industry:
 *          type: string
 *          nullable: true
 *        country:
 *          type: string
 *          nullable: true
 *        city:
 *          type: string
 *          nullable: true
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *      example:
 *        account_id: 120
 *        name: Empresa Demo
 *        code: DEMO-001
 *        status: true
 *        owner_user_id: 15
 *        segment: Enterprise
 *        industry: Tecnología
 *        country: México
 *        city: Ciudad de México
 *        creation_date: 2025-01-10T10:00:00Z
 *    AccountInput:
 *      allOf:
 *        - $ref: '#/components/schemas/Account'
 *      required:
 *        - name
 *        - status
 *      properties:
 *        account_id:
 *          readOnly: true
 *    AccountUpdate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        code:
 *          type: string
 *          nullable: true
 *        status:
 *          type: boolean
 *        owner_user_id:
 *          type: integer
 *          nullable: true
 *        tax_id:
 *          type: string
 *          nullable: true
 *        segment:
 *          type: string
 *          nullable: true
 *        industry:
 *          type: string
 *          nullable: true
 *        country:
 *          type: string
 *          nullable: true
 *        city:
 *          type: string
 *          nullable: true
 *    Contact:
 *      type: object
 *      properties:
 *        contact_id:
 *          type: integer
 *        account_id:
 *          type: integer
 *        first_name:
 *          type: string
 *        last_name:
 *          type: string
 *        email:
 *          type: string
 *          nullable: true
 *        phone:
 *          type: string
 *          nullable: true
 *        job_title:
 *          type: string
 *          nullable: true
 *        is_primary:
 *          type: boolean
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *      example:
 *        contact_id: 45
 *        account_id: 120
 *        first_name: Ana
 *        last_name: López
 *        email: ana.lopez@demo.com
 *        phone: +52 55 1234 5678
 *        job_title: Compras
 *        is_primary: true
 *        creation_date: 2025-01-15T11:00:00Z
 *    ContactInput:
 *      allOf:
 *        - $ref: '#/components/schemas/Contact'
 *      required:
 *        - account_id
 *        - first_name
 *        - last_name
 *      properties:
 *        contact_id:
 *          readOnly: true
 *    ContactUpdate:
 *      type: object
 *      properties:
 *        account_id:
 *          type: integer
 *        first_name:
 *          type: string
 *        last_name:
 *          type: string
 *        email:
 *          type: string
 *          nullable: true
 *        phone:
 *          type: string
 *          nullable: true
 *        job_title:
 *          type: string
 *          nullable: true
 *        is_primary:
 *          type: boolean
 *    ProductCategory:
 *      type: object
 *      properties:
 *        product_category_id:
 *          type: integer
 *        name:
 *          type: string
 *        description:
 *          type: string
 *          nullable: true
 *        is_active:
 *          type: boolean
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *      example:
 *        product_category_id: 8
 *        name: Servicios
 *        description: Servicios profesionales
 *        is_active: true
 *        creation_date: 2025-01-20T09:30:00Z
 *    ProductCategoryInput:
 *      allOf:
 *        - $ref: '#/components/schemas/ProductCategory'
 *      required:
 *        - name
 *        - is_active
 *      properties:
 *        product_category_id:
 *          readOnly: true
 *    ProductCategoryUpdate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *          nullable: true
 *        is_active:
 *          type: boolean
 *    Product:
 *      type: object
 *      properties:
 *        product_id:
 *          type: integer
 *        product_category_id:
 *          type: integer
 *        name:
 *          type: string
 *        sku:
 *          type: string
 *          nullable: true
 *        brand:
 *          type: string
 *          nullable: true
 *        list_price:
 *          type: number
 *          format: float
 *          nullable: true
 *        item_type:
 *          type: string
 *          enum:
 *            - product
 *            - service
 *          description: Define si la oferta es un 'product' o un 'service'
 *        billing_model:
 *          type: string
 *          nullable: true
 *          enum:
 *            - fixed_fee
 *            - time_and_materials
 *            - retainer
 *          description: Modelo de facturación aplicable a servicios
 *        billing_rate:
 *          type: number
 *          format: float
 *          nullable: true
 *          description: Tarifa base para servicios
 *        billing_unit:
 *          type: string
 *          nullable: true
 *          description: Unidad de medida (hora, proyecto, etc.)
 *        is_active:
 *          type: boolean
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *      example:
 *        product_id: 25
 *        product_category_id: 8
 *        name: Licencia CRM
 *        sku: CRM-PLAT
 *        brand: Solcomp
 *        list_price: 2999.99
 *        item_type: product
 *        billing_model: null
 *        billing_rate: null
 *        billing_unit: null
 *        is_active: true
 *        creation_date: 2025-01-21T10:00:00Z
 *    ProductInput:
 *      allOf:
 *        - $ref: '#/components/schemas/Product'
 *      required:
 *        - product_category_id
 *        - name
 *        - item_type
 *        - is_active
 *      properties:
 *        product_id:
 *          readOnly: true
 *    ProductUpdate:
 *      type: object
 *      properties:
 *        product_category_id:
 *          type: integer
 *        name:
 *          type: string
 *        sku:
 *          type: string
 *          nullable: true
 *        brand:
 *          type: string
 *          nullable: true
 *        list_price:
 *          type: number
 *          format: float
 *          nullable: true
 *        item_type:
 *          type: string
 *          enum:
 *            - product
 *            - service
 *        billing_model:
 *          type: string
 *          nullable: true
 *          enum:
 *            - fixed_fee
 *            - time_and_materials
 *            - retainer
 *        billing_rate:
 *          type: number
 *          format: float
 *          nullable: true
 *        billing_unit:
 *          type: string
 *          nullable: true
 *        is_active:
 *          type: boolean
 *    SalesFunnel:
 *      type: object
 *      properties:
 *        sales_funnel_id:
 *          type: integer
 *        name:
 *          type: string
 *        description:
 *          type: string
 *          nullable: true
 *        is_default:
 *          type: boolean
 *        is_active:
 *          type: boolean
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *      example:
 *        sales_funnel_id: 3
 *        name: Embudo Comercial MX
 *        description: Proceso comercial estándar
 *        is_default: true
 *        is_active: true
 *        creation_date: 2025-01-22T08:30:00Z
 *    SalesFunnelInput:
 *      allOf:
 *        - $ref: '#/components/schemas/SalesFunnel'
 *      required:
 *        - name
 *        - is_default
 *        - is_active
 *      properties:
 *        sales_funnel_id:
 *          readOnly: true
 *    SalesFunnelUpdate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *          nullable: true
 *        is_default:
 *          type: boolean
 *        is_active:
 *          type: boolean
 *    SalesFunnelStage:
 *      type: object
 *      properties:
 *        sales_funnel_stage_id:
 *          type: integer
 *        sales_funnel_id:
 *          type: integer
 *        name:
 *          type: string
 *        code:
 *          type: string
 *          nullable: true
 *        sort_order:
 *          type: integer
 *        probability_to_win:
 *          type: number
 *          format: float
 *          nullable: true
 *        is_initial:
 *          type: boolean
 *        is_won:
 *          type: boolean
 *        is_lost:
 *          type: boolean
 *        is_active:
 *          type: boolean
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *      example:
 *        sales_funnel_stage_id: 12
 *        sales_funnel_id: 3
 *        name: Propuesta
 *        code: PROP
 *        sort_order: 3
 *        probability_to_win: 0.45
 *        is_initial: false
 *        is_won: false
 *        is_lost: false
 *        is_active: true
 *        creation_date: 2025-01-22T09:15:00Z
 *    SalesFunnelStageInput:
 *      allOf:
 *        - $ref: '#/components/schemas/SalesFunnelStage'
 *      required:
 *        - sales_funnel_id
 *        - name
 *        - sort_order
 *        - is_initial
 *        - is_won
 *        - is_lost
 *        - is_active
 *      properties:
 *        sales_funnel_stage_id:
 *          readOnly: true
 *    SalesFunnelStageUpdate:
 *      type: object
 *      properties:
 *        sales_funnel_id:
 *          type: integer
 *        name:
 *          type: string
 *        code:
 *          type: string
 *          nullable: true
 *        sort_order:
 *          type: integer
 *        probability_to_win:
 *          type: number
 *          format: float
 *          nullable: true
 *        is_initial:
 *          type: boolean
 *        is_won:
 *          type: boolean
 *        is_lost:
 *          type: boolean
 *        is_active:
 *          type: boolean
 *    ResponseMessage:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Información sore la transacción
 *        statusCode:
 *          type: integer
 *          description: Código de respuesta HTTP
 *        data:
 *          type: any
 *          description: Regularmente devuelve un arreglo de objetos o solo un objeto
 *      example:
 *        message: Registros encontrados en la tabla clientes
 *        statusCode: 200
 *    GetOptionalPayload:
 *      type: object
 *      properties:
 *        orden:
 *          type: string
 *          description: Campo sobre el que se ordenará el result
 *        offset:
 *          type: integer
 *          description: Desde que número de registro se hará la consulta
 *        limit:
 *          type: integer
 *          description: Cuántos registros deben obtenerse
 *        detalles:
 *          type: boolean
 *          description: Incluir los detalles en los registros
 *      example:
 *        orden: cliente_id
 *        offset: 10
 *        limit: 15
 *    ErrorDetails:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Información sore la transacción
 *        statusCode:
 *          type: integer
 *          description: Código de respuesta HTTP
 *        errorMessage:
 *          type: string
 *          description: Mensaje de error de la solicitud
 *        errorDetails:
 *          description: Arreglo de errores
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ErrorObject'
 *      example:
 *        message: Campos Inválidos
 *        statusCode: 400
 *        errorMessage: La estructura del registro no cumple los requisitos mínimos
 *        errorDetails:
 *          - field: nit
 *            validaciones:
 *            - criterioInvalidez: El nit es requerido
 *              valueEsperado: No nulo
 *    ErrorObject:
 *      type: object
 *      properties:
 *        field:
 *          type: string
 *          description: Nombre del field inválido
 *        validaciones:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ValidationObject'
 *      example:
 *        field: nit
 *        validaciones:
 *        - criterioInvalidez: El nit es requerido
 *        - valueEsperado: No nulo
 *    ValidationObject:
 *      type: object
 *      properties:
 *        criterioInvalidez:
 *          type: string
 *          description: Razón de invalidez del field
 *        valueEsperado:
 *          type: string
 *          description: Valor que espera recibir el field
 *      example:
 *        criterioInvalidez: El nit es requerido
 *        valueEsperado: No nulo
 *    ConditionObject:
 *      type: object
 *      properties:
 *        field:
 *          type: string
 *          description: Nombre del field dentro de la tabla
 *        value:
 *          type: any
 *          description: Valor contra el que se evaluaran los registros
 *        operador:
 *          type: string
 *          description: Operador lógico para la condición, por defecto es =
 *        valueComparacion:
 *          type: any
 *          description: Valor de comparación para el value dado, se utiliza regularmente para el operador `between`
 *      example:
 *        field: campo_tabla
 *        value: 5
 *        operador: between
 *        valueComparacion: 15
 *    TableField:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del field dentro de la tabla
 *         description:
 *           type: string
 *           description: Descripción o comentario sobre el field de la tabla
 *         required:
 *           type: boolean
 *           description: Define si el value del field puede ser nulo
 *         maxLength:
 *           type: number
 *           description: Define la longitud máxima cuando el field es de tipo string
 *         longitudMinima:
 *           type: number
 *           description: Define la longitud minima cuando el field es de tipo string
 *         valueMaximo:
 *           type: number
 *           description: Define el value numérico máximo del field
 *         valueMinimo:
 *           type: number
 *           description: Define el value numérico mínimo del field
 *         regExp:
 *           type: string
 *           description: Define la expresión regular con la que se valida cuando el field es de tipo string
 *         alias:
 *           type: string
 *           description: Define el nombre que toma el field para las consultas
 *         unico:
 *           type: boolean
 *           description: Define si el field tiene un constraint de tipo unique
 *       required:
 *         - nombre
 *         - descripcion
 *         - requerido
 *       example:
 *         name: campo_id
 *         description: Identificador único de la tabla campos
 *         required: true
 *         alias: campoId
 *         unico: true
 *         dataType: number
 *         maxLength: 50
 *         longitudMinima: 1
 *         valueMaximo: 50
 *         valueMinimo: 1
 *         regExp: ([A-Z])\w+
 *    DealProduct:
 *      type: object
 *      properties:
 *        deal_product_id:
 *          type: integer
 *        deal_id:
 *          type: integer
 *        product_id:
 *          type: integer
 *        quantity:
 *          type: number
 *        unit_price:
 *          type: number
 *        discount_pct:
 *          type: number
 *          nullable: true
 *        line_description:
 *          type: string
 *          nullable: true
 *        line_total:
 *          type: number
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *    DealProductInput:
 *      type: object
 *      properties:
 *        product_id:
 *          type: integer
 *        quantity:
 *          type: number
 *        unit_price:
 *          type: number
 *        discount_pct:
 *          type: number
 *          nullable: true
 *        line_description:
 *          type: string
 *          nullable: true
 *      required:
 *        - product_id
 *    DealProductUpdate:
 *      type: object
 *      properties:
 *        quantity:
 *          type: number
 *        unit_price:
 *          type: number
 *        discount_pct:
 *          type: number
 *          nullable: true
 *        line_description:
 *          type: string
 *          nullable: true
 *    SalesQuota:
 *      type: object
 *      properties:
 *        sales_quota_id:
 *          type: integer
 *        user_id:
 *          type: integer
 *        period_type:
 *          type: string
 *          enum: [MONTH, QUARTER, YEAR]
 *        period_year:
 *          type: integer
 *        period_month:
 *          type: integer
 *          nullable: true
 *        quota_amount:
 *          type: number
 *        creation_date:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *        modification_date:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          readOnly: true
 *    SalesQuotaInput:
 *      type: object
 *      required:
 *        - user_id
 *        - period_type
 *        - period_year
 *        - quota_amount
 *      properties:
 *        user_id:
 *          type: integer
 *        period_type:
 *          type: string
 *          enum: [MONTH, QUARTER, YEAR]
 *        period_year:
 *          type: integer
 *        period_month:
 *          type: integer
 *          nullable: true
 *        quota_amount:
 *          type: number
 *    SalesQuotaUpdate:
 *      type: object
 *      properties:
 *        period_type:
 *          type: string
 *          enum: [MONTH, QUARTER, YEAR]
 *        period_year:
 *          type: integer
 *        period_month:
 *          type: integer
 *          nullable: true
 *        quota_amount:
 *          type: number
 */
