CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE carts (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
)

-- DROP TABLE carts;


CREATE TABLE cart_items (
	cart_id uuid NOT NULL, 
 	product_id uuid NOT NULL, 
 	count int4 NOT NULL DEFAULT 0,
 	FOREIGN KEY ("cart_id") REFERENCES "carts" ("id")
)

-- DROP TABLE cart_items;

INSERT INTO carts (id) VALUES
('afb1b698-e54e-4ec1-aa80-e491b6690d8b');

INSERT INTO cart_items (cart_id, product_id, count) VALUES 
('afb1b698-e54e-4ec1-aa80-e491b6690d8b', 'fc87e896-2a20-4166-a4c6-a70d700c6fda', 25), 
('afb1b698-e54e-4ec1-aa80-e491b6690d8b', '20191040-672b-43e1-af8a-29fab02b30e1', 35); 