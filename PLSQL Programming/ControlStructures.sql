/* ============================================================
   Exercise 1 - Scenario 1
   Apply 1% discount to loan interest rates for customers
   above 60 years of age.
   ============================================================ */

DECLARE
    CURSOR customer_cursor IS
        SELECT c.CustomerID,
               c.Name,
               c.DOB,
               l.LoanID,
               l.InterestRate
        FROM Customers c
                 JOIN Loans l
                      ON c.CustomerID = l.CustomerID;

    v_age NUMBER;

BEGIN
    FOR cust IN customer_cursor LOOP

            v_age := FLOOR(MONTHS_BETWEEN(SYSDATE, cust.DOB) / 12);

            IF v_age > 60 THEN
                UPDATE Loans
                SET InterestRate = InterestRate - 1
                WHERE LoanID = cust.LoanID;

                DBMS_OUTPUT.PUT_LINE(
                        cust.Name || ' is above 60 years. Interest rate reduced by 1%.'
                );
            END IF;

        END LOOP;

    COMMIT;
END;
/

/* ============================================================
   Exercise 1 - Scenario 2
   Promote customers with balance greater than 10000 to VIP.
   ============================================================ */

BEGIN

    UPDATE Customers
    SET IsVIP = 'TRUE'
    WHERE Balance > 10000;

    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' customer(s) promoted to VIP.');

    COMMIT;

END;
/

/* ============================================================
   Exercise 1 - Scenario 3
   Display reminders for loans due within the next 30 days.
   ============================================================ */

DECLARE
    CURSOR loan_cursor IS
        SELECT c.CustomerID,
               c.Name,
               l.LoanID,
               l.EndDate
        FROM Customers c
                 JOIN Loans l
                      ON c.CustomerID = l.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30;

BEGIN

    FOR loan_rec IN loan_cursor LOOP

            DBMS_OUTPUT.PUT_LINE(
                    'Reminder: Loan ID ' || loan_rec.LoanID ||
                    ' for Customer ' || loan_rec.Name ||
                    ' is due on ' ||
                    TO_CHAR(loan_rec.EndDate, 'DD-MON-YYYY')
            );

        END LOOP;

END;
/