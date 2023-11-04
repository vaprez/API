
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('date_in').value = currentDate;
});

document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('date_up').value = currentDate;
});

function Base(){
    window.addEventListener("load", getAllProducts);
    CloseEditForm();
}

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


const editProduct = (id , designation,prix,categorie) => {

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
    $id_prodruit = id ;
    $name = designation ;
    $prix_m = prix;
    $id_cat = categorie
    console.log($id_prodruit)
    console.log($name)
    document.getElementById('mdesignation').value = $name;
    document.getElementById('mprix').value = $prix_m;
    infoLabel.textContent = $id_prodruit;

    mon_id = $id_prodruit

  }

  
  const deleteProduct = (id , designation,prix,categorie) => {



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
    const prixLabel = document.getElementById("prix_c");
    $id_prodruit = id ;
    $name = designation ;
    $prix_m = prix;
    $id_cat = categorie
    console.log($id_prodruit)
    console.log($name)
    infoLabel.textContent = $id_prodruit;
    nomLabel.textContent = $name;
    prixLabel.textContent = $prix_m;


    mon_id = $id_prodruit;
  }


let mon_id
let categorie_choix
//let categorie_choix_r = 6


function ajout(btnType) {
    if (btnType === "save") {
        event.preventDefault();
            
        let designation = document.getElementById("designation").value;
       
        let prix = document.getElementById("prix").value;
        let date_in = document.getElementById("date_in").value;


        console.log(categorie_choix)

        const loginData = {  
            designation: designation, 
            categorie: categorie_choix, 
            prix: prix, 
            date_in: date_in, 

          };
                fetch("http://localhost/JavaScript/Back-end/produit/ajoutproduit.php", {
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
      
    }else {
        console.log("marche pas")
    }
    Base()

}


function modifier(btnType) {
    if (btnType === "save") {
                     
            let designation = document.getElementById("mdesignation").value;
            let id_prodruit = mon_id
            let prix = document.getElementById("mprix").value;
            let date_up = document.getElementById("date_up").value;
            const loginData = {
                id_prodruit: id_prodruit,
                designation: designation, 
                prix : prix,
                date_up: date_up,
              };
              fetch("http://localhost/JavaScript/Back-end/produit/editproduit.php", {
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
                     
            let id_prodruit = mon_id
            const loginData = {
                id_prodruit: id_prodruit,  
              };
              fetch("http://localhost/JavaScript/Back-end/produit/suppproduit.php", {
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
let selectedValue_r
async function  initialiserListeDeroulante() {
   
    const categoriesDropdown = document.getElementById('listecat');
    // Récupération des catégories depuis la base de données
    fetch('http://localhost/JavaScript/Back-end/produit/listecategorie.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const option = document.createElement('option');
                option.value = element.id_categorie;
                option.textContent = element.designation_c;
                categoriesDropdown.appendChild(option);
                
            });

            // Sélectionner la première option par défaut
            if (data.length > 0) {
                categoriesDropdown.value = data[0].id_categorie;
                selectedValue_r = data[0].id_categorie; 
                console.log(selectedValue_r)  
                getAllProducts(selectedValue_r)
            }
            
        })
        .catch(error => console.error('Erreur :', error));

        categoriesDropdown.addEventListener('change', function() {
        const selectedValue_r = this.value;
        console.log('La valeur sélectionnée est : ', selectedValue_r);
        //categorie_choix_r = selectedValue_r;
        getAllProducts(selectedValue_r)
        
    });  
}








document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('elements');

    // Ajouter une option vide par défaut
    const defaultOption = document.createElement('option');
    defaultOption.value = null;
    defaultOption.textContent = 'Choisir'; // Texte de l'option par défaut
    selectElement.appendChild(defaultOption);

    // Récupération des éléments depuis la base de données
    fetch('http://localhost/JavaScript/Back-end/produit/listecategorie.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const option = document.createElement('option');
                option.value = element.id_categorie; // Supposons que votre table a une colonne 'id'
                option.textContent = element.designation_c; // Remplacez 'nom' par le nom de la colonne contenant les éléments

                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur :', error));

        selectElement.addEventListener('change', function() {
        const selectedValue = this.value;
        console.log('La valeur sélectionnée est : ', selectedValue);
        categorie_choix = selectedValue

        // Vous pouvez maintenant utiliser la valeur sélectionnée comme bon vous semble
    });
});

function recherche(btnType) {
    if (btnType === "search") {

            const liste = document.getElementById('liste');
            liste.style.display =  'block';

            event.preventDefault();
            document.getElementById("Liste").disabled = false;

           
            const tableBody = document.getElementById("table_p");
            const designation = document.getElementById("ndesignation").value;
            let tr = "";


            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }


            fetch(`http://localhost/JavaScript/Back-end/produit/searchproduit.php?designation=${designation}`, {
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
                    productCell.textContent = product.id_prodruit;
                
                    const produit = document.createElement("td");
                    produit.textContent = product.designation;

                    const prix = document.createElement("td");
                    prix.textContent = product.prix;

                    
        
        
                    // Create edit and delete buttons
                    const editCell = document.createElement("td");
                    const editButton = document.createElement("button");
                    editButton.textContent = "Edit";
                    editButton.addEventListener("click",()=>editProduct( product.id_prodruit, product.designation, product.categorie, product.prix, product.date_up));
                    editCell.appendChild(editButton);
                    
        
                    const deleteCell = document.createElement("td");
                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener("click",()=>deleteProduct( product.id_prodruit, product.designation, product.prix));
                    deleteCell.appendChild(deleteButton);
    
    
                    // Append cells to the row
                
                    row.appendChild(productCell);
                    row.appendChild(produit);
                    row.appendChild(prix);
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




function getAllProducts(id_cat) {
    const tableBody = document.getElementById("table_p");
    categorie = id_cat
    console.log(categorie)
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
  }

    fetch(`http://localhost/JavaScript/Back-end/produit/getallproduit.php?categorie=${categorie}`, {
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
            console.log(data)
            if(data.data.length > 0 ){
                  data.data.forEach((product) => {
                const row = document.createElement("tr");
  
               // Create and add cells for each product property
               const productCell = document.createElement("td");
               productCell.textContent = product.id_prodruit;
          
               const produit = document.createElement("td");
               produit.textContent = product.designation;

               const prix = document.createElement("td");
               prix.textContent = product.prix;

  
               // Create edit and delete buttons
               const editCell = document.createElement("td");
               const editButton = document.createElement("button");
               editButton.textContent = "Edit";
               editButton.addEventListener("click",()=>editProduct( product.id_prodruit, product.designation, product.categorie, product.prix, product.date_up));
               editCell.appendChild(editButton);
               
  
               const deleteCell = document.createElement("td");
               const deleteButton = document.createElement("button");
               deleteButton.textContent = "Delete";
               deleteButton.addEventListener("click",()=>deleteProduct( product.id_prodruit, product.designation, product.prix));
               deleteCell.appendChild(deleteButton);
  
  
                // Append cells to the row
               
                row.appendChild(productCell);
                row.appendChild(produit);
                row.appendChild(prix);
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
  
  window.addEventListener("load", initialiserListeDeroulante);
 // window.addEventListener("load", getAllProducts);



