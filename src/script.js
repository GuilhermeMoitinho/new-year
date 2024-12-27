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
    const createOwnMessageButton = document.getElementById("createOwnMessage");
    const countdownTimer = document.getElementById("countdownTimer");

    if (senderName && receiverName) {
        dynamicMessage.textContent = `🎆 Feliz Ano Novo, ${receiverName}! 🎆`;
        recipientMessageText.textContent = `Mensagem especial de ${senderName} para você!`;
        recipientSubMessage.textContent = `Que 2024 seja incrível para você, ${receiverName}!`;
        
        const finalMessage = "Que o novo ano traga muita felicidade, saúde e sucesso para todos nós. Que possamos conquistar nossos sonhos e espalhar amor por onde passarmos.";
        recipientSubMessage.textContent += ` ${finalMessage}`;

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
                alert("Por favor, insira o nome do remetente e do destinatário.");
                return;
            }

            const baseURL = window.location.origin + window.location.pathname;
            const customLink = `${baseURL}?sender=${encodeURIComponent(inputSenderName)}&receiver=${encodeURIComponent(inputReceiverName)}&img=${encodeURIComponent(inputImageUrl)}`;

            generatedLink.value = customLink;
            whatsappLink.href = `https://wa.me/?text=${encodeURIComponent(
                "Veja minha mensagem de Ano Novo personalizada aqui: " + customLink
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
                countdownTimer.textContent = "Feliz Ano Novo!";
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownTimer.textContent = `Contagem Regressiva para 01/01/2025: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    createOwnMessageButton.addEventListener("click", () => {
        window.location.href = window.location.origin + '/';
    });
});
