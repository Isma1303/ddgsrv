-- Create Schemas
CREATE SCHEMA IF NOT EXISTS coffe;
CREATE SCHEMA IF NOT EXISTS ddg;

-- COFFE SCHEMA TABLES

-- 1. Product Categories
CREATE TABLE IF NOT EXISTS coffe.product_categories (
    product_category_id SERIAL PRIMARY KEY,
    product_category_nm VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Products
CREATE TABLE IF NOT EXISTS coffe.products (
    product_id SERIAL PRIMARY KEY,
    product_category_id INT NOT NULL REFERENCES coffe.product_categories(product_category_id),
    product_nm VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    product_img VARCHAR(255)
);

-- 3. Menu
CREATE TABLE IF NOT EXISTS coffe.menu (
    menu_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    menu_type VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table coffe.sales_status(
sale_status_id BIGSERIAL primary key,
sale_status_nm VARCHAR(50) not null
);


CREATE TABLE coffe.sales (
    sale_id BIGSERIAL PRIMARY KEY,
    sold_at TIMESTAMP NOT NULL DEFAULT NOW(),
    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    sale_status_id INT not null, 
    notes TEXT NULL
);


CREATE TABLE coffe.sale_details (
    sale_detail_id BIGSERIAL PRIMARY KEY,
    sale_id BIGINT NOT NULL REFERENCES coffe.sales(sale_id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES coffe.products(product_id),
    quantity NUMERIC(12,2) NOT NULL,
    line_total NUMERIC(12,2) NOT NULL
);

-- DDG SCHEMA TABLES

-- 1. Departments
CREATE TABLE IF NOT EXISTS ddg.departments (
    department_id SERIAL PRIMARY KEY,
    department_nm VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Department Members
CREATE TABLE IF NOT EXISTS ddg.department_members (
    department_member_id SERIAL PRIMARY KEY,
    department_id INT NOT NULL REFERENCES ddg.departments(department_id),
    user_id INT NOT NULL, -- References admin.Users
    reports_to INT, -- References admin.Users
    is_leader BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3. Service Events
CREATE TABLE IF NOT EXISTS ddg.service_events (
    service_event_id SERIAL PRIMARY KEY,
    service_nm VARCHAR(255) NOT NULL,
    service_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    department_id INT NOT NULL REFERENCES ddg.departments(department_id),
    notes TEXT
);

-- 4. Service Events Users
CREATE TABLE IF NOT EXISTS ddg.service_events_users (
    service_event_id INT NOT NULL REFERENCES ddg.service_events(service_event_id),
    user_id INT NOT NULL, -- References admin.Users
    PRIMARY KEY (service_event_id, user_id)
);

-- 5. Attendance Status
CREATE TABLE IF NOT EXISTS ddg.attendance_status (
    attendance_status_id SERIAL PRIMARY KEY,
    attendance_status_cd VARCHAR(50) NOT NULL UNIQUE,
    attendance_status_nm VARCHAR(100) NOT NULL
);

-- 6. Attendances
CREATE TABLE IF NOT EXISTS ddg.attendances (
    attendance_id SERIAL PRIMARY KEY,
    service_event_id INT NOT NULL REFERENCES ddg.service_events(service_event_id),
    user_id INT NOT NULL, -- References admin.Users
    attendance_status_id INT NOT NULL REFERENCES ddg.attendance_status(attendance_status_id),
    notes TEXT
);

-- 7. User Cards
CREATE TABLE IF NOT EXISTS ddg.user_cards (
    card_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, -- References admin.Users
    card_uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    qr_value VARCHAR(255) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 8. User Departments
CREATE TABLE IF NOT EXISTS ddg.user_departments (
    department_id INT NOT NULL REFERENCES ddg.departments(department_id),
    user_id INT NOT NULL, -- References admin.Users
    PRIMARY KEY (department_id, user_id)
);


