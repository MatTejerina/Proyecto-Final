import React from 'react'

const AdminPage = () => {
  return (
    <div>Pagina de Administracion
      La página principal de administración debe contener una bienvenida al administrador del sistema y
opcionalmente información de la versión del sistema. Además debe mostrar de forma sencilla los turnos
que ya se encuentran asignados. (Esta página la usara la persona que se encarga de administrar las fichas
de pacientes y turnos, por lo que este dato es fundamental)
Al ingresar como usuario administrador, se habilitarán nuevas opciones en el menú:
 Administrar pacientes: la cual nos llevara a una página para trabajar un CRUD de pacientes
 Administrar turnos: la cual nos llevara a una página para trabajar un CRUD de turnos
    </div>
  )
};

export default AdminPage;