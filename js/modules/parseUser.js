{
  const user = {
    firstName: "Cleber",
    lastName: "zacher",
  };
  
  console.log("user ->", user);

  function parseUser() {
    return `Hello ${user.firstName} ${user.lastName}`;
  }
}
