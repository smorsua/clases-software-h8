## Valoración general

-   El HTML se entiende muy bien porque has elegido elementos semanticos (`header`, `nav`...). Para el formulario que tienes que usar \<form>. Te dejo [este tutorial](https://www.w3schools.com/html/html_forms.asp)

-   El CSS está bien, abajo tienes algún comentario. Me ha parecido interesante las propiedades como `transform: rotate` y `linear-gradient`. Transform es una pasada, mira [este ejemplo](https://cssbattle.dev/learn) donde se usa para meter efectos 3D! (tienes que pasar el ratón por encima de las tarjetas). Con lo que has aprendido, podrías hacer ese elemento sin problemas.

-   Procura organizar mejor las propiedades dentro de cada selector: primero las de display, luego las de estilo propio, etc... El orden que quieras pero separado para que sea más legible.

-   El detalle de las lineas diagonales está muy chulo!

-   Falta el elemento de destino, que es una parte importante de esta tarea. Hazlo y avísame cuando lo tengas. Con lo que has aprendido de flex lo tendrás en un momento.

Buen trabajo y sigue a tope.

## Correciones puntuales

-   Usar rem en vez de porcentaje para el `border-radius` para que no se vea estirado

-   Los selectores de elementos (como `ul li a { ... }`) deben ser usados para estilos globales que quieres que estén en todos los sition. Si en un futuro tu pagina crece es posible que en otro sitio tengas algo como `ul li a`. Sin embargo, es probable que esta seccion de tu web no tenga nada que ver con el `nav`, podría ser una lista de precios o lo que fuese. Por eso, te recomiendo que uses clases para seleccionar elementos. De esta manera, gracias al nombre de la clase, sabrias desde el archivo css a que te estas refiriendo sin tener que mirarlo en el HTML.

-   Utiliza `<img/>` para el logo en vez de usar background-image. [Explicacion](https://stackoverflow.com/questions/492809/when-to-use-img-vs-css-background-image)

-   Utiliza `rem` en vez de `px` como norma general.

-   En algunos sitios usas un gradiente que va de un color al mismo, con lo que usa el color directamente.

-   En el cuadrado central te recomiendo que le añadas un `padding` porque si no el título, el boton etc esta muy pegado al borde. Métele un `padding` tambien a los inputs que sino son muy pequeñitos.

-   Quítale el `margin` al `body`

-   Hay un `span` suelto dentro del `div` del logo
