## Valoración general

-   Te ha quedado muy aseada y los estilos están muy bien. El detalle de que las tarjetas se levanten me ha encantado.

-   Has hecho un buen uso de los elementos HTML, se entiende con leerlo.

-   Que el fondo se quede fijo cuando desplazo hacia abajo me gusta mucho, le da sensación de profundidad a la página.

-   El elemento de destino se ajusta sin problemas a que le cambie el contenido. Tienes algún comentario adicional debajo.

He sido bastante tiquismiquis en las correcciones que hay debajo. No es porque tengas muchos fallos, de hecho es precisamente lo contrario: como has completado muy bien la tarea me he tomado la libertad de comentarte conceptos más avanzados y como podrías perfeccionar la web para que te quede incluso mejor.

## Correcciones puntuales

-   Como todas las tarjetas de destino ocupan el máximo ancho posible, se reparten el espacio. Para tres tarjetas queda muy bien pero para una se ve demasiado ancho. Puedes usar un `min-width` para solucionar esto. Por otra parte, si hay muchas tarjetas se aprietan demasiado. Utiliza la propiedad `flex-wrap` para solucionar esto. Tienes un ejemplo en [este tutorial](https://css-tricks.com/almanac/properties/f/flex-wrap/)

-   El estilo del formulario es poco intuitivo. Tienes un `padding` en cada `form_box` y luego el `input` tiene un `margin` por debajo. Al final todo cuadra y es bonito, pero podría descuadrarse facilmente si alguien que no está familiarizado con tu código lo tiene que tocar. Hay mil maneras de hacerlo, yo te sugiero `padding` en el elemento `form` en vez de en cada form_box, y la propiedad CSS `gap` para poner espacio entre elementos flex. La cuestión de que estilos debería tener cada elemento, o mejor dicho, a que elemento le corresponde la responsabilidad de tener cierto estilo es una idea muy importante. La idea de repartir "responsabilidades" (bien sea CSS, funciones en un código, etc) es el problema fundamental al que te enfrentas cuando estás diseñando cualquier cosa. Aprovecho el momento para comentartelo.

-   Según el ancho del título de cada sección el contenido se desplaza más o menos a la derecha. Coloca el contenido debajo y así te deshaces de ese problema. Procura que los títulos estén alineados.

-   Las bolitas con numeros de la sección "Nuestro servicio" las colocaría a la izquierda del cada texto, no encima.

-   El nav esta buggeado y no se ve

-   La clase `contenedor` y `container` hacen lo mismo

-   Mételo estilo al botón de enviar para que esté más chulo
