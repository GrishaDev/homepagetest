    
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpPost(theUrl,data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl,true);
    xmlHttp.setRequestHeader("Content-Type","application/json");

    xmlHttp.send(JSON.stringify(data));

    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("ok");
            setTimeout(function(){
                clearSystems();
                getSystems();
            }, 100);
        }
    }
}

function onAddSystem()
{   
    let rng = Math.floor((Math.random() * 100) + 1);;
    let sys = {title:"wuw"+rng.toString(),about:"bamba",svg:"svg"};
    httpPost('/addSystem',sys);
}

function renderData()
{
    let len = data.length;

    let systems = document.getElementById('systems');
    // let system = document.getElementById('system');

    
    for(let i=0; i<len; i++)
    {
        // item = document.createElement('li');
        // item.innerHTML = JSON.stringify(data[i]);
        let item = document.createElement('div');
        item.classList.add("system");
        let title = document.createElement('h2');
        let card = document.createElement('div');
        card.classList.add("card");
        title.innerHTML = data[i].title;
        
        let img = document.createElement('div');
        let info = document.createElement('div');
        let infotxt = document.createElement('p');
        let delicon = document.createElement('img');
        img.classList.add("pic");
        delicon.classList.add("delicon");
        // delicon.onclick = deleteSystem(i);
        delicon.addEventListener("click",function(){ deleteSystem(i )});
        info.classList.add("info");
        infotxt.innerHTML = data[i].about;
        infotxt.classList.add("about");
        card.appendChild(title);
        info.appendChild(infotxt);
        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(delicon);
        

        // item.appendChild(title);
        item.appendChild(card);
        systems.appendChild(item);
    }
    // let first = document.getElementById('first');
    // first.remove();
}



function getSystems()
{
    let datastr = httpGet('/getSystems');
    data = JSON.parse(datastr);

    console.log(data);

    renderData();
}

function clearSystems()
{
    let myNode = document.getElementById("systems");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function deleteSystem(i)
{
    let data = {index: i};
    httpPost('/deleteSystem',data);
}


getSystems();