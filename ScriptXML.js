function XhrRequest(url, callback, id){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            callback(xhr.responseXML, id);

        }
    }

    xhr.open("GET", url);
    xhr.send();
}

function FetchXml(url, callback, id){
    fetch(url)
        .then(r => r.text())
        .then(data => {
            const parser = new DOMParser();
            callback(parser.parseFromString(data , "text/xml"), id);
        })
}