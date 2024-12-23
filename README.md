# LOGIN AFTER REFRESH

- In a Body.js call a profile/view API with axios
- Add a parameter in API with credentials true
- With useDispatch save data to redux with addUser Reducer
- in a try catch error add navigate to ("/login") to not able to acced any page without login
- <img src="./images/loginafterRefresh.png" alt="Sample Image" width="600">

# LOGOUT

- in a navbar add a handleLogout function to LOGOUT button
- create handleLogout - function > call logout API using axios
- empty redux store with removeUser reducer
- navigate page to "/login"
- <img src="./images/logoutbutton.png" alt="Sample Image" width="600">
- handle error in login.js
- add a dynamic text above login button
- with useState make it work dynamic
- <img src="./images/errorhandle.png" alt="Sample Image" width="600">
