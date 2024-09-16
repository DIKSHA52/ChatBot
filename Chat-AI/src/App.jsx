import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");

  async function generateAns() {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAML4wlzd7JBMPwTm_cQ4DMQtD4-u4L01U",
        method: "post",
        data: { contents: [{ parts: [{ text: ques }] }] }
      });
      setAns(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating answer:", error);
      setAns("Sorry, there was an error. Please try again.");
    }
  }

  return (
    <div className="app-container">
      <h1>ChatBot</h1>
      <textarea
        value={ques}
        onChange={(e) => setQues(e.target.value)}
        placeholder="Type your question here..."
        className="textarea"
      ></textarea>
      <button onClick={generateAns} className="generate-button">
        Generate Answer
      </button>
      <pre className="answer-output">{ans}</pre>
    </div>
  );
}

export default App;
