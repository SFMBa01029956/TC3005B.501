import CustomNavbar from "@/components/general/custom_navbar"

export default function GANavbar() {
  return (
    <CustomNavbar
      home='/providers/GA'
      elems_right={[
        {name: 'Acciones', href: '', popup: [{name: 'Manejo de catálogo', href: ''}, {name: 'Administración de gerentes', href: ''}, {name: 'Administración de la agencias', href: ''}, {name: 'Estadísticas de ventas', href: ''}]},
        {name: 'Mi cuenta', href: '', popup: [{name: 'Nombre del usuario', href: ''}, {name: 'Cambiar contraseña', href: '/providers/GA-update-password'}, {name: 'Cerrar sesión', href:'#', signoutComponent: '/auth/login'}]},
      ]}
    />
  )
}