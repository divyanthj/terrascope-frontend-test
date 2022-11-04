import logo from './logo.svg';
import Idea from "./Components/Idea";
import { useState, useEffect } from "react";
import IDEAS from "./Constants/API Urls/Ideas.js";
import './App.css';

function App() {

  const [ ideas, setIdeas ] = useState([]);

  useEffect(() => {
    fetch(IDEAS).then(response => response.json()).then(result => {
      setIdeas(result);
      console.log("Ideas", ideas);
    }).catch(error => {
      console.log("Error fetching ideas", error);
    })
  }, []);

  return (
    <div className="App">
      {
        ideas && ideas.map(idea => {
          return <Idea title={idea.title} body={idea.body} createdAt={idea.created_date} key={idea.id}></Idea>
        })
      }
    </div>
  );
}

export default App;
