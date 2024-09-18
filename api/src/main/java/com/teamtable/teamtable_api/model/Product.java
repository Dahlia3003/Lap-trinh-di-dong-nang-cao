package com.teamtable.teamtable_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    @Enumerated(EnumType.STRING)
    private ProductBrand brand;

    @Enumerated(EnumType.STRING)
    private ProductCondition productCondition;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Product() {
    }

    public Product(String name, String description, BigDecimal price, int quantity, ProductCategory category, ProductBrand brand, ProductCondition productCondition) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.brand = brand;
        this.productCondition = productCondition;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum ProductCategory {
        ELECTRONICS,
        FASHION,
        HOME_APPLIANCES,
        BOOKS,
        TOYS,
        GROCERIES,
        BEAUTY,
        SPORTS,
        AUTOMOTIVE
    }

    public enum ProductBrand {
        APPLE,
        SAMSUNG,
        SONY,
        LG,
        NIKE,
        ADIDAS,
        PUMA,
        DELL,
        HP,
        LENOVO
    }

    public enum ProductCondition {
        NEW,
        USED,
        REFURBISHED
    }
}