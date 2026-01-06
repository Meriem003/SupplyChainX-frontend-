package com.supplychainx.livraison.repository;

import com.supplychainx.livraison.entity.Delivery;
import com.supplychainx.livraison.enums.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    
    List<Delivery> findByStatus(DeliveryStatus status);
}
