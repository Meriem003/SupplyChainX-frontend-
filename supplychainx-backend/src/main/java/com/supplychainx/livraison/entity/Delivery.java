package com.supplychainx.livraison.entity;

import com.supplychainx.livraison.enums.DeliveryStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDelivery;
    
    @OneToOne
    @JoinColumn(name = "order_id", unique = true, nullable = false)
    private Order order;
    
    private String vehicle;
    
    private String driver;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status;
    
    private LocalDate deliveryDate;
    
    private Double cost;
}
