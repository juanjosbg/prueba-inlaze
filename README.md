

# Movie Slider Projec
Esta prueba se implement con Next js el cual se creo para mostrar películas en tendencia. Las películas se obtienen de la API de The Movie Database (TMDb), utilizando axios para gestionar las solicitudes HTTP.

## Tecnologías utilizadas
> Frontend
> Next js: - Framework de JavaScript para construir interfaces de usuario.
> Se utiliza para gestionar la lógica de componentes como el slider (Swiper.js), el cual es una biblioteca para implementar sliders personalizables y responsivos.

> Tailwind CSS:
> Framework de CSS para un diseño rápido y eficiente.

> API:
> - Axios: para consumir la API de TMDb.

> TMDb API: Fuente de datos para obtener información de las películas más populares.
Autenticación gestionada con un token de acceso.


```bash
# Clona el repositorio:
git clone <URL_DEL_REPOSITORIO>
cd movie-slider
```

```bash
# Instala las dependencias:
npm install
```

# Crear archivo .env, este contiene las variables necesarias para las conexiones API y Firebase

# En windows abre una terminal y ejecuta el siguiente comando:
copy .env.example .env

# En linux abre una terminal y ejecuta el siguiente comando:
cp .env.example .env


# Esto copiará el archivo `.env.example` y lo renombrará como `.env`.
# Asegúrate de revisar y completar las variables necesarias dentro del archivo `.env`.


```bash
# Inicia el servidor de desarrollo
npm run dev
```

## Funcionamiento del proyecto

Consumo de la API:
El archivo apiMovies.ts contiene funciones como fetchMoviesByPopularity para realizar solicitudes HTTP a la API de TMDb.
La respuesta es procesada con la función processMovieData para formatear los datos.
Carrusel (MovieSlider):

El componente MovieSlider.tsx usa Swiper.js para implementar un slider interactivo.
Los datos se cargan desde la API en el useEffect del componente y se almacenan en el estado.
Filtro de películas en tendencia:

Se seleccionan las 3 películas con la mayor calificación (rating) y se muestran en el slider.
Estilos:

Tailwind CSS se utiliza para el diseño responsivo del carrusel.


## Dependencias principales
- React: ^18.0.0
- Swiper: ^10.0.0
- Axios: ^1.4.0
- Tailwind CSS: ^3.3.0