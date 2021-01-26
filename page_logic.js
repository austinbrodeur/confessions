$(() => {
    const form = $("#confessionForm");
    const confessionInput = $("#confessionInput");
    const confessButton = $("#confessButton");
    const nextButton = $("#nextButton");
    const confessMessage = $("#confessMessage");
    const confessSound = document.getElementById('sound');
    
    
    const resetConfessionsInput = () => {
        confessionInput.val('');
        confessionInput.prop("readonly", true);
    }


    const displayConfession = (data) => {
        confessionInput.attr("placeholder", data[0].confession);
    }


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const playSound = () => {
        confessSound.play();
    }


    const changeState = async () => {
        resetConfessionsInput();
        playSound();
        confessButton.fadeOut();
        await sleep(500);
        confessMessage.fadeIn();
        await sleep(3000);
        confessMessage.fadeOut();
        await sleep(500);
        nextButton.fadeIn();
        getConfession();
    }


    const setState = () => {
        resetConfessionsInput();
        confessButton.hide();
        nextButton.show();
        getConfession();
    }


    const getConfession = () => {
        fetch("/getRandConfession", {method : "get"}).then((response) => {
            return response.json();
        }).then((data) => {
            displayConfession(data);
        });
    }

    
    form.on("submit", (e) => {
        e.preventDefault();

        fetch("/", {
            method : "post",
            body : JSON.stringify({
                confession : confessionInput.val(),
                id : document.cookie.split("=")[1]
            }),
            headers : {
                "Content-Type" : "application/json; charset=utf-8"
            }
        }).then((response) => {
            return response.json();
        })
        changeState();
    });


    nextButton.on("click", function() {
        getConfession();
    });


});