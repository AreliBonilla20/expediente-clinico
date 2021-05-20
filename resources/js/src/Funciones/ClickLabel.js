const ClickLabel = ((labels) => {
    for(let i=0; i<labels.length; i++){
        labels[i].click();
    }
    labels[0].click();
})

export default ClickLabel;