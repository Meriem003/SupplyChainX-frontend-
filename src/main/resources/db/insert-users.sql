-- ========================================
-- Script pour insérer un utilisateur ADMIN
-- ========================================
-- Exécutez ce script APRÈS le premier démarrage de l'application
-- (après que les tables soient créées par Hibernate)

USE supply_chainx_db;

-- Insérer l'utilisateur ADMIN par défaut
INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Admin', 'SupplyChainX', 'admin@supplychainx.com', 'admin123', 'ADMIN');

-- Insérer quelques utilisateurs de test pour chaque module

-- Module Approvisionnement
INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Marie', 'Martin', 'marie.martin@supplychainx.com', 'password123', 'GESTIONNAIRE_APPROVISIONNEMENT');

INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Pierre', 'Dubois', 'pierre.dubois@supplychainx.com', 'password123', 'RESPONSABLE_ACHATS');

INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Sophie', 'Bernard', 'sophie.bernard@supplychainx.com', 'password123', 'SUPERVISEUR_LOGISTIQUE');

-- Module Production
INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Jean', 'Dupont', 'jean.dupont@supplychainx.com', 'password123', 'CHEF_PRODUCTION');

INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Luc', 'Moreau', 'luc.moreau@supplychainx.com', 'password123', 'PLANIFICATEUR');

INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Claire', 'Petit', 'claire.petit@supplychainx.com', 'password123', 'SUPERVISEUR_PRODUCTION');

-- Module Livraison
INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Thomas', 'Robert', 'thomas.robert@supplychainx.com', 'password123', 'GESTIONNAIRE_COMMERCIAL');

INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Julie', 'Richard', 'julie.richard@supplychainx.com', 'password123', 'RESPONSABLE_LOGISTIQUE');

INSERT INTO users (first_name, last_name, email, password, role) 
VALUES ('Marc', 'Simon', 'marc.simon@supplychainx.com', 'password123', 'SUPERVISEUR_LIVRAISONS');

-- Vérifier les utilisateurs créés
SELECT * FROM users;

SELECT 'Utilisateurs de test créés avec succès!' AS status;
