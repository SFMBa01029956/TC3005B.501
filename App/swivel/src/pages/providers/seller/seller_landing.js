export default function SellerLandingPage({ children }) {
  return (
    <>
      <div>
          <h5>Perfil</h5>
        <li>
          <a href="#">Cambiar Contraseña</a>
        </li>
        <li>
          <a href="#">Logout</a>
        </li>
      </div>
      <div style={{ padding: "200px" }}>
        <button type="button" style={{ padding: "50px", margin: "50px" }}>
          Solicitudes de Compra
        </button>
        <button type="button" style={{ padding: "50px", margin: "50px" }}>
          Solicitudes de Prueba de Manejo
        </button>
      </div>
    </>
  );
}