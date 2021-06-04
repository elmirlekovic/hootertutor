$( "#signupform" ).validate({
    rules: {
      password: {
          required: true,
          minlength: 8
      },
      password_again: {
        equalTo: "#password"
      },
      email:{
        required: true,
        email: true
      },
      firstname:{
        required: true,
      },
      lastname:{
        required: true,
      },
      university:{
        required: true,
      },
      stcheck:{
        required: true,
      },

    }
  });
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const firstname = document.querySelector('#firstname').value.trim();
    const lastname = document.querySelector('#lastname').value.trim();
    const university = document.querySelector('#university').value.trim();
    let stcheck = $("input[name='stcheck']:checked").val();
    console.log($("input[name='stcheck']:checked").val());
    if (stcheck == 'is_tutor'){
        is_tutor=1;
    }else{
        is_tutor=0
    }
    if (stcheck == 'is_student'){
        is_student=1;
    }else{
        is_student=0;
    }

    if (firstname && lastname && email && password) {
      const response = await fetch('/api/user/create-user', {
        method: 'POST',
        body: JSON.stringify({ firstname,lastname, email, password, university, is_tutor, is_student}),
        headers: { 'Content-Type': 'application/json' },
      });
      const rdata = await response.json();
      if (response.ok) {
        if(rdata.is_student){
            console.log("Navigating student...")
            document.location.replace('/student-portal');
          }

          if(rdata.is_tutor){
            console.log("Navigating tutor...")
            document.location.replace('/tutor-portal');
          }
      } else {
        $("#error").text(rdata.message);
      }
    }
  };
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
