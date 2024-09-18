package com.teamtable.teamtable_api.controller;

import com.teamtable.teamtable_api.model.Product;
import com.teamtable.teamtable_api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Page<Product> getAllProducts(@RequestParam int page, @RequestParam int size) {
        return productService.getAllProducts(PageRequest.of(page, size));
    }

    @GetMapping("/search")
    public Page<Product> searchProducts(@RequestParam String query, @RequestParam int page, @RequestParam int size) {
        return productService.searchProducts(query, PageRequest.of(page, size));
    }

    @GetMapping("/filter")
    public Page<Product> filterProducts(
            @RequestParam(required = false) Product.ProductCategory category,
            @RequestParam(required = false) Product.ProductBrand brand,
            @RequestParam(required = false) Product.ProductCondition productCondition,
            @RequestParam int page,
            @RequestParam int size) {
        return productService.filterProducts(category, brand, productCondition, PageRequest.of(page, size));
    }

    @GetMapping("/categories")
    public List<Product.ProductCategory> getCategories() {
        return Arrays.asList(Product.ProductCategory.values());
    }

    @GetMapping("/brands")
    public List<Product.ProductBrand> getBrands() {
        return Arrays.asList(Product.ProductBrand.values());
    }

    @GetMapping("/conditions")
    public List<Product.ProductCondition> getConditions() {
        return Arrays.asList(Product.ProductCondition.values());
    }
}