import logoImg from "assets/images/logo.svg";
import ilustrationImg from "assets/images/illustration.svg";
import { Button } from "components/Button.tsx";
import { Link } from "react-router-dom";

import "./styles.scss";
/* import { useAuth } from "hooks/useAuth";*/
export function NewRoom() {
  /*   const { user } = useAuth();
   */ return (
    <div className="page-create">
      <aside className="page-create__aside">
        <img src={ilustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tira as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main className="page-create__main">
        <div className="page-create__main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form className="page_create__main-content-form">
            <input type="text" placeholder="Nome da Sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
