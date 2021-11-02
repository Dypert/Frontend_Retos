function traerInformacionReservaciones(){
    $.ajax({
        url:"http://132.226.250.250:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        }
    });
}

function pintarRespuestaReservaciones(items){
    let myTable="<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> F-Inicial </th>";
    myTable+="<th> F-Final </th>";
    myTable+="<th colspan='2'> Botones </th>";
    myTable+="</tr>";
    for(f=0;f<items.length;f++){
        myTable+="<tr>";
        myTable+="<td>" +items[f].startDate+"</td>";
        myTable+="<td>" +items[f].devolutionDate+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionReservaciones("+items[f].idReservaciones+")'>Actualizar</button> </td>";
        myTable+="<td> <button onclick='borrarInformacionReservaciones("+items[f].idReservaciones+")'>Borrar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservaciones").html(myTable);
}

function guardarInformacionReservaciones(){
    let myData={
        startDate:$("#StartDate").val(),
        devolutionDate:$("#DevolutionDate").val()
    };

    $.ajax({
        url: "http://132.226.250.250:8080/api/Reservation/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:myData,
        data: JSON.stringify(myData),
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            $("#StartDate").val("");
            $("#DevolutionDate").val("");
            traerInformacionReservaciones();
            alert("se ha guardado el dato");
        }
    });
}

function actualizarInformacionReservaciones(idElemento){
    let myData1={
        idReservation:idElemento, //
        startDate:$("#StartDate").val(),
        devolutionDate:$("#DevolutionDate").val()
    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://132.226.250.250:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            $("#StartDate").val("");
            $("#DevolutionDate").val("");
            traerInformacionReservaciones();
            alert("se ha guardado el dato");
        }
    });

}

function borrarInformacionReservation(idElemento){
    
    $.ajax({
        url: "http://132.226.250.250:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            traerInformacionReservaciones();
            alert("se ha guardado el dato");
        }
        
    });
}