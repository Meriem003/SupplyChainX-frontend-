-- ==========================================
-- DÉMARRAGE RAPIDE - Utilisateur Admin
-- ==========================================
-- Exécutez ce script après le premier démarrage
-- pour créer rapidement l'utilisateur ADMIN

USE supply_chainx_db;

-- Vérifier si l'utilisateur admin existe déjà
SELECT COUNT(*) as admin_count FROM users WHERE email = 'admin@supplychainx.com';

-- Si le résultat est 0, exécutez cette ligne :
INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Admin', 'SupplyChainX', 'admin@supplychainx.com', 'admin123', 'ADMIN');

-- Vérifier la création
SELECT * FROM users WHERE email = 'admin@supplychainx.com';

-- ==========================================
-- TESTER IMMÉDIATEMENT AVEC POSTMAN
-- ==========================================
-- URL: POST http://localhost:8080/api/users
-- Headers:
--   email: admin@supplychainx.com
--   password: admin123
--   Content-Type: application/json
-- Body:
-- {
--   "firstName": "Test",
--   "lastName": "User",
--   "email": "test@example.com",
--   "password": "test123",
--   "role": "CHEF_PRODUCTION"
-- }
