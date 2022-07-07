import { useState, useEffect } from "react";
import UserInfo from "./components/UserInfo";
import ReposView from "./components/ReposView";
import axios from "axios";
import avatarPlaceholder from "./avatar.svg";

const ghApiUrl = "https://api.github.com/users";

function App() {
  const [user, setUser] = useState([]);
  const [userRepo, setUserRepo] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [rateLimited, setRateLimited] = useState([]);

  const handleKeyPress = (e) => { 
    if(e.key === 'Enter'){
      console.log('You must have pressed Enter ');
      getUser(searchTerm);
      setSearchTerm("");
    }
  }
  
  const getUser = (username) => {
    axios
      .get(`${ghApiUrl}/${username}`)
      .then(function (response) {
        setUser(response.data);
        document.title = username + " - GH Profiles";
        setRateLimited(false);
      })
      .catch(function (error) {
        if (error.message === "Request failed with status code 403") {          
          console.log("rate limited");
          setRateLimited(true);
          document.title = "RATE LIMITED - GH Profiles";
        }
      })
      .then(function () {
        axios
        .get(`${ghApiUrl}/${username}/repos`)
        .then(function (response) {
          setUserRepo(response.data);
        })
        .catch(function (error) {
          if (error.message === "Request failed with status code 403") {          
            console.log("rate limited");
            setRateLimited(true);
            document.title = "RATE LIMITED - GH Profiles";
          }
        })
        .then(function () {
        });
      });
  };

  useEffect(() => {

    const placeholderUser = {
      login: 'example',
      name: 'placeholder',
      created_at: '2015-09-11T21:50:35Z',
      avatar_url: avatarPlaceholder,
      bio: 'This is a placeholder! Search for a user on GitHub...',
      followers: 999,
      following: 11
    }
  
    setUser(placeholderUser); 
    setRateLimited(false);

  }, []);

  return (
    <div className="App">
      <header>
        {user && !rateLimited ? <UserInfo user={user}/> : <h1 class="flex justify-center font-bold text-5xl p-9">RATE LIMITED</h1>}
        <div class="py-2 px-5">
          {user && !rateLimited ? <input id="search" class="input w-full max-w-xs h-9"
            placeholder={"Search Username..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          /> : null}
        </div>
      </header>
      {user.public_repos > 0 ? <h1 class="text-4xl px-9">Public Repositories: {user.public_repos}</h1> : null}
      {user.public_repos > 0 ? <h1 class="px-9 py-1 font-extralight">
        Due to a limitation in the public GitHub API, a maximum of thirty repositories can be shown...
      </h1> : <h1 class="px-9 py-1 font-extralight text-2xl">
        No Repositories Found :(
      </h1>}
      {userRepo.map((repo) => (
        <ReposView repo={repo} />
      ))}
    </div>
  );
}

export default App;
