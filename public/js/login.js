$( "#loginform" ).validate({
  rules: {
    password: {
        required: true,
        minlength: 8
    },
    email:{
      required: true,
      email: true
    }
  }
});



const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        console.log("Getting JSON data...")
        const rdata = await response.json();
        
        if (response.ok) {
          //Redirect based on returned user properties
          console.log("Determining redirect...")
          console.log(rdata.is_student);
          console.log(rdata.is_tutor);

          if(rdata.is_student){
            console.log('Navigating student...')
            document.location.replace('/student-portal');
          }

          if(rdata.is_tutor){
            console.log("Navigating tutor...")
            document.location.replace('/tutor');
          }


          // If successful, redirect the browser to the profile page
          //document.location.replace(rdata.path);
        } else {
            $("#error").text(rdata.message);
        }
      }
    };  
//     if (email && password) {
//       // Send a POST request to the API endpoint
//       const response = await fetch('/api/user/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         // If successful, redirect the browser to the profile page
//         document.location.replace('/profile');
//       } else {
//         $("#error").html(response.message)
//       }
//     }
//   };
  
//   const signupFormHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#name-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
  
//     if (name && email && password) {
//       const response = await fetch('/api/user', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert(response.statusText);
//       }
//     }
//   };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
//   document
//     .querySelector('.signup-form')
//     .addEventListener('submit', signupFormHandler);
  