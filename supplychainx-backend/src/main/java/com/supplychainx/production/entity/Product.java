package com.supplychainx.production.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduct;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Integer productionTime;
    
    @Column(nullable = false)
    private Double cost;
    
    @Column(nullable = false)
    private Integer stock;
}
