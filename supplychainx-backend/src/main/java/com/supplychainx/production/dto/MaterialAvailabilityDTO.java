package com.supplychainx.production.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialAvailabilityDTO {
    
    private Long idMaterial;
    private String materialName;
    private Integer requiredQuantity;
    private Integer availableStock;
    private Boolean isAvailable;
}
