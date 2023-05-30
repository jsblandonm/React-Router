import { Link } from "../Link";

export default function Page404() {
  return (
    <>
      <div>
        <h1>This is Not Fine</h1>
        <img
          src="https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Regaño de señor"
        />
      </div>
      <Link to="/">Volver a la Home</Link>
    </>
  );
}
