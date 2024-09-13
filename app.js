document.getElementById('getAirQuality').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if (city === "") {
        alert("Por favor, ingrese el nombre de una ciudad.");
        return;
    }

    const apiKey = '4cf907bb241a95cb3daa6a571903802b3747108b'; // API key
    // URL actualizada para la API
    const url = `https://api.waqi.info/feed/${city}/?token=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Verificar si los datos son válidos
            if (data.status === "error" || !data.data) {
                document.getElementById('result').innerHTML = `No se encontraron datos para la ciudad: ${city}.`;
                return;
            }

            // Extraer información de calidad del aire
            const airQuality = data.data.aqi;
            document.getElementById('result').innerHTML = `
                <p>La calidad del aire en <strong>${city}</strong> es: 
                <strong>${airQuality}</strong> AQI (Índice de Calidad del Aire).</p>`;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `Hubo un error al obtener los datos: ${error.message}`;
        });
});
