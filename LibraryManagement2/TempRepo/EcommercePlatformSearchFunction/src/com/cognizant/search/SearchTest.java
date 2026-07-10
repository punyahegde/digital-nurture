package com.cognizant.search;

public class SearchTest {

    public static void main(String[] args) {

        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Mobile", "Electronics"),
                new Product(103, "Shoes", "Fashion"),
                new Product(104, "Watch", "Accessories"),
                new Product(105, "Bag", "Fashion")
        };

        int searchId = 103;

        System.out.println("Linear Search Result:");
        Product linearResult =
                SearchAlgorithms.linearSearch(products, searchId);

        if (linearResult != null) {
            System.out.println(linearResult);
        } else {
            System.out.println("Product not found");
        }

        System.out.println("\nBinary Search Result:");
        Product binaryResult =
                SearchAlgorithms.binarySearch(products, searchId);

        if (binaryResult != null) {
            System.out.println(binaryResult);
        } else {
            System.out.println("Product not found");
        }
    }
}