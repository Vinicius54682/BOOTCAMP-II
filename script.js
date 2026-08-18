console.log("ESTOU LENDO O SCRIPT NOVO");

const formBusca = document.getElementById("form-busca");
const campoBusca = document.getElementById("campo-busca");
const resultado = document.getElementById("resultado");
const botoesExemplo = document.querySelectorAll(".example-button");

async function buscarPokemon(pokemon) {
    pokemon = pokemon.trim().toLowerCase();

    if (pokemon === "") {
        return;
    }

    resultado.innerHTML = `
        <div class="welcome-card">
            <div class="pokeball-icon">◓</div>
            <h2>Buscando...</h2>
            <p>Consultando os dados do Pokémon.</p>
        </div>
    `;

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const dados = await resposta.json();

        resultado.innerHTML = `
            <div class="pokemon-card">

                <div class="pokemon-image">
                    <img
                        src="${dados.sprites.other["official-artwork"].front_default}"
                        alt="${dados.name}"
                    >
                </div>

                <div class="pokemon-info">

                    <span class="pokemon-number">
                        #${String(dados.id).padStart(3, "0")}
                    </span>

                    <h2>${dados.name}</h2>

                    <div class="types">
                        ${dados.types.map(tipo => `
                            <span class="type">
                                ${tipo.type.name}
                            </span>
                        `).join("")}
                    </div>

                    <div class="stats">

                        <div class="stat">
                            <strong>${dados.height / 10} m</strong>
                            <span>Altura</span>
                        </div>

                        <div class="stat">
                            <strong>${dados.weight / 10} kg</strong>
                            <span>Peso</span>
                        </div>

                        <div class="stat">
                            <strong>${dados.base_experience}</strong>
                            <span>Experiência</span>
                        </div>

                    </div>

                </div>

            </div>
        `;

    } catch (erro) {

        resultado.innerHTML = `
            <div class="welcome-card">
                <div class="pokeball-icon">⚠️</div>

                <h2>Pokémon não encontrado</h2>

                <p>
                    Verifique o nome ou número informado e tente novamente.
                </p>
            </div>
        `;
    }
}

formBusca.addEventListener("submit", function(event) {
    event.preventDefault();

    const pokemon = campoBusca.value;

    buscarPokemon(pokemon);
});

botoesExemplo.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const pokemon = botao.dataset.pokemon;

        campoBusca.value = pokemon;

        buscarPokemon(pokemon);
    });

});

console.log("SCRIPT FUNCIONANDO");
