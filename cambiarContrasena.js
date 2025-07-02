const bcrypt = require('bcrypt');

bcrypt.hash('admin', 10).then(hash => {
  console.log(hash); // Aquí ves la versión encriptada de "nueva"
});
bcrypt.hash('1234', 10).then(hash => {
  console.log(hash); // Aquí ves la versión encriptada de "nueva"
});