
    if (!localStorage.getItem("JSONDATA")) {
        localStorage.setItem("JSONDATA", JSON.stringify({"apps":[]}));
    }

    function renderApps() {
        var storedData = JSON.parse(localStorage.getItem("JSONDATA"));
        var apps = storedData.apps;
        var dropzone = document.getElementById("dropzone");
        var titles = document.getElementById("title");
        var icons = document.getElementById("loc");
        var ass = document.getElementById("down");
        if(apps < 1) {
            alert("Cannont find any mods :(")
        };

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = "gray";
        });

        dropzone.addEventListener('dragleave', (e) => {
            dropzone.style.backgroundColor = "";
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            document.getElementById("cm").style.display = "none";
            document.getElementById("block").style.display = "none";
            dropzone.style.backgroundColor = "";
            var file = e.dataTransfer.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    var newApp = {
                        name: titles.value, 
                        icon: icons.value, 
                        file: e.target.result
                    };
                    apps.push(newApp);
                    storedData.apps = apps; // Update apps array
                    localStorage.setItem("JSONDATA", JSON.stringify(storedData)); // Save to localStorage
                    renderApps(); // Re-render the apps list after adding the new app
                };
                reader.readAsDataURL(file);
            }
        });

        document.getElementById("down").innerHTML = "";

        for (let i = 0; i < apps.length; i++) {
            var name = apps[i].name;
            var icon = apps[i].icon;
            var locationnn = apps[i].file;
            var app = document.createElement("div");
            app.className = "app";
            app.style.backgroundImage = `url(${icon})`;
            app.style.backgroundPosition = "center";
            app.style.backgroundSize = "cover";
            document.getElementById("down").appendChild(app);
            var title = document.createElement("label");
            title.innerHTML = name;
            app.appendChild(title);
            var install = document.createElement("button");
            var a = document.createElement("a");
            a.textContent = "Install";
            a.href = locationnn;
            install.appendChild(a);
            install.addEventListener('click', () => {
                locationnn.download = locationnn;
            });
            app.appendChild(install);
            
        }
    }

    renderApps();


