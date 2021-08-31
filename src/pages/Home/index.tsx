import ilustrationImg from "assets/images/illustration.svg";
import { Button } from "components/Button.tsx";

import { useHistory } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

import logoImg from "assets/images/logo.svg";
import googleIconImg from "assets/images/google-icon.svg";

import "./styles.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { toastController } from "components/Toast";
import { database } from "services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  function handleChangeRoomCode(event: ChangeEvent<HTMLInputElement>) {
    setRoomCode(event.target.value);
  }

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return toastController.error(
        "Por favor digite o nome da sala que deseja criar!"
      );
    }

    try {
      const roomRef = await database.ref(`rooms/${roomCode}`).get();
      if (!roomRef.exists()) return toastController.error("Sala não existe");

      history.push(`/rooms/${roomCode}`);
    } catch (error) {
      toastController.error("Ocorreu um erro inesperado!");
      console.log(error);
    }
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
            onClick={handleCreateRoom}
          >
            <img src={googleIconImg} alt="google icon" />
            Crie sua sala com o Google{" "}
          </button>
          <div className="page-auth__main-content-separator">
            ou entre em uma sala
          </div>
          <form
            className="page_auth__main-content-form"
            onSubmit={handleJoinRoom}
          >
            <input
              onChange={handleChangeRoomCode}
              value={roomCode}
              type="text"
              placeholder="DIgite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
