package com.supplychainx.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        String[] passwords = {
            "admin123",
            "Password@123",
            "test123"
        };
        
        System.out.println("=== Générateur de Hash BCrypt ===\n");
        
        for (String password : passwords) {
            String hash = encoder.encode(password);
            System.out.println("Mot de passe: " + password);
            System.out.println("Hash BCrypt:  " + hash);
            System.out.println("Vérification: " + encoder.matches(password, hash));
            System.out.println("-----------------------------------\n");
        }
        
        System.out.println("=== Script SQL ===");
        System.out.println("UPDATE users SET password = '" + encoder.encode("Password@123") + "' WHERE email = 'pierre.dubois@supply.com';");
    }
}
