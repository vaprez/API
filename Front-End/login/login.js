

function ClearForm(){
    const form = document.getElementById('form')

    inputs = form.querySelectorAll('input')

    for (let input of inputs){
        input.value = '';
    }
}

const handlingError = (error) => {
    const ErrorDiv = document.getElementById("ErrorHandling");
    const contentHTML = error;
    ErrorDiv.innerHTML = contentHTML;
  
    setTimeout(() => {
      ErrorDiv.innerHTML = "";
    }, 2000);
  };

  
const homePageURL = "../categorie/categories.html";
const loginpage = "../login/login.html";
async function Connexion(btnType) {
    if (btnType === "connect") {
        event.preventDefault();   
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (!email || !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
          handlingError("Invalid email address.");
          return;
        }

        const loginData = {
            email: email, 
            password:password ,     
          };
          console.log(loginData)
          fetch("http://localhost/JavaScript/Back-end/login/login.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(loginData), 
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              } 
              // we don t have error 
              return response.json();
            })
            .then((data) => {
              if (data.error) {
                // console.error(data.message); 
                handlingError(data.message);
              } else if (data.success) {
                console.log(data.message); 
                window.location.href = homePageURL;
              }
            })
            .catch((error) => {
              console.error(error);  
              handlingError(error);
      
            });
        } else if (btnType === "inscription") {
            event.preventDefault();   
            let nom = document.getElementById("nom").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
    
            if (!email || !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
              handlingError("Invalid email address.");
              return;
            }
    
            const loginData = {
                nom: nom,  
                email: email, 
                password:password ,     
              };
              console.log(loginData)
              fetch("https://localhost/JavaScript/Back-end/login/inscription.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", 
                },
                body: JSON.stringify(loginData), 
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  } 
                  // we don t have error 
                  return response.json();
                })
                .then((data) => {
                  if (data.error) {
                    // console.error(data.message); 
                    handlingError(data.message);
                  } else if (data.success) {
                    console.log(data.message); 
                    window.location.href = loginpage;
                  }
                })
                .catch((error) => {
                  console.error(error);  
                  handlingError(error);
          
                });

        }
        else if (btnType === "logout") {
            fetch("http://localhost/JavaScript/Back-end/login/logout.php", {
              method: "GET", 
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(function (response) {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then(function (data) {
                if (data.error === false) {
               
                  console.log(data.message);
                  window.location.href = loginpage;
                } else {
                
                  console.error(data.message);
                }
              })
              .catch(function (error) {
                console.error(error);
              });
            
        }
      }


      
    


  


      