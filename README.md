

# Movie Slider Projec
Esta prueba se implement con Next js el cual se creo para mostrar películas en tendencia. Las películas se obtienen de la API de The Movie Database (TMDb), utilizando axios para gestionar las solicitudes HTTP.


```bash
# Clona el repositorio:
git clone <URL_DEL_REPOSITORIO>
cd <Ubicacion de tu proyecto>

# Instala las dependencias:
npm install

# Inicia el servidor de desarrollo
npm run dev
```

> [!IMPORTANT]  
> 1. Crea el archivo .env, (este contiene las variables necesarias para las conexiones API y Firebase)
> 2. En windows abre una terminal y ejecuta el siguiente comando: `copy .env.example .env`
> 3. En linux abre una terminal y ejecuta el siguiente comando:  `copy .env.example .env`
> 4. Despues de haber echo eso, esto copiará el archivo `.env.example`, solo renombra ese archivo a `.env`.
> 5. Asegúrate de revisar y completar las variables necesarias dentro del archivo `.env`.


> [!NOTE]  
> ## Funcionamiento del proyecto
> Consumo de la API:
> El archivo apiMovies.ts contiene funciones como fetchMoviesByPopularity para realizar solicitudes HTTP a la API de TMDb.
> La respuesta es procesada con la función processMovieData para formatear los datos.
> Carrusel (MovieSlider):
>
> El componente MovieSlider.tsx usa Swiper.js para implementar un slider interactivo.
> Los datos se cargan desde la API en el useEffect del componente y se almacenan en el estado.
> Filtro de películas en tendencia:
> 
> Se seleccionan las 3 películas con la mayor calificación (rating) y se muestran en el slider.


> [!TIP]
> ### Interfaz
> Tailwind CSS : Para el estilo
>
> React Icons : Para usar los íconos, como los corazones (AiFillHearty AiOutlineHeart).
>
> ### Backend
> Autenticación:
> Firestore: Base de datos NoSQL en tiempo real.
>
> ### Librerías Adicionales
> Bcrypt.js .
>
> React Context o Redux: Para el estado global de inicio de sesión o favoritos.
>
> Axios: Para realizar las solicitudes HTTP.
>
