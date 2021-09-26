import ChatList from "./ChatList";
import Chat from "./Chat";
import "../styles/App.scss";

const Main = () => {
  return (
    <div className="App">
      <ChatList />
      <Chat />
    </div>
  );
};

export default Main;
