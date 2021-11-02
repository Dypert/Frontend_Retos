function traerInformacionEspecialidad(){
    $.ajax({
        url:"http://132.226.250.250:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaEspecialidad(respuesta);
        }
    });
}

function pintarRespuestaEspecialidad(items){
    let myTable="<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> Nombre </th>";
    myTable+="<th> Descripción </th>";
    myTable+="<th colspan='2'> Botones </th>";
    myTable+="</tr>";
    for(f=0;f<items.length;f++){
        myTable+="<tr>";
        myTable+="<td>" +respuesta[f].name+"</td>";
        myTable+="<td>" +respuesta[f].description+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionEspecialidad("+items[f].id+")'>Actualizar</button> </td>";
        myTable+="<td> <button onclick='borrarElementoEspecialidad("+items[f].id+")'>Borrar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoSpecialty").html(myTable);
}

function guardarInformacionEspecialidad(){
    let myData={
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
    };

    $.ajax({
        url: "http://http://132.226.250.250:8080/api/Specialty/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:myData,
        data: JSON.stringify(myData),
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoSpecialty").empty();
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionEspecialidad();
            alert("se ha guardado el dato");
        }
    });
}

function actualizarInformacionEspecialidad(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://132.226.250.250:8080/api/Specialty/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoSpecialty").empty();
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionEspecialidad();
            alert("se ha guardado el dato");
        }
    });

}

function borrarElementoEspecialidad(idElemento){
    
    $.ajax({
        url: "http://132.226.250.250:8080/api/Specialty/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            traerInformacionEspecialidad();
            alert("se ha guardado el dato");
        }

    });
}