# BudgetApp

```mermaid
classDiagram
 ReactApp : BrowserRouter routing
ReactApp : File index.css
ReactApp --|> Navbar
Navbar --|> SignupPage
Navbar --|> LoginPage
SignupPage --|> SignupForm
SignupPage --|> LoginPage
LoginPage --|> SignupPage
LoginPage --|> LoginForm
class Navbar{
string accounts
string transactions
}
class SignupPage{
SignupForm()
PostUser()
}
class SignupForm {
string firstname
string lastname
string email
string username
string password
onSubmit()
}
class LoginPage{
LoginForm()
GetUser()
}
class LoginForm {
string email
string username
string password
onSubmit()
}
```

```mermaid
classDiagram
    class User {
       - string username
       - string password
       - string email
       - string firstName
       - string lastName
       - int userID
       - int budgetID
       - GetUsers.("GET")
       - GetUser.("GET", id)
       - CreateUser.("POST", id)
       - UpdateUser.("PUT", id)
       - DeleteUser.("DELETE", id)
    }
    class Budget {
        - int budgetID
        - float netTotal
        - float monthlyIncome
        - float scholarships
        - float debt
        - float savings
        - Interface customCategories
        - Interface outputCategories
        - GetBudgets.("GET")
        - GetBudget.("GET", id)
        - CreateBudget.("POST", id)
        - UpdateBudget.("PUT", id)
        - DeleteBudget.("DELETE", id)
    }
```
