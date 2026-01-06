package com.supplychainx.livraison.repository;

import com.supplychainx.livraison.entity.Customer;
import com.supplychainx.livraison.entity.Order;
import com.supplychainx.livraison.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByStatus(OrderStatus status);
    
    List<Order> findByCustomer(Customer customer);
}
