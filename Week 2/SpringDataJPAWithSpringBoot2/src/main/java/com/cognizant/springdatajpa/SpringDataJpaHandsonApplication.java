package com.cognizant.springdatajpa;

import com.cognizant.springdatajpa.entity.Country;
import com.cognizant.springdatajpa.exception.CountryNotFoundException;
import com.cognizant.springdatajpa.service.CountryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SpringDataJpaHandsonApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(SpringDataJpaHandsonApplication.class);

    private static CountryService countryService;

    public static void main(String[] args) {

        ApplicationContext context =
                SpringApplication.run(SpringDataJpaHandsonApplication.class, args);

        countryService = context.getBean(CountryService.class);

        // Row 20
        //testGetCountry();

        // Row 21
        // testAddCountry();
        //testUpdateCountry();
        //testSearchCountries();
        testSearchCountriesStartingWith();
    }

    private static void testGetCountry() {

        LOGGER.info("Start");

        try {
            Country country = countryService.findCountryByCode("IN");
            LOGGER.info("Country: {}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.error(e.getMessage());
        }

        LOGGER.info("End");
    }

    private static void testAddCountry() {

        LOGGER.info("Start");

        Country country = new Country();
        country.setCode("ZZ");
        country.setName("Zedland");

        countryService.addCountry(country);

        try {
            Country result = countryService.findCountryByCode("ZZ");
            LOGGER.info("Country Added: {}", result);
        } catch (CountryNotFoundException e) {
            LOGGER.error(e.getMessage());
        }

        LOGGER.info("End");
    }
    private static void testUpdateCountry() {

        LOGGER.info("Start");

        countryService.updateCountry("ZZ", "Updated Zedland");

        try {
            Country country = countryService.findCountryByCode("ZZ");
            LOGGER.info("Updated Country: {}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.error(e.getMessage());
        }

        LOGGER.info("End");
    }
    private static void testSearchCountries() {

        LOGGER.info("Start");

        countryService.searchCountries("ou")
                .forEach(country -> LOGGER.info("{}", country));

        LOGGER.info("End");
    }
    private static void testSearchCountriesStartingWith() {

        LOGGER.info("Start");

        countryService.searchCountriesStartingWith("A")
                .forEach(country -> LOGGER.info("{}", country));

        LOGGER.info("End");
    }
}