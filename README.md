# BiblioFront
Este proyecto recoge una muestra de las listas de libros ofrecida por el NY Times
y dentro de cada una de ellas, un ranking de los libros en función de su número de
ventas aportando algunos datos de cada uno de ellos. La aplicación nos permite añadir
estos libros a favoritos, registrarnos con nuestro correo y personalizar nuestra imagen
perfil.

<h2>Tech Stack</h2>
La aplicación ha sido llevada a cabo usando HTML, CSS, JS y algunas librerías de este último
como SweetAlert o Swiper.js. La información de las listas y los libros es extraída de la API "BooksAPI":
https://developer.nytimes.com/docs/books-product/1/overview .
Los datos de usuario y libros guardados en la lista de favoritos se almacenan en Firestore, la autenticación se realiza con Firebase Authentication y las imágenes son almacenadas en Firebase Storage.

<h2>Cómo usar</h2>
En la vista principal nos aparecerán las listas ya desplegadas que podremos recorrer con el scroll. En cada una de ellas vemos la información correspondiente y clickando en el nombre, accederemos a la vista del despliegue de los libros que pertenecen a cada una.



![clickList](assets/images/clickList.gif)

-----------------------------------------------------------------------------
Tenemos la posibilidad de filtrar el despliegue de las listas por nombre o por propiedad de frecuencia de actualización. Escribiendo en el espacio de texto obtendremos lo primero, y clickando en en el menú de selección de la derecha, lo segundo.

Barra de búsqueda:

![clickList](assets/images/searchBox.gif)


---------------------------------------------------------------------------------
Menú de selección:

![clickList](assets/images/searchSelect.gif)

-------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------

Dentro de cada lista también tenemos la opción de filtrar los libros por nombre usando la barra de búsqueda. En cada uno de los libros, si arrastramos el cursor por encima de la imagen, veremos los datos añadidos como su sinopsis y las semanas que lleva dentro de la lista. Además, tenemos un botón de compra que nos dirigirá a Amazon y otro de añadir el libro a nuestra lista de favoritos sólo si hemos iniciado sesión.

![clickList](assets/images/book.gif)

--------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------

Para registrarnos accederemos al botón de la barra de navegación superior a la derecha. Ahí nos pedirá que aportemos un correo electrónico que deberá tener el formato correcto y escribir una contraseña válida (con los caracteres que nos especifica). Al registrarnos, la sesión se iniciará automáticamente. Una de las posibilidades al haber iniciado sesión es la de cambiar nuestra foto de perfil. Por defecto nos aparecerá una imagen predeterminada. Para cambiarla haremos click en el nombre de usuario de la barra de navegación y dentro del cuadro de diálogo que aparece, seleccionaremos un archivo de nuestro sistema para subirlo al Storage. Automáticamente tendremos esta imagen en nuestro perfil y en la barra de navegación junto al nombre.
![clickList](assets/images/registro1.gif)

--------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------

Una vez hayamos iniciado sesión, en la barra de navegación encontraremos el icono de Favoritos al que podremos acceder y ver los libros de la lista en caso de haber añadido alguno. Dentro de esta lista tenemos la posibilidad de "eliminar de la lista" individualmente los elementos o pulsar en el botón de "Limpiar lista" para eliminarlos todos.

![clickList](assets/images/favs1.gif)

