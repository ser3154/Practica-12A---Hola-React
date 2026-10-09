import Insignia from './Insignia';

interface TarjetaPerfilProps {
  nombre: string;
  carrera: string;
  semestre: number;
}

function TarjetaPerfil({ nombre, carrera, semestre }: TarjetaPerfilProps) {
  const iniciales = nombre
    .split(' ')
    .map((palabra) => palabra[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const avanzado = semestre >= 7;

  return (
    <article className="tarjeta">
      <div className="tarjeta__avatar">{iniciales}</div>
      <h2 className="tarjeta__nombre">{nombre}</h2>
      <p className="tarjeta__carrera">{carrera}</p>
      <Insignia texto={`${semestre}.º semestre`} />
      {avanzado && <Insignia texto="Por egresar" tipo="extra" />}
    </article>
  );
}

export default TarjetaPerfil;