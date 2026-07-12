package com.library.countryservice;

import com.library.countryservice.model.Country;
import com.library.countryservice.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class CountryServiceApplication implements CommandLineRunner {

    @Autowired
    private CountryService countryService;

    public static void main(String[] args) {
        SpringApplication.run(CountryServiceApplication.class, args);
    }

    @Override
    public void run(String... args) {
        List<Country> countries = countryService.getAllCountries();

        for (Country country : countries) {
            System.out.println(country.getCode() + " - " + country.getName());
        }
    }
}