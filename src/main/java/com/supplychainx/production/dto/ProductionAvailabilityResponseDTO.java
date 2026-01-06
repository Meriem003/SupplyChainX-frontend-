package com.supplychainx.production.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionAvailabilityResponseDTO {
    
    private Long productId;
    private String productName;
    private Integer requestedQuantity;
    private Boolean canProduce;
    private List<MaterialAvailabilityDTO> materialsStatus;
}
