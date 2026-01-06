package com.supplychainx.approvisionnement.repository;

import com.supplychainx.approvisionnement.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
    
    @Query("SELECT m FROM RawMaterial m WHERE m.stock < m.stockMin")
    List<RawMaterial> findMaterialsBelowMinStock();
}
