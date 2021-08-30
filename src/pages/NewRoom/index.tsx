import { FormEvent, useState } from "react";
import { Button } from "components/Button.tsx";
import { Link, useHistory } from "react-router-dom";

import logoImg from "assets/images/logo.svg";
import ilustrationImg from "assets/images/illustration.svg";

import "./styles.scss";
import { toastController } from "components/Toast";
import { database } from "services/firebase";
import { useAuth } from "hooks/useAuth";
export function NewRoom() {
  const { user } = useAuth();

  const [newRoomName, setNewRoomName] = useState("");

  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoomName.trim() === "") {
      return toastController.error(
        "Por favor digite o nome da sala que deseja criar!"
      );
    }

    try {
      const roomRef = database.ref("rooms");

      const firebaseRoom = await roomRef.push({
        title: newRoomName,
        authorId: user?.id,
      });
      toastController.success("Sala criada com sucesso!");

      history.push(`/rooms/${firebaseRoom.key}`);
    } catch (error) {
      toastController.error("Ocorreu um erro inesperado!");
      console.log(error);
    }
  }

  function onChange(event: FormEvent<HTMLInputElement>) {
    setNewRoomName(event.currentTarget.value);
  }

  return (
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
          <form
            className="page_create__main-content-form"
            onSubmit={handleCreateRoom}
          >
            <input type="text" placeholder="Nome da Sala" onChange={onChange} />
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
