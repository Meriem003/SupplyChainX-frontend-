USE supply_chainx_db;

UPDATE users 
SET password = '$2a$10$DHw7RIEJ97K33x6Q2iIupOe2bd90FNZQbZbzAK39cGKLRnjAKtMni' 
WHERE email = 'admin@supplychainx.com';

SELECT email, role, password 
FROM users 
WHERE email = 'admin@supplychainx.com';
