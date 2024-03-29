# Lista de Vendedores como Gerente

## Introducción

Este módulo es parte del flujo de gerente, ya que es aquí donde se pueden ver y editar los detalles de los vendedores asignados a la agencia del gerente. El propósito de este documento es describir el diseño, funcionalidad e implementación de este módulo, por ende se encuentra orientado a developers y otros stakeholders que quieran entender su propósito dentro de la aplicación.

## Componentes y módulos

### Base de datos

El módulo involucra la obtención de datos de múltiples cuentas existentes que cumplan con un par de criterios. La base de datos es un cluster en MongoDB Atlas al cual se accede al proveer una URL de conexión dentro de un archivo de variables ambientales (.env). El manejo de cuentas se hace dentro de la colección usuario.

Se utilizan dos campos en la operación de obtención:

- tipo_usuario: un campo encriptado que indica el nivel de permisos que tiene la cuenta asociada.
- agencia: campo que indica la agencia a la que pertenece el vendedor.

Al editar la información de alguna cuenta se utilizan más campos:

- nombres: un campo que indica los nombres de pila.
- apellidos: un campo que indica la apellidos.
- email: campo que indica el email de la cuenta.
- numero_telefonico: campo que indica el número celular del usuario.
    
    ![Base_de_Datos - MongoDesnormalizado.png](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Base_de_Datos_-_MongoDesnormalizado.png)
    

### Obtención y edición de información de cuentas

Los detalles de las cuentas se obtienen al entrar a la página siempre y cuando pertenezcan a la agencia del gerente que los busca. Dentro de la página se pueden ver los detalles de estas cuentas y también se pueden editar los campos que se deseen e incluso se pueden eliminar cuentas.

Esto se hace mediante tres endpoints distintos:

Obtención de información: /pull-all-vendedores

Edición de información: /actualizar-vendedor

Eliminar cuenta: /eliminar-vendedor

## Interfaz de usuario

A continuación se muestra la pantalla general que muestra el listado de vendedores.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled.png)

Dentro de esta página se pueden ver los componentes principales, como lo es el listado de vendedores.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%201.png)

La barra de búsqueda.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%202.png)

El botón de registrar nuevo vendedor.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%203.png)

El botón de editar información de un vendedor.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%204.png)

Y el botón de borrar a un vendedor.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%205.png)

### Registro de vendedores

Al seleccionar la opción de registrar un nuevo vendedor se redirige a una nueva página donde se ingresan los datos para esta nueva cuenta. 

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%206.png)

Esta página contiene tres apartados principales, el primero siendo “Datos personales”.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%207.png)

El segundo siendo “Contraseña”.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%208.png)

El último siendo “Datos Administrativos”.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%209.png)

Finalmente se puede ver el botón de “Crear Vendedor”

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%2010.png)

### Edición de vendedores

La sección de edición se ubica dentro de la misma página donde uno ve el listado de vendedores. Es una sección emergente que aparece al seleccionar el botón apropiado.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%2011.png)

La sección emergente contiene campos de texto en los que uno puede ingresar la nueva información de la cuenta.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%2012.png)

Se incluyen un botón para confirmar los cambios.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%2013.png)

### Eliminación de vendedores

La sección de eliminación se ubica dentro de la misma página donde uno ve el listado de vendedores. Es una sección emergente que aparece al seleccionar el botón apropiado.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%2014.png)

La sección emergente es una confirmación con un botón que continúa la operación.

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%2015.png)

## Almacenamiento de datos y Endpoints

### Descripción de los endpoints del módulo

Como ya se mencionó, existen tres endpoints para este módulo:

[/pull-all-vendedores](APIs%20059691d154ad421abbf7f195cee48c5c/Lista%20de%20Vendedores%20como%20Gerente%2015d7da8750e34464b35f6cca2c5b20f9/pull-all-vendedores%20237aef25d2cf45b29373b416be3f5324.md) 

[/eliminar-vendedor](APIs%20059691d154ad421abbf7f195cee48c5c/Lista%20de%20Vendedores%20como%20Gerente%2015d7da8750e34464b35f6cca2c5b20f9/eliminar-vendedor%207e6b7bf962414bbfa68cb0e562ebadcc.md) 

[/actualizar-vendedor](APIs%20059691d154ad421abbf7f195cee48c5c/Lista%20de%20Vendedores%20como%20Gerente%2015d7da8750e34464b35f6cca2c5b20f9/actualizar-vendedor%20b4566a44abc444208f1c09515b1bec10.md) 

### Formato y tipo de datos almacenados

Este módulo utiliza varias variables, todas de tipo String:

- nombres
- apellidos
- email
- numero_telefonico
- agencia
- tipo_usuario

### Especificaciones de seguridad y privacidad de los datos

Solo hay un campo asegurado en este proceso:

- tipo_usuario: encriptación

## Pruebas y verificación

### Plan de pruebas

Para corroborar el funcionamiento adecuado del módulo, se hicieron pruebas unitarias a cada uno de los endpoints y se realizaron pruebas de recorrido. 

### Escenarios de prueba y casos de uso

Para cada endpoint se generaron los siguientes escenarios de prueba:

- se manda la información correcta y se regresa la respuesta exitosa
- se manda información equivocada y se regresa la respuesta de fallo
- se manda información con un método equivocado

### Pruebas

[Pruebas Lista de Vendedores](Pruebas%20b2896060cbea4a73b56f84c3fc288dcd/Pruebas%20Lista%20de%20Vendedores%209c30ba1d4c9542d5a25b77f7deba7579.md) 

![Untitled](Lista%20de%20Vendedores%20como%20Gerente%20d6c791abb3784056ba376ba6f1965719/Untitled%2016.png)