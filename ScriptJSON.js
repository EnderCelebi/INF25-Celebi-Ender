function fetchJson(url, callback,id){
    fetch(url)
    .then(r => r.json())
    .then(text => callback(text, id));
}

function XHRJson(url,callback,id){
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = (ev) => {
        if(xhr.readyState == 4 && xhr.status == 200){
            const response = JSON.parse(xhr.responseText);
            callback(response, id);
        }
    };
    xhr.open("GET", url);
    xhr.send();
}
