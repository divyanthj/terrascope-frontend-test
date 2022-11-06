import logo from './logo.svg';
import Idea from "./Components/Idea";
import { useState, useEffect } from "react";
import IDEAS from "./Constants/API Urls/Ideas.js";
import IDEA from "./Constants/API Urls/Idea.js";
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {

  const [ ideas, setIdeas ] = useState([]);
  const [ localIdeas, setLocalIdeas ] = useState([]);

  const getIdeas = () => {
    fetch(IDEAS).then(response => response.json()).then(result => {
      
      if(result.success) {
        localStorage.setItem("ideas", JSON.stringify(result.ideas));
        setIdeas(JSON.parse(localStorage.getItem("ideas")));
      }
      
    }).catch(error => {
      console.log("Error fetching ideas", error);
    })
  }

  const updateIdea = (id, title, body, date) => {
    const idea = {
      id,
      title,
      body,
      date
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idea)
    }

    fetch(IDEA + "/update", options).then(res => res.json()).then(result => {
      localStorage.setItem("ideas", JSON.stringify(result.ideas));
      setIdeas(JSON.parse(localStorage.getItem("ideas")));
      //window.location.reload(false);
    }).catch(e => {
      console.log("Unable to update");
    })
  }

  const deleteIdea = (id) => {
    console.log("Delete idea api", id);
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      })
    }

    fetch(IDEA + "/delete", options).then(res => res.json()).then(result => {
      localStorage.setItem("ideas", JSON.stringify(result));
      setIdeas(JSON.parse(localStorage.getItem("ideas")));
      window.location.reload(false);
    }).catch(error => {
      console.log("Error deleting", error);
    })
  }

  useEffect(() => {
    getIdeas();
  }, []);

  const handleDeleteIdea = (id) => {
    deleteIdea(id);
  }

  const handleUpdateIdea = (id, title, body) => {
    updateIdea(id, title, body);
  }

  const handleAddIdea = () => {
    let idea = {
      title: "",
      body: ""
    }

    fetch(IDEAS + "/new").then(res => res.json()).then(result => {
      idea.id = result.id;
      idea.created_date = result.created_date;
      ideas.push(idea);
      localStorage.setItem("ideas", JSON.stringify(ideas));
      setIdeas(JSON.parse(localStorage.getItem("ideas")));
    }).catch(error => {
      console.log("Error getting new idea ", error)
    })
    
    
  }

  return (
    <div className="App">
      {
        ideas && ideas.map(idea => {
          return <Idea 
                    key={idea.id}
                    id={idea.id}
                    title={idea.title} 
                    body={idea.body} 
                    createdAt={idea.created_date}                 
                    onDeleteIdea={handleDeleteIdea}
                    onUpdateIdea={handleUpdateIdea}
                    ></Idea>
        })
      }
      <Idea onAddIdea={handleAddIdea}></Idea>
    </div>
  );
}

export default App;
