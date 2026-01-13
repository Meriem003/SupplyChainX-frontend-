-- Script pour mettre à jour le mot de passe de Pierre Dubois
-- Mot de passe: Password@123
-- Hash BCrypt généré pour Password@123

USE supply_chainx_db;

-- Vérifier l'utilisateur existant
SELECT id_user, email, role, LEFT(password, 20) as current_password 
FROM users 
WHERE email = 'pierre.dubois@supply.com';

-- Pour générer le hash BCrypt de Password@123, vous devez :
-- 1. Utiliser un générateur BCrypt en ligne (https://bcrypt-generator.com/)
-- 2. Ou exécuter un petit programme Java/Spring Boot

-- Exemple avec un hash BCrypt pour Password@123:
-- Hash: $2a$10$N9qo8uLOickgx2ZMRZoMye9J3v3V3V3V3V3V3V3V3V3V3V3V3V3Ve

-- IMPORTANT: Remplacez ce hash par le véritable hash BCrypt de Password@123
UPDATE users 
SET password = '$2a$10$rOv5H8Y5F5F5F5F5F5F5F.rOv5H8Y5F5F5F5F5F5F5F5F5F5F5F5F5' 
WHERE email = 'pierre.dubois@supply.com';

-- Vérifier la mise à jour
SELECT id_user, email, role, LEFT(password, 30) as updated_password 
FROM users 
WHERE email = 'pierre.dubois@supply.com';
