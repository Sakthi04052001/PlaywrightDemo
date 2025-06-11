Feature: Login Functionality
    Verify the login functionality of the application

  Scenario Outline: Login attempt with different credentials
    Given the user is on the login page
    When the user enters username "<username>" and password "<password>"
    And the user clicks the login button
    Then the user should "<outcome>" be redirected to the Dashboard page

    Examples:
      | username         | password   | outcome |
      | admin@email.com  | admin@123  |         |
      | admin1@email.com | admin@123  | not     |
      | admin@email.com  | admin@1234 | not     |
      | admin1@email.com | admin@1234 | not     |
