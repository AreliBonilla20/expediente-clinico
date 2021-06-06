const ClickLabel = ((labels) => {
    for(let i=0; i<labels.length; i++){
        labels[i].click();
    }
    labels[0].click();
})


function fecha(){
    var  hoy = new Date();
    var m = hoy.getMonth() + 1;
    var mes = (m < 10) ? '0' + m : m;

    return hoy.getDate() + '/' + mes + '/' + hoy.getFullYear();
}

function hora(){
    var  hoy = new Date();

    return hoy.getHours() + ':' + hoy.getMinutes();
}

export { ClickLabel, fecha, hora };