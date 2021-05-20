let size;
let ellList = [];

function updateElements() {
    if(ellList.length > 0) {
        getSize();
        let c;
        if (size.width > size.height) c = 50;
        else c = 100;
        for(let i = 0; i < ellList.length; i++) {
            ellList[i].style = `width: ${c}%; display: inline-table; table-layout: fixed;`
        }
    }
}

window.addEventListener('resize', updateElements);

function clicked() {
    if (ellList.length == 0) {
        getSize();
        document.getElementById("card").className = "card clicked";
        document.getElementById("text").style = 'transition: all 0.5s; transition-timing-function: ease-in-out; opacity: 0;';
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
    if (size.width > size.height) c = 50;
    else c = 100;
    for (let i = 0; i < data.projects.length; i++) {
        let d = document.createElement("div");
        d.style = `width: ${c}%; display: inline-table; table-layout: fixed;`
        d.innerHTML += `<a class="kafelek" href="${data.projects[i].url}" target="_blank"><h1>${data.projects[i].name}</h1><video style="width:100%;" loop autoplay><source src="${data.projects[i].img}" type="video/mp4">Your browser does not support the video tag.</video><span class="desc">${data.projects[i].desc}</span>`
        document.getElementById("projects").appendChild(d);
        ellList.push(d);
        await delay(300);
    }
}

function getSize() {
    size = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    }
}