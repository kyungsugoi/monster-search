import React, { useEffect, useState } from "react";
import './App.css';
import { CardList } from './components/cardlist/cardlist.component'
import { SearchBar } from "./components/searchbar/searchbar.component";
import axios from 'axios';


function App() {
  // const monsters = [
  //   {
  //     "id": 1,
  //     "name": "Leanne Graham",
  //     "username": "Bret",
  //     "email": "Sincere@april.biz",
  //     "address": {
  //       "street": "Kulas Light",
  //     "suite": "Apt. 556",
  //     "city": "Gwenborough",
  //     "zipcode": "92998-3874",
  //     "geo": {
  //       "lat": "-37.3159",
  //       "lng": "81.1496"
  //   }
  //   },
  //   "phone": "1-770-736-8031 x56442",
  //   "website": "hildegard.org",
  //   "company": {
  //     "name": "Romaguera-Crona",
  //     "catchPhrase": "Multi-layered client-server neural-net",
  //     "bs": "harness real-time e-markets"
  //   }
  //   }
  // ];

  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [searchInput, setSearchInput] = useState("")
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios(
        'https://jsonplaceholder.typicode.com/users',
      );
      setMonsters(response.data);
      };
    fetchUsers();
  }, []);
  // the [] is dependencies !!!!!!!!!!! it only fetches when they change

  useEffect(() => {
    let filtered = [];
    if (searchInput === "") {
      filtered = monsters
    } else {
      filtered = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
    setFilteredMonsters(filtered);
    }, [monsters, searchInput]);
    // only when dependencies change

  const handleInput = e => {
    setSearchInput(e.target.value)
    };

  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <SearchBar
        placeholder='Search Monster'
        handleInput={handleInput}
      />
      <CardList monsters = {filteredMonsters} />
    </div>
  );
}

export default App;
