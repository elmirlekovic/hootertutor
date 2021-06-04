$( "#requestform" ).validate({
    rules: {
      subject: {
          required: true,
      },
      duration:{
        required: true,
      }
    }
  });
  const durationFormHandler = async (event) => {
    event.preventDefault();
    const subject = document.querySelector('#subject').value.trim();
    const duration = document.querySelector('#duration').value;
    if (subject && duration) {
        document.location.replace('/requests/'+subject);
      } else {
        $("#error").text(rdata.message);
      }
    };

  document
    .querySelector('.help-request-form')
    .addEventListener('submit', durationFormHandler);
