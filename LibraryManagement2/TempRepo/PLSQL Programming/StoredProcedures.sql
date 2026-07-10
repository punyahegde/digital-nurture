SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01);

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Monthly interest processed successfully.');
END;
/
BEGIN
    ProcessMonthlyInterest;
END;
/
SELECT AccountID, Balance
FROM Accounts;




SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_dept IN VARCHAR2,
    p_bonus IN NUMBER
)
IS
BEGIN
    UPDATE Employees
    SET Salary = Salary + p_bonus
    WHERE Department = p_dept;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' employee(s) updated.');
END;
/
BEGIN
    UpdateEmployeeBonus('IT', 5000);
END;
/
SELECT EmployeeID, Name, Salary, Department
FROM Employees;





SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE TransferFunds(
    p_fromAccount IN NUMBER,
    p_toAccount   IN NUMBER,
    p_amount      IN NUMBER
)
IS
BEGIN
    UPDATE Accounts
    SET Balance = Balance - p_amount
    WHERE AccountID = p_fromAccount;

    UPDATE Accounts
    SET Balance = Balance + p_amount
    WHERE AccountID = p_toAccount;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Funds transferred successfully.');
END;
/
BEGIN
    TransferFunds(2,1,200);
END;
/
SELECT AccountID, Balance
FROM Accounts;




SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE AddCustomer(
    p_id      IN NUMBER,
    p_name    IN VARCHAR2,
    p_dob     IN DATE,
    p_balance IN NUMBER
)
IS
BEGIN
    INSERT INTO Customers
    VALUES (p_id, p_name, p_dob, p_balance, SYSDATE);

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Customer added successfully.');
END;
/
BEGIN
    AddCustomer(3, 'Rahul Sharma', TO_DATE('1998-10-15','YYYY-MM-DD'), 2500);
END;
/
SELECT * FROM Customers;



SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE GetAccountBalance(
    p_accountid IN NUMBER
)
IS
    v_balance NUMBER;
BEGIN
    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = p_accountid;

    DBMS_OUTPUT.PUT_LINE('Account Balance: ' || v_balance);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Account not found.');
END;
/
BEGIN
    GetAccountBalance(1);
END;
/