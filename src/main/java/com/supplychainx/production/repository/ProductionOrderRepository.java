package com.supplychainx.production.repository;

import com.supplychainx.production.entity.Product;
import com.supplychainx.production.entity.ProductionOrder;
import com.supplychainx.production.enums.ProductionOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, Long> {
    
    List<ProductionOrder> findByStatus(ProductionOrderStatus status);
    
    List<ProductionOrder> findByProduct(Product product);
}
