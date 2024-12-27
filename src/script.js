document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const senderName = urlParams.get("sender");
    const receiverName = urlParams.get("receiver");
    const imageUrl = urlParams.get("img");
    const dynamicMessage = document.getElementById("dynamicMessage");
    const celebrationImage = document.getElementById("celebrationImage");
    const newYearForm = document.getElementById("newYearForm");
    const linkContainer = document.getElementById("linkContainer");
    const generatedLink = document.getElementById("generatedLink");
    const whatsappLink = document.getElementById("whatsappLink");
    const recipientMessage = document.getElementById("recipientMessage");
    const recipientMessageText = document.getElementById("recipientMessageText");
    const recipientSubMessage = document.getElementById("recipientSubMessage");
    const finalMessage = document.getElementById("final-message");
    const createOwnMessageButton = document.getElementById("createOwnMessage");
    const countdownTimer = document.getElementById("countdownTimer");

    const finalMessages = [
        "Ano Novo, vida nova... ou apenas mais uma desculpa para não fazer nada de novo.",
        "2025 está chegando! Vamos fingir que vamos fazer algo diferente... até 1º de janeiro, pelo menos.",
        "Meta para 2025: mais risadas, menos arrependimentos.",
        "A virada chegou, e as promessas também. Vamos ignorá-las juntos, como sempre fazemos.",
        "Se a vida te der limões em 2025, ignore os conselhos motivacionais e faça uma boa margarita com eles.",
        "Que em 2025 você tenha a coragem de tentar, ou pelo menos a habilidade de se distrair bem o suficiente para não notar o fracasso."
    ];
    

    if (senderName && receiverName) {
        dynamicMessage.textContent = `🎆 ${receiverName}, parabéns por sobreviver a 2024! 🎆`;
        recipientMessageText.textContent = `Você recebeu uma mensagem de ${senderName}, que provavelmente está se enchendo de comida agora.`;
        recipientSubMessage.textContent = `Espero que 2025 seja tão bom quanto ouvir Zé Felipe e Oruam no café da manhã, ${receiverName}!`;

        const randomMessage = finalMessages[Math.floor(Math.random() * finalMessages.length)];
        finalMessage.textContent += `${randomMessage}`;

        if (imageUrl) {
            celebrationImage.src = imageUrl;
        }

        newYearForm.classList.add("hidden");
        linkContainer.classList.add("hidden");
        recipientMessage.classList.remove("hidden");

        startCountdown();
    } else {
        recipientMessage.classList.add("hidden");
        newYearForm.classList.remove("hidden");
        linkContainer.classList.add("hidden");

        newYearForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputSenderName = document.getElementById("senderName").value.trim();
            const inputReceiverName = document.getElementById("receiverName").value.trim();
            const inputImageUrl = document.getElementById("imageUrl").value.trim();

            if (!inputSenderName || !inputReceiverName) {
                alert("Tá com preguiça de preencher? Bora, só mais um esforço!");
                return;
            }

            const baseURL = window.location.origin + window.location.pathname;
            const customLink = `${baseURL}?sender=${encodeURIComponent(inputSenderName)}&receiver=${encodeURIComponent(inputReceiverName)}&img=${encodeURIComponent(inputImageUrl)}`;

            generatedLink.value = customLink;
            whatsappLink.href = `https://wa.me/?text=${encodeURIComponent(
                "Olha, prometo que não é golpe: " + customLink
            )}`;
            linkContainer.classList.remove("hidden");
        });
    }

    function startCountdown() {
        const newYearDate = new Date("2025-01-01T00:00:00");
        setInterval(() => {
            const now = new Date();
            const timeLeft = newYearDate - now;

            if (timeLeft <= 0) {
                countdownTimer.textContent = "🎉 Finalmente 2025 chegou, mas você ainda tá de pijama. 🎉";
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownTimer.textContent = `⏳ Tá chegando! Faltam ${days}d ${hours}h ${minutes}m ${seconds}s para 2025!`;
        }, 1000);
    }

    createOwnMessageButton.addEventListener("click", () => {
        window.location.href = window.location.origin + '/';
    });
});
