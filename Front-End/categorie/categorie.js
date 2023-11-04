let mon_id

function Base(){
    window.addEventListener("load", getAllProducts);
    CloseEditForm();
}


function ajout(btnType) {
    if (btnType === "save") {
        event.preventDefault();
            
        let designation = document.getElementById("designation").value;
                fetch("http://localhost/JavaScript/Back-end/categorie/ajoutcategorie.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", 
                  },
                  body: JSON.stringify({"designation" : designation}), 
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
                    }
                  })
                  .catch((error) => {
                    console.error(error);  
                    handlingError(error);
            
                  });
      
    }else {
        console.log("marche pas")
    }
    Base()

}

function modifier(btnType) {
    if (btnType === "save") {
                     
            let designation = document.getElementById("mdesignation").value;
            let id_categorie = mon_id
            const loginData = {
                id_categorie: id_categorie,  
                designation: designation, 
    
              };
              fetch("http://localhost/JavaScript/Back-end/categorie/editcategorie.php", {
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
                  }
                })
                .catch((error) => {
                  console.error(error);  
                  handlingError(error);
          
                });
                
                CloseEditForm()
    }else if (btnType === "effacer"){
        CloseEditForm();

    }else  {
        console.log("marche pas")
    }
    Base()

}


function supprimer(btnType) {
    if (btnType === "delete") {
                     
            let id_categorie = mon_id
            const loginData = {
                id_categorie: id_categorie,  
              };
              fetch("http://localhost/JavaScript/Back-end/categorie/suppcategorie.php", {
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
                  }
                })
                .catch((error) => {
                  console.error(error);  
                  handlingError(error);
          
                });
                
                CloseEditForm()
    }else if (btnType === "effacer"){
        CloseEditForm();

    }else  {
        console.log("marche pas")
    }
    Base()

}

function getAllProducts() {
  const tableBody = document.getElementById("table");

  fetch("http://localhost/JavaScript/Back-end/categorie/getallcategorie.php")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then((data) => {
          if(data.data.length > 0 ){
                data.data.forEach((product) => {
              const row = document.createElement("tr");

             // Create and add cells for each product property
             const productCell = document.createElement("td");
             productCell.textContent = product.id_categorie;
        
             const category = document.createElement("td");
             category.textContent = product.designation;


             // Create edit and delete buttons
             const editCell = document.createElement("td");
             const editButton = document.createElement("button");
             editButton.textContent = "Edit";
             editButton.addEventListener("click",()=>editProduct( product.id_categorie, product.designation));
             editCell.appendChild(editButton);
             

             const deleteCell = document.createElement("td");
             const deleteButton = document.createElement("button");
             deleteButton.textContent = "Delete";
             deleteButton.addEventListener("click",()=>deleteProduct( product.id_categorie, product.designation));
             deleteCell.appendChild(deleteButton);


              // Append cells to the row
             
              row.appendChild(productCell);
              row.appendChild(category);
              row.appendChild(editCell);
              row.appendChild(deleteCell);

              // Append the row to the table body
              tableBody.appendChild(row);
          });
          }
          else{
              const voidDiv = document.getElementById("Void");
             
              voidDiv.innerHTML = `   Sorry, but there are currently no products available. <br/>
               Add A New Product 
               </a> `

          }
        
      })
      .catch((error) => {
          console.error(error);
      });
}

window.addEventListener("load", getAllProducts);


function CloseEditForm() {
    const editForm = document.getElementById('editForm');
    const ajoutForm = document.getElementById('ajoutForm');
    const deleteForm = document.getElementById('deleteForm');
    const liste = document.getElementById('liste');
    editForm.style.display =  'none';
    deleteForm.style.display =  'none';
    liste.style.display =  'none';
    ajoutForm.style.display = 'block';
}

const editProduct = (id , designation) => {

    //document.getElementById("editButton").addEventListener("click", () => toggleEditForm());

    function toggleEditForm() {
        const editForm = document.getElementById('editForm');
        const ajoutForm = document.getElementById('ajoutForm');
        const deleteForm = document.getElementById('deleteForm');
        editForm.style.display =  'block';
        ajoutForm.style.display = 'none';
        deleteForm.style.display = 'none';
    }
    toggleEditForm()

    const infoLabel = document.getElementById("id_m");
    $id_categorie = id ;
    $name = designation ;
    console.log($id_categorie)
    console.log($name)
    document.getElementById('mdesignation').value = $name;
    infoLabel.textContent = $id_categorie;

    mon_id = $id_categorie

   //const editURL = `https://localhost/JavaScript/Front-end/categorie/editcategorie.html?id_categorie=${id}`;

   // window.location.href = editURL;
  }

  const deleteProduct = (id , designation) => {



    function toggleDeleteForm() {
        const editForm = document.getElementById('editForm');
        const ajoutForm = document.getElementById('ajoutForm');
        const deleteForm = document.getElementById('deleteForm');
        deleteForm.style.display =  'block';
        ajoutForm.style.display = 'none';
        editForm.style.display =  'none';
    }
    toggleDeleteForm()

    const infoLabel = document.getElementById("id_d");
    const nomLabel = document.getElementById("nom_c");
    $id_categorie = id ;
    $name = designation ;
    console.log($id_categorie)
    console.log($name)
    infoLabel.textContent = $id_categorie;
    nomLabel.textContent = $name;


    mon_id = $id_categorie

   //const editURL = `https://localhost/JavaScript/Front-end/categorie/editcategorie.html?id_categorie=${id}`;

   // window.location.href = editURL;
  }

  function recherche(btnType) {
    if (btnType === "search") {

            const liste = document.getElementById('liste');
            liste.style.display =  'block';

            event.preventDefault();
            document.getElementById("Liste").disabled = false;

           
            const tableBody = document.getElementById("table");
            const designation = document.getElementById("ndesignation").value;
            let tr = "";


            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }


            fetch(`http://localhost/JavaScript/Back-end/categorie/searchcategorie.php?designation=${designation}`, {
                method: "GET",
                headers: {
                    "content-Type": "application/json"
                }
            })     
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if(data.data.length > 0 ){
                      data.data.forEach((product) => {
                    const row = document.createElement("tr");
      
                   // Create and add cells for each product property
                   const productCell = document.createElement("td");
                   productCell.textContent = product.id_categorie;
              
                   const category = document.createElement("td");
                   category.textContent = product.designation;
      
      
                   // Create edit and delete buttons
                   const editCell = document.createElement("td");
                   const editButton = document.createElement("button");
                   editButton.textContent = "Edit";
                   editButton.addEventListener("click",()=>editProduct( product.id_categorie, product.designation));
                   editCell.appendChild(editButton);
                   
      
                   const deleteCell = document.createElement("td");
                   const deleteButton = document.createElement("button");
                   deleteButton.textContent = "Delete";
                   deleteButton.addEventListener("click",()=>deleteProduct( product.id_categorie));
                   deleteCell.appendChild(deleteButton);
      
      
                    // Append cells to the row
                   
                    row.appendChild(productCell);
                    row.appendChild(category);
                    row.appendChild(editCell);
                    row.appendChild(deleteCell);
      
                    // Append the row to the table body
                    tableBody.appendChild(row);
                });
                }
                else{
                    const voidDiv = document.getElementById("Void");
                   
                    voidDiv.innerHTML = `   Sorry, but there are currently no products available. <br/>
                     Add A New Product 
                     </a> `
      
                }
              
            })
            .catch((error) => {
                console.error(error);
            });
    }
  }


  function ClearForm(btnType){
    if (btnType === "effacer"){
        event.preventDefault();
        const form = document.getElementById('form')

        inputs = form.querySelectorAll('input')

        for (let input of inputs){
            input.value = '';
        }
    }
}

async function redirectBasedOnLoginStatus() {
    const response = await fetch('http://localhost/JavaScript/Back-end/login/isLogin.php');
    
    const json = await response.json();
   
    return json.loggedIn
  
  }
  async function isLogin() {
    const  isLogin= await redirectBasedOnLoginStatus()
  
     if (isLogin ===false) {
  
            window.location.href = "http://localhost/JavaScript/Front-End/login/login.html";
         }
       } 
  
  isLogin()