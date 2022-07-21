function submitData()
{
    
   var userName= document.getElementById("userName").value;
   var idproof= document.getElementById("idproof").value;
    var idproofno = document.getElementById("idproofno").value;
    var userEmail = document.getElementById("userEmail").value;
    var phoneNumber= document.getElementById("phoneNumber").value;
 	var bed = document.getElementById("bed").value;
   	var hospital = document.getElementById("hospital").value;


     const bookBed={
         "idProofNo": idproofno,
	"idProof": idproof,
	"userName":userName,
	"phoneNumber":phoneNumber,
	"userEmail": userEmail,
	"bedType": bed,
	"hospital": hospital
     };
    var x= JSON.stringify(bookBed);
    const url = "http://localhost:8187/add";
    const other_params = {
        headers : { "content-type" : "application/json; charset=UTF-8" },
        body :  bookBed,
        method : "POST"
    };
alert("Booked Successfully");
    fetch(url, other_params)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then(function(bookBed) {
            document.getElementById("result").innerHTML = "Booked Successfully";
        }).catch(function(error) {
            document.getElementById("result").innerHTML = "Failed To Book";
        });
    return true;
}