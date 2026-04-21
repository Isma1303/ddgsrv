-- Script para la creación de tablas de seguridad (PostgreSQL)
-- Generado a partir de los modelos en src/security

-- Crear el esquema admin si no existe
CREATE SCHEMA IF NOT EXISTS admin;

-- ==========================================
-- TABLAS BASE
-- ==========================================

-- Tabla: Users
CREATE TABLE IF NOT EXISTS admin."Users" (
    user_id SERIAL PRIMARY KEY,
    "user" VARCHAR(200) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(200),
    password VARCHAR(100) NOT NULL,
    status SMALLINT NOT NULL
);

-- Tabla: Roles
CREATE TABLE IF NOT EXISTS admin."Roles" (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR(100),
    status SMALLINT
);

-- Tabla: Tables
CREATE TABLE IF NOT EXISTS admin."Tables" (
    table_id SERIAL PRIMARY KEY,
    table_name VARCHAR(75) NOT NULL,
    field_id VARCHAR(75) NOT NULL,
    schema_name VARCHAR(75) NOT NULL,
    assignable_rls BOOLEAN NOT NULL,
    alias_nm VARCHAR(255)
);

-- Tabla: System_actions
CREATE TABLE IF NOT EXISTS admin."System_actions" (
    system_action_id SERIAL PRIMARY KEY,
    system_action_name VARCHAR(200) NOT NULL,
    component_id VARCHAR(100) NOT NULL,
    module_name VARCHAR(100),
    route_path VARCHAR(200),
    http_method VARCHAR(10),
    action_type VARCHAR(50),
    priority INTEGER,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Tabla: Menu_options
CREATE TABLE IF NOT EXISTS admin."Menu_options" (
    menu_option_id SERIAL PRIMARY KEY,
    menu_option VARCHAR(200) NOT NULL,
    icon VARCHAR(200),
    path VARCHAR(200),
    sort VARCHAR(3) NOT NULL,
    parent_menu_option_id INTEGER REFERENCES admin."Menu_options"(menu_option_id)
);

-- Tabla: Configurations
CREATE TABLE IF NOT EXISTS admin."Configurations" (
    configuration_id SERIAL PRIMARY KEY,
    configuration VARCHAR(75) NOT NULL,
    value VARCHAR(500) NOT NULL,
    configuration_cd VARCHAR(25) NOT NULL
);


-- ==========================================
-- TABLAS RELACIONALES Y DE ACCIÓN
-- ==========================================

-- Tabla: User_roles
CREATE TABLE IF NOT EXISTS admin."User_roles" (
    user_id INTEGER NOT NULL REFERENCES admin."Users"(user_id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL REFERENCES admin."Roles"(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Tabla: Actions
CREATE TABLE IF NOT EXISTS admin."Actions" (
    action_id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    table_id INTEGER NOT NULL REFERENCES admin."Tables"(table_id) ON DELETE CASCADE,
    write_permission BOOLEAN NOT NULL
);

-- Tabla: Role_actions
CREATE TABLE IF NOT EXISTS admin."Role_actions" (
    role_id INTEGER NOT NULL REFERENCES admin."Roles"(role_id) ON DELETE CASCADE,
    action_id INTEGER NOT NULL REFERENCES admin."Actions"(action_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, action_id)
);

-- Tabla: Roles_system_actions
CREATE TABLE IF NOT EXISTS admin."Roles_system_actions" (
    role_id INTEGER NOT NULL REFERENCES admin."Roles"(role_id) ON DELETE CASCADE,
    system_action_id INTEGER NOT NULL REFERENCES admin."System_actions"(system_action_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, system_action_id)
);

-- Tabla: Roles_menu_options
CREATE TABLE IF NOT EXISTS admin."Roles_menu_options" (
    role_id INTEGER NOT NULL REFERENCES admin."Roles"(role_id) ON DELETE CASCADE,
    menu_option_id INTEGER NOT NULL REFERENCES admin."Menu_options"(menu_option_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, menu_option_id)
);

-- Tabla: Table_record_roles (RLS protection records)
CREATE TABLE IF NOT EXISTS admin."Table_record_roles" (
    record_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL REFERENCES admin."Roles"(role_id) ON DELETE CASCADE,
    table_id INTEGER NOT NULL REFERENCES admin."Tables"(table_id) ON DELETE CASCADE,
    field VARCHAR(100) NOT NULL,
    PRIMARY KEY (record_id, role_id, table_id)
);


CREATE OR REPLACE VIEW admin.vw_role_actions AS
SELECT
    a.role_id,
    b.role,
    a.action_id,
    c.action,
    d.table_name,
    c.write_permission
FROM admin."Role_actions" AS a
JOIN admin."Roles" b ON a.role_id = b.role_id
JOIN admin."Actions" c ON a.action_id = c.action_id
JOIN admin."Tables" d ON c.table_id = d.table_id;

CREATE OR REPLACE VIEW admin.vw_role_menu_options AS
SELECT
    a.role_id,
    b.role,
    a.menu_option_id,
    c.menu_option,
    c.icon,
    c.path,
    c.parent_menu_option_id,
    c.sort
FROM admin."Roles_menu_options" AS a
JOIN admin."Roles" b ON a.role_id = b.role_id
JOIN admin."Menu_options" c ON a.menu_option_id = c.menu_option_id;

CREATE OR REPLACE VIEW admin.vw_table_record_roles AS
SELECT
    a.role_id,
    b.role,
    a.table_id,
    c.table_name,
    c.schema_name,
    a.record_id,
    a.field
FROM admin."Table_record_roles" a
JOIN admin."Roles" b ON a.role_id = b.role_id
JOIN admin."Tables" c ON a.table_id = c.table_id;

CREATE OR REPLACE VIEW admin.vw_user_actions AS
SELECT 
    c.user_id,
    a.*,
    d.table_name
FROM admin."Actions" a
JOIN admin."Role_actions" b ON a.action_id = b.action_id
JOIN admin."User_roles" c ON b.role_id = c.role_id
JOIN admin."Tables" d ON a.table_id = d.table_id;

CREATE OR REPLACE VIEW admin.vw_user_menu_options AS
SELECT 
    c.user_id,
    a.*
FROM admin."Menu_options" a
JOIN admin."Roles_menu_options" b ON a.menu_option_id = b.menu_option_id
JOIN admin."User_roles" c ON b.role_id = c.role_id;

CREATE OR REPLACE VIEW admin.vw_user_roles AS
SELECT
    a.user_id,
    b.name,
    a.role_id,
    c.role,
    b.email,
    b."user"
FROM admin."User_roles" AS a
JOIN admin."Users" b ON a.user_id = b.user_id
JOIN admin."Roles" c ON a.role_id = c.role_id

insert into admin."Menu_options" (menu_option, icon, path, sort, parent_menu_option_id)
values
('Asignaciones', 'bi bi-tags', '/administration/assigments', 5, 1),
('Acciones', 'bi bi-tags', '/administration/actions', 4, 1),
('Tablas', 'bi bi-table', '/administration/tables', 6, 1),
('Opciones de menu', 'bi bi-list', '/administration/menu-options', 7, 1),
('Configuraciones', 'bi bi-gear', '/administration/configurations', 8, 1),
('Acciones de Sistema', 'bi bi-filter-left', '/administration/system-actions', 9, 1)

select * from "admin"."Roles_menu_options"
insert into "admin"."Roles_menu_options" (role_id, menu_option_id) values 
(2,3),
(2,4),
(2,5),
(2,6),
(2,7),
(2,8),
(2,9)








