import logo from './logo.svg';
import Idea from "./Components/Idea";
import { useState, useEffect } from "react";
import IDEAS from "./Constants/API Urls/Ideas.js";
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {

  const [ ideas, setIdeas ] = useState([]);
  const [ localIdeas, setLocalIdeas ] = useState([]);

  const getIdeas = () => {
    fetch(IDEAS).then(response => response.json()).then(result => {
      
      localStorage.setItem("ideas", JSON.stringify(result));
      setIdeas(JSON.parse(localStorage.getItem("ideas")));
      console.log("Result", result);
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
    // const options = {
    //   method: "PUT",
    //   body: JSON.stringify(idea)
    // }

    const ideaIndex = ideas.indexOf(item => {
      return item.id === id;
    })

    ideas[ideaIndex] = idea;


    localStorage.setItem("ideas", JSON.stringify(ideas));
    setIdeas(JSON.parse(localStorage.getItem("ideas")));
    //window.location.reload(false);
    // fetch(IDEAS + "/" + id, options).then(res => res.json()).then(result => {
    //   localStorage.setItem("ideas", JSON.stringify(result));
    //   setIdeas(JSON.parse(localStorage.getItem("ideas")));
    //   window.location.reload(false);
    // }).catch(e => {
    //   console.log("Unable to update");
    // })
  }

  const deleteIdea = (id) => {
    console.log("Delete idea api", id);
    const options = {
      method: 'DELETE'
    }

    fetch(IDEAS + "/" + id, options).then(res => res.json()).then(result => {
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
    const currentDate = Date.now() / 1000;
    const idea = {
      title: "",
      body: "",
      id: JSON.stringify(ideas.length + 1),
      created_at: Math.floor(currentDate)
    }
    
    ideas.push(idea);
    console.log("New idea", ideas);
    localStorage.setItem("ideas", JSON.stringify(ideas));
    setIdeas(JSON.parse(localStorage.getItem("ideas")));
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
