import logo from './logo.svg';
import Idea from "./Components/Idea";
import { useState, useEffect } from "react";
import IDEAS from "./Constants/API Urls/Ideas.js";
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {

  const [ ideas, setIdeas ] = useState([]);
  const [ localIdeas, setLocalIdeas ] = useState([]);

  useEffect(() => {
    fetch(IDEAS).then(response => response.json()).then(result => {
      
      localStorage.setItem("ideas", JSON.stringify(result));
      setIdeas(JSON.parse(localStorage.getItem("ideas")));
    }).catch(error => {
      console.log("Error fetching ideas", error);
    })
  }, []);

  const handleDeleteIdea = (id) => {

  }

  const handleUpdateIdea = (id) => {

  }

  const handleAddIdea = (title, body) => {

  }

  return (
    <div className="App">
      {
        ideas && ideas.map(idea => {
          return <Idea 
                    title={idea.title} 
                    body={idea.body} 
                    createdAt={idea.created_date} 
                    key={idea.id}></Idea>
                    onDeleteIdea={handleDeleteIdea}
                    onUpdateIdea={handleUpdateIdea}
                    onAddIdea={handleAddIdea}
        })
      }
      <Idea></Idea>
    </div>
  );
}

export default App;
