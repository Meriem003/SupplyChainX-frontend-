-- Script pour créer l'utilisateur admin avec mot de passe crypté
-- 🔐 Ce script utilise un hash BCrypt pour sécuriser le mot de passe

USE supply_chainx_db;

-- Mot de passe: admin123
-- Hash BCrypt généré: $2a$10$DHw7RIEJ97K33x6Q2iIupOe2bd90FNZQbZbzAK39cGKLRnjAKtMni

INSERT INTO users (first_name, last_name, email, password, role)
VALUES ('Admin', 'SupplyChainX', 'admin@supplychainx.com', '$2a$10$DHw7RIEJ97K33x6Q2iIupOe2bd90FNZQbZbzAK39cGKLRnjAKtMni', 'ADMIN');

-- Vérifier que l'admin a été créé
SELECT id_user, first_name, last_name, email, role 
FROM users 
WHERE role = 'ADMIN';

-- ⚠️ IMPORTANT: Le mot de passe est maintenant crypté
-- Pour se connecter avec Postman:
--   email: admin@supplychainx.com
--   password: admin123 (en clair dans le header)
