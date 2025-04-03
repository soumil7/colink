import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import Profile from "./routes/profile";
import SignUp from "./routes/signUp";
import LeaderBoard from "./components/LeaderBoard";
import Partners from "./components/Partners";
import { ChakraProvider } from "@chakra-ui/react";
import Search from "./routes/search";
import ChatBot from "./components/ChatBot";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="feed" element={<App />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="/profile/:userName" element={<Profile />} />
        <Route path="/leaderboard/:userName" element={<LeaderBoard />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
