package com.supplychainx.production.repository;

import com.supplychainx.production.entity.BillOfMaterial;
import com.supplychainx.production.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillOfMaterialRepository extends JpaRepository<BillOfMaterial, Long> {
    
    List<BillOfMaterial> findByProduct(Product product);
}
