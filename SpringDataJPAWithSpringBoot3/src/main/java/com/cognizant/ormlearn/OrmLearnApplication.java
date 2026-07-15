package com.cognizant.ormlearn;

import com.cognizant.ormlearn.entity.Department;
import com.cognizant.ormlearn.entity.Employee;
import com.cognizant.ormlearn.entity.Skill;
import com.cognizant.ormlearn.service.DepartmentService;
import com.cognizant.ormlearn.service.EmployeeService;
import com.cognizant.ormlearn.service.SkillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(OrmLearnApplication.class);

    private static EmployeeService employeeService;
    private static DepartmentService departmentService;
    private static SkillService skillService;

    public static void main(String[] args) {

        ApplicationContext context =
                SpringApplication.run(OrmLearnApplication.class, args);

        employeeService = context.getBean(EmployeeService.class);
        departmentService = context.getBean(DepartmentService.class);
        skillService = context.getBean(SkillService.class);

        // Uncomment ONLY ONE test method at a time

        //testGetEmployee();

        //testGetDepartment();

        //testAddEmployee();

        //testUpdateEmployee();

        testAddSkillToEmployee();
    }

    private static void testGetEmployee() {

        LOGGER.info("Start");

        Employee employee = employeeService.get(1);

        LOGGER.debug("Employee : {}", employee);
        LOGGER.debug("Department : {}", employee.getDepartment());
        LOGGER.debug("Skills : {}", employee.getSkillList());

        LOGGER.info("End");
    }

    private static void testGetDepartment() {

        LOGGER.info("Start");

        Department department = departmentService.get(1);

        LOGGER.debug("Department : {}", department);
        LOGGER.debug("Employees : {}", department.getEmployeeList());

        LOGGER.info("End");
    }

    private static void testAddEmployee() {

        LOGGER.info("Start");

        try {

            Employee employee = new Employee();

            employee.setName("David");
            employee.setSalary(new BigDecimal("65000"));
            employee.setPermanent(true);
            employee.setDateOfBirth(
                    new SimpleDateFormat("yyyy-MM-dd").parse("1998-08-15"));

            Department department = departmentService.get(1);

            employee.setDepartment(department);

            employeeService.save(employee);

            LOGGER.debug("Employee : {}", employee);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        LOGGER.info("End");
    }

    private static void testUpdateEmployee() {

        LOGGER.info("Start");

        Employee employee = employeeService.get(1);

        Department department = departmentService.get(2);

        employee.setDepartment(department);

        employeeService.save(employee);

        LOGGER.debug("Updated Employee : {}", employee);

        LOGGER.info("End");
    }

    private static void testAddSkillToEmployee() {

        LOGGER.info("Start");

        Employee employee = employeeService.get(1);

        Skill skill = skillService.get(3);

        employee.getSkillList().add(skill);

        employeeService.save(employee);

        LOGGER.debug("Employee : {}", employee);

        LOGGER.info("End");
    }
}