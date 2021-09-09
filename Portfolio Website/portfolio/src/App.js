import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SinglePost from "./components/SinglePost";
import Post from "./components/Post";
import Experience from "./components/Experience";
import NavBar from "./components/NavBar";
import Skills from "./components/Skills";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={About} path="/about" />
        {/* SinglePost is before Post bc we need the full url with
        the slug in it, otherwise its just the post url */}
        <Route component={SinglePost} path="/post/:slug" />
        <Route component={Post} path="/post" />
        <Route component={Experience} path="/experience" />
        <Route component={Skills} path="/skills" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
