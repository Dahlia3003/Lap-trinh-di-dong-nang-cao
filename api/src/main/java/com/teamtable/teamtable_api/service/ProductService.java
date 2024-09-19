package com.teamtable.teamtable_api.service;

import com.teamtable.teamtable_api.model.Product;
import com.teamtable.teamtable_api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> searchProducts(String query, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(query, pageable);
    }

    public Page<Product> getTopSellingProducts(Pageable pageable) {
        return productRepository.findByOrderBySalesDesc(pageable);
    }

    public Page<Product> filterProducts(Product.ProductCategory category, Product.ProductBrand brand, Product.ProductCondition productCondition, Pageable pageable) {
        return productRepository.findByCategoryAndBrandAndProductCondition(category, brand, productCondition, pageable);
    }

}