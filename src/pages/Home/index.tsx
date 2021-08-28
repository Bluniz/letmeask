import ilustrationImg from "assets/images/illustration.svg";
import logoImg from "assets/images/logo.svg";
import googleIconImg from "assets/images/google-icon.svg";

import "./styles.scss";
import { Button } from "components/Button.tsx";

import { useHistory } from "react-router-dom";

export function Home() {
  const history = useHistory();

  function navigateToNewRoom() {
    history.push("/rooms/new");
  }

  return (
    <div className="page-auth">
      <aside className="page-auth__aside">
        <img src={ilustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tira as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main className="page-auth__main">
        <div className="page-auth__main-content">
          <img src={logoImg} alt="Letmeask" />
          <button
            className="page-auth__main-content-create-room"
            onClick={navigateToNewRoom}
          >
            <img src={googleIconImg} alt="google icon" />
            Crie sua sala com o Google{" "}
          </button>
          <div className="page-auth__main-content-separator">
            ou entre em uma sala
          </div>
          <form className="page_auth__main-content__form ">
            <input type="text" placeholder="DIgite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
