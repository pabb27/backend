        $(document).ready(function() {
          $("#btn-receta").click(function() {
            $.ajax({
              url: "https://api.edamam.com/search",
              data: {
                q: "chicken", // Término de búsqueda de la receta
                app_id: "055e9651",
                app_key: "8b8dc24e495fd85ec98a833222cdb29d"
              },
              success: function(data) {
                var recetas = data.hits.map(hit => hit.recipe);
                var recetaAleatoria = recetas[Math.floor(Math.random() * recetas.length)];
                mostrarReceta(recetaAleatoria);
              },
              error: function() {
                alert("Error al obtener la receta.");
              }
            });
          });
        
          function mostrarReceta(receta) {
            $("#receta-container").html(`
              <h2>${receta.label}</h2>
              <p>${receta.source}</p>
              <img src="${receta.image}" alt="${receta.label}">
              <h3>Ingredientes:</h3>
              <ul>
                ${receta.ingredientLines.map(ingrediente => `<li>${ingrediente}</li>`).join("")}
              </ul>
            `);
          }
        });