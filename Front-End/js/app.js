
//let create = document.querySelector("#create");
//let model = document.querySelector("#create-student");
//let save = document.getElementById("save").value;



function ajout(btnType) {
    if (btnType === "save") {
        event.preventDefault();
        try {    
            
            let designation = document.getElementById("designation").value;

            const res = fetch("http://localhost/API/Back-end/categorie.php", {
                method : "POST",
                body : JSON.stringify({"designation" : designation}),
                headers : {
                    "content-Type": "application/json"
                }
            });

            if(res) {
            console.log(res)


            } else console.log("err")
            const outpout = res;
            console.log(outpout)
            console.log("thanks")
        } catch (error) {
            console.log("error " + error.message);
            
        }
    }else {
        console.log("y")
    }
    listecategorie()

}

async function recherche(btnType, event) {
    if (btnType === "search") {
        try {
            event.preventDefault();

            let sdesignation = document.getElementById("sdesignation").value;
            let tr = "";
            const res = await fetch(`http://localhost/API/Back-end/categorie.php?sdesignation=${sdesignation}`, {
                method: "GET",
                headers: {
                    "content-Type": "application/json"
                }
            }) ;
            
            if (res.ok) {
            
                const outpout = await  res.json();

                console.log(res.json())

                console.log(outpout)

                if (outpout.empty === "empty") {
                    tr = "<tr> Record Not found </td>";
                } else {
                    
                    for (var i in outpout) {
                        tr += `
                            <tr> 
                                <td> ${outpout[i].id} </td> 
                                <td> ${outpout[i].designation} </td> 
                            </tr>
                        `;
                    }
                }
                
                sdesignation.innerHTML = tr;
                console.log(outpout);
                console.log("thanks");
            } else {
                console.log("Response error: ", res.status);
            }
        } catch (error) {
            console.log("error " + error.message);
        }
    } else {
        console.log("y");
    }
}


function modifier(btnType) {
    if (btnType === "save") {
        event.preventDefault();
        try {    
            
            let designation = document.getElementById("designation").value;
            let id = document.getElementById("id").value;

            const res = fetch("http://localhost/API/Back-end/editcategorie.php", {
                method : "POST",
                body : JSON.stringify({"designation" : designation , "id_categorie" : id}),
                headers : {
                    "content-Type": "application/json"
                }
            });

            if(res) {
            console.log(res)


            } else console.log("err")
            const outpout = res;
            console.log(outpout)
            console.log("thanks")
        } catch (error) {
            console.log("error " + error.message);
            
        }
    }else {
        console.log("y")
    }
    listecategorie()

}

async function listecategorie() {
    try {
        let tr = "";
        const res = await fetch("http://localhost/API/Back-end/categorie.php", {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            }
        });
       
        console.log("outpout");
        if (res.ok) {
            const outpout = await res.json();
            console.log(outpout);
            console.log("outpout");

            if (outpout.length === 0) {
                tr = "<tr><td colspan='2'>Aucune catégorie trouvée</td></tr>";
            } else {
                for (let i = 0; i < outpout.length; i++) {
                    tr += `
                        <tr> 
                            <td> ${outpout[i].id} </td> 
                            <td> ${outpout[i].designation} </td> 
                        </tr>
                    `;
                }
            }

            // Sélectionnez l'élément où vous souhaitez afficher les résultats
            const tableBody = document.getElementById("ldesignation");
            tableBody.innerHTML = tr;

            console.log(outpout);
            console.log("thanks");
        } else {
            console.log("Response error: ", res.status);
        }
    } catch (error) {
        console.log("error " + error.message);
    }
}

listecategorie()





    





