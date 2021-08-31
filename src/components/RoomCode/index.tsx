import copyImg from "assets/images/copy.svg";
import { useState } from "react";
import "./styles.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  const [copied, setCopied] = useState(false);

  function changeCopiedAfterTimeout(fn: Function, time: number) {
    fn();
    setTimeout(() => {
      setCopied(false);
    }, time);
  }

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    setCopied(true);
  }

  function handleClick() {
    changeCopiedAfterTimeout(copyRoomCodeToClipboard, 2000);
  }

  return (
    <button className="room-code" onClick={handleClick}>
      <div className="room-code__content">
        <img src={copyImg} alt="copy room" />
      </div>
      <div className="room-code__text-container">
        <span className="room-code__text-code">Sala #{code}</span>

        <span className="room-code__text-code--copy">
          {copied
            ? "Copiado para área de transferência"
            : "Copiar para área de transferência"}
        </span>
      </div>
    </button>
  );
}
