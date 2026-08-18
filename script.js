const formBusca = document.getElementById("form-busca");
const campoBusca = document.getElementById("campo-busca");
const resultado = document.getElementById("resultado");

formBusca.addEventListener("submit", async function (event) {
    event.preventDefault();

    const pokemon = campoBusca.value.trim().toLowerCase();

    if (pokemon === "") {
        return;
    }

    resultado.innerHTML = `
        <div class="welcome-card">
            <h2>Pesquisando...</h2>
            <p>Buscando informações sobre ${pokemon}.</p>
        </div>
    `;

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado.");
        }

        const dados = await resposta.json();

        resultado.innerHTML = `
            <div class="welcome-card">
                <h2>${dados.name}</h2>
                <p>Número: #${dados.id}</p>
                <img
                    src="${dados.sprites.front_default}"
                    alt="Imagem de ${dados.name}"
                >
            </div>
        `;
    } catch (erro) {
        resultado.innerHTML = `
            <div class="welcome-card">
                <h2>Pokémon não encontrado</h2>
                <p>Verifique o nome ou número informado e tente novamente.</p>
            </div>
        `;
    }
});
