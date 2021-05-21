let size;
let ellList = [];
let longest = 0;

function updateElements() {
    if(ellList.length > 0) {
        getSize();
        let c;
    if (size.width > size.height) c = 'kSmall';
    else c = 'kBig';
        for(let i = 0; i < ellList.length; i++) {
            ellList[i].className = c;
        }
    }
}

window.addEventListener('resize', updateElements);

function clicked() {
    if (ellList.length == 0) {
        document.getElementById("Nyjako").style += "margin-top: 0;";
        document.getElementById("info").innerHTML = "";
        getSize();
        document.getElementById("card").className = "card clicked";
        loadProjects();
    }
}

const delay = async (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const loadProjects = async () => {
    let c;
    if (size.width > size.height) c = 'kSmall';
    else c = 'kBig';
    for (let i = 0; i < data.projects.length; i++) {
        let d = document.createElement("div");
        d.className = c;
        d.innerHTML += `<a class="kafelek" href="${data.projects[i].url}" target="_blank"><h1 style="font-size: 3vw;">${data.projects[i].name}</h1><video style="width:100%;" loop autoplay><source src="${data.projects[i].img}" type="video/mp4">Your browser does not support the video tag.</video><i class="subText">${data.projects[i].desc}</i>`
        document.getElementById("projects").appendChild(d);
        ellList.push(d);
        if((i+1)%2 == 0) await delay(500);
    }
}

function getSize() {
    size = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    }
}