import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/myprofile/profile/Profile";
import Questions from "./components/questions/Questions";
import Tags from "./components/tags/Tags";
import Editor from "./components/editor/Editor";
import Content from "./components/questions/Content";
import UserQuestionContent from "./components/myprofile/profile/Content";
import MyQuestions from "./components/myprofile/myquestions/MyQuestions";
import UpdateQuestion from "./components/myprofile/myquestions/UpdateQuestions";
import MyAnswers from "./components/myprofile/myanswer/MyAnswer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/questions" element={<Questions />}></Route>
          <Route path="/tags" element={<Tags />}></Route>
          <Route path="/editor" element={<Editor />} />
          <Route path="/question/:type" element={<Content />}></Route>
          <Route path="/answer/:type" element={<UserQuestionContent />}></Route>
          <Route path="/myquestions" element={<MyQuestions />}></Route>
          <Route path="/updateque/:type" element={<UpdateQuestion />} />
          <Route path="/myanswers" element={<MyAnswers />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import { useRef } from "react";

// export default function Counter() {
//   let ref = useRef(0);

//   function handleClick() {
//     ref.current = ref.current + 1;
//     alert("You clicked " + ref.current + " times!");
//   }

//   return <button onClick={handleClick}>Click me!</button>;
// }
