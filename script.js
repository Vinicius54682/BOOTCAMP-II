const formBusca = document.getElementById("form-busca");
const campoBusca = document.getElementById("campo-busca");
const resultado = document.getElementById("resultado");

formBusca.addEventListener("submit", function (event) {
    event.preventDefault();

    const pokemon = campoBusca.value.trim();

    if (pokemon === "") {
        return;
    }

    resultado.innerHTML = `
        <div class="welcome-card">
            <h2>Pesquisando...</h2>
            <p>Buscando informações sobre ${pokemon}.</p>
        </div>
    `;
});
