package com.cognizant.springdatajpa.service;

import com.cognizant.springdatajpa.entity.Country;
import com.cognizant.springdatajpa.exception.CountryNotFoundException;
import com.cognizant.springdatajpa.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Transactional
    public Country findCountryByCode(String countryCode)
            throws CountryNotFoundException {

        Optional<Country> result =
                countryRepository.findById(countryCode);

        if (!result.isPresent()) {
            throw new CountryNotFoundException("Country not found");
        }

        return result.get();
    }
    @Transactional
    public Country addCountry(Country country) {
        return countryRepository.save(country);
    }
    @Transactional
    public void updateCountry(String code, String name) {

        Country country = countryRepository.findById(code).orElse(null);

        if (country != null) {
            country.setName(name);
            countryRepository.save(country);
        }
    }
    @Transactional
    public List<Country> searchCountries(String text) {
        return countryRepository.findByNameContainingIgnoreCaseOrderByNameAsc(text);
    }
    @Transactional
    public List<Country> searchCountriesStartingWith(String alphabet) {
        return countryRepository.findByNameStartingWithIgnoreCase(alphabet);
    }
}