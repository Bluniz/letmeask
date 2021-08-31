import logoImg from "assets/images/logo.svg";
import "./style.scss";
import { Button } from "../../components/Button.tsx/index";
import { RoomCode } from "components/RoomCode";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toastController } from "components/Toast";
import { useAuth } from "hooks/useAuth";
import { database } from "services/firebase";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export function Room() {
  const { user } = useAuth();
  const { id } = useParams<RoomParams>();

  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);
    //TODO child_added, child_removed, child_updated para adicionar listeners especificos.
    //! Event listener do Firebase
    //? .once executa apenas uma vez
    //* .on fica ouvindo o evento até desligarmos manualmente(perfeito para socket)
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [id]);

  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "")
      return toastController.error("Por favor digite sua pergunta!");

    if (!user) {
      return toastController.error(
        "Você precisa estar logado na aplicação para criar uma pergunta"
      );
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    try {
      await database.ref(`rooms/${id}/questions`).push(question);
      toastController.success("Pergunta criada com sucesso!");
      setNewQuestion("");
    } catch (error) {
      console.log(error);
      toastController.error("Ocorreu um erro inesperado!");
    }
  }

  function handleChangeQuestion(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewQuestion(event.target.value);
  }

  return (
    <div className="page-room">
      <header>
        <div className="page-room__header-content">
          <img src={logoImg} alt="logo" />
          <RoomCode code={id} />
        </div>
      </header>
      <main className="page-room__content">
        <div className="page-room-content__content-title">
          <h1>Sala {title}</h1>
          <span>{questions.length} pergunta(s)</span>
        </div>
        <form className="page-room__form" onSubmit={handleCreateNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={handleChangeQuestion}
            value={newQuestion}
          />
          <div className="page-room__form-footer">
            {user ? (
              <div className="page-room__form-footer__info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
