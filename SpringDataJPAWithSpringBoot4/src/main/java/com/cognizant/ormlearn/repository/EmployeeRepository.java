package com.cognizant.ormlearn.repository;

import com.cognizant.ormlearn.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    @Query("SELECT DISTINCT e FROM Employee e LEFT JOIN FETCH e.department LEFT JOIN FETCH e.skillList WHERE e.permanent = true")
    List<Employee> getAllPermanentEmployees();
}