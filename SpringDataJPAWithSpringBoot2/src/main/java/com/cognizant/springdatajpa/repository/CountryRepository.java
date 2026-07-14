package com.cognizant.springdatajpa.repository;

import com.cognizant.springdatajpa.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, String> {

    // Search by containing text and sort ascending
    List<Country> findByNameContainingIgnoreCaseOrderByNameAsc(String text);

    // Search countries starting with a letter
    List<Country> findByNameStartingWithIgnoreCase(String alphabet);

}