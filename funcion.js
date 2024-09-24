document.getElementById('buscar').addEventListener('click', buscarPokemon);

document.getElementById('pokemonId').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscarPokemon();
    }
});

function buscarPokemon() {
    const pokemonId = document.getElementById('pokemonId').value;
    const resultDiv = document.getElementById('result');

    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                const pokemonImage = data.sprites.front_default;
                const pokemonHeight = data.height; // Altura en decímetros
                const pokemonWeight = data.weight; // Peso en hectogramos
                const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name).join(', '); // Tipos
                const pokemonAbilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '); // Habilidades

                resultDiv.innerHTML = `
                    <h2>${pokemonName}</h2>
                    <img src="${pokemonImage}" alt="${pokemonName}">
                    <p>Altura: ${pokemonHeight / 10} m</p>
                    <p>Peso: ${pokemonWeight / 10} kg</p>
                    <p>Tipos: ${pokemonTypes}</p>
                    <p>Habilidades: ${pokemonAbilities}</p>
                `;
            })
            .catch(error => {
                resultDiv.innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        resultDiv.innerHTML = '<p>Por favor, ingresa un ID válido.</p>';
    }
}
