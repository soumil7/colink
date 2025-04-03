import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiFillCamera, AiOutlineSearch } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { useToast } from "@chakra-ui/toast";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import moment from "moment";
import axios from "axios";
import creditsIcon from "./credit.png";
import partnerIcon from "./business.png";
import chatBot from "./chatbot.png";

import jwtDecode from "jwt-decode";

function Sidebar() {
  const [activeUser, setActiveUser] = useState("");
  const [input, setInput] = useState("");
  const toast = useToast();
  const [img, setImg] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);

  const checkInput = input || img;

  const successToast = () => {
    toast({
      title: `Tweet sent`,
      position: "top",
      isClosable: true,
    });
  };

  async function populateUser() {
    const req = await fetch("http://localhost:5000/feed", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setActiveUser(data.activeUser.username);
    } else {
      alert(data.error);
    }
  }

  populateUser();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const logout = (e) => {
    localStorage.removeItem("token");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tweet = {
      content: input,
      postedBy: {
        username: activeUser,
      },
      image: "",
      likes: [],
      retweets: [],
      comments: [],
      likeTweetBtn: "black",
      postedTweetTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
      tweetId: moment(),
    };

    // let form = document.getElementById("form1");
    // let formData = new FormData(form);

    // formData.append("main", JSON.stringify(tweet));
    const action = e.target.action;
    const data = { tweet: JSON.stringify(tweet), image: img };

    axios
      .post(`${action}`, data)
      .then(setInput(""))
      .then(setImg(""))
      .then(setIsImageSelected(false))
      .then(successToast())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-menu-items">
          <div className="title">
            <Link to="/feed">
              {/* <BsTwitter /> */}
              <h5>CoLink</h5>
            </Link>
          </div>
        </li>
        <li className="sidebar-menu-items">
          <Link to="/feed">
            <BiHome />
            <div>Home</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <Link to={`/leaderboard/${activeUser}`}>
            <img
              src={creditsIcon}
              alt="Credits"
              style={{ width: "24px", height: "24px" }}
            />
            <div>credits</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <Link to={`/partners`}>
            <img
              src={partnerIcon}
              alt="Partners"
              style={{ width: "24px", height: "24px" }}
            />
            <div>Collab</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <Link to={`/profile/${activeUser}`}>
            <CgProfile />
            <div>Profile</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <Link to={`/search`}>
            <AiOutlineSearch />
            <div>Search</div>
          </Link>
        </li>
        <li className="sidebar-menu-items">
          <a
            href="http://localhost:5173/chatbot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={chatBot}
              alt="ChatBot"
              style={{ width: "24px", height: "24px" }}
            />
            <Link to={`/chatbot`}>
              <div>Chatbot</div>
            </Link>
          </a>
        </li>

        <li onClick={logout} className="sidebar-menu-items">
          <Link to="/">
            <GrLogout />
            <div>Logout</div>
          </Link>
        </li>
        <li className="sidebar-menu-items tweet-list-item">
          <Popup
            trigger={
              <button className="tweetBtn sidebar-menu-tweetBtn">Help</button>
            }
            modal
            position="center"
          >
            {(close) => (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  close();
                }}
                method="post"
                encType="multipart/form-data"
                action="http://localhost:5000/feed"
                className="tweet-form"
                id="form1"
              >
                <input
                  autoFocus
                  placeholder="What's happening?"
                  type="text"
                  value={input}
                  onChange={handleChange}
                ></input>
                <div className="tweet-flex">
                  <div>
                    <AiFillCamera
                      style={{
                        color: "#1DA1F2",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>

                  <input
                    className="image-input"
                    type="text"
                    placeholder="Enter an image url here"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                  ></input>
                  <button
                    className={checkInput ? "tweetBtn" : "disabled"}
                    disabled={!checkInput}
                    type="submit"
                  >
                    {" "}
                    Help
                  </button>
                </div>
                <img className="tweet-preview" src={img} alt="" />
              </form>
            )}
          </Popup>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
