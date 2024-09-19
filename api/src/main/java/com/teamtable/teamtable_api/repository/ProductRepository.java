package com.teamtable.teamtable_api.repository;

import com.teamtable.teamtable_api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "(:category IS NULL OR p.category = :category) AND " +
            "(:brand IS NULL OR p.brand = :brand) AND " +
            "(:productCondition IS NULL OR p.productCondition = :productCondition)")
    Page<Product> findByCategoryAndBrandAndProductCondition(
            @Param("category") Product.ProductCategory category,
            @Param("brand") Product.ProductBrand brand,
            @Param("productCondition") Product.ProductCondition productCondition,
            Pageable pageable);
    Page<Product> findByOrderBySalesDesc(Pageable pageable);
}

