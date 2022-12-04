CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE carts (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
)

-- DROP TABLE carts;
-- drop table carts;


CREATE TABLE cart_items (
	cart_id uuid NOT NULL, 
 	product_id uuid NOT NULL, 
 	count int4 NOT NULL DEFAULT 0,
 	FOREIGN KEY ("cart_id") REFERENCES "carts" ("id")
)

-- DROP TABLE cart_items;
-- drop table cart_items;

INSERT INTO carts (id) VALUES
('5d808d7d-f466-43f3-961e-67b5eaf4d5f2');

INSERT INTO cart_items (cart_id, product_id, count) VALUES 
('5d808d7d-f466-43f3-961e-67b5eaf4d5f2', 'fc87e896-2a20-4166-a4c6-a70d700c6fda', 25), 
('5d808d7d-f466-43f3-961e-67b5eaf4d5f2', 'fc87e896-2a20-4166-a4c6-a70d700c6fda', 35);