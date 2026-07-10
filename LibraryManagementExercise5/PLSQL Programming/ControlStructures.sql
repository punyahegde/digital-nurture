SET SERVEROUTPUT ON;

DECLARE
    v_balance NUMBER;
BEGIN
    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = 1;

    IF v_balance < 500 THEN
        UPDATE Accounts
        SET Balance = Balance - 50
        WHERE AccountID = 1;

        DBMS_OUTPUT.PUT_LINE('Maintenance fee of 50 deducted.');
    ELSE
        DBMS_OUTPUT.PUT_LINE('No maintenance fee charged.');
    END IF;

    COMMIT;
END;
/
SELECT * FROM Accounts;



SET SERVEROUTPUT ON;

BEGIN
    UPDATE Loans
    SET InterestRate = InterestRate - 1
    WHERE EndDate > SYSDATE;

    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' loan(s) updated.');

    COMMIT;
END;
/
SELECT * FROM Loans;



SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_customers IS
        SELECT CustomerID, Name
        FROM Customers;

BEGIN
    FOR rec IN c_customers LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder sent to Customer ID: ' ||
            rec.CustomerID || ' - ' || rec.Name
        );
    END LOOP;
END;
/




SET SERVEROUTPUT ON;

DECLARE
    v_amount NUMBER := 200;
BEGIN
    UPDATE Accounts
    SET Balance = Balance - v_amount
    WHERE AccountID = 1;

    UPDATE Accounts
    SET Balance = Balance + v_amount
    WHERE AccountID = 2;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Funds transferred successfully.');
END;
/
SELECT AccountID, Balance
FROM Accounts;

SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_emp IS
        SELECT EmployeeID, Name, Salary
        FROM Employees;
    v_bonus NUMBER;
BEGIN
    FOR emp IN c_emp LOOP
        v_bonus := emp.Salary * 0.10;

        DBMS_OUTPUT.PUT_LINE(
            emp.Name || ' Bonus = ' || v_bonus
        );
    END LOOP;
END;
/