-- ========================================
-- SupplyChainX - Script d'Initialisation
-- ========================================

-- Supprimer la base de données si elle existe
DROP DATABASE IF EXISTS supply_chainx_db;

-- Créer la base de données
CREATE DATABASE supply_chainx_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Utiliser la base de données
USE supply_chainx_db;

-- ========================================
-- Insertion d'un utilisateur ADMIN par défaut
-- ========================================
-- IMPORTANT: Ce script sera exécuté après la création des tables par Hibernate
-- Pour insérer l'admin, exécutez cette partie après le démarrage de l'application

-- INSERT INTO users (first_name, last_name, email, password, role) 
-- VALUES ('Admin', 'SupplyChainX', 'admin@supplychainx.com', 'admin123', 'ADMIN');

-- ========================================
-- Vérification
-- ========================================
SELECT 'Base de données supply_chainx_db créée avec succès!' AS status;

-- Afficher les bases de données
SHOW DATABASES;

