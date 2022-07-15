import React, { useContext, useState } from "react";
import { DataContext } from "../../store/GlobalStore";
import TopNav from "./TopNav";
import "../../styles/sidebar.css";
import { BiArrowBack } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

function Sidebar(props) {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const [sidebarState, setSidebarState] = useState("msg");

  const setProfile = (prop) => {
    setSidebarState(prop);
  };

  return (
    <div className="sidebar">
      {sidebarState === "msg" ? (
        <div style={{ width: "100%" }}>
          <TopNav setProfile={setProfile} />
        </div>
      ) : (
        <div style={{ width: "100%", backgroundColor: "#e3e3e3" }}>
          <header className="header">
            <div onClick={() => setProfile("msg")}>
              <BiArrowBack className="backImg" />
            </div>
            <h3>Profile</h3>
          </header>
          <div className="imageDiv">
            <BsPersonCircle className="profileIcon" />
          </div>
          <div className="profileWhiteCard">
            <p className="greenText">Your Display Name</p>
            <div className="flexedRow">
              <p className="profileOutputText">{auth?.user.email}</p>
              <RiPencilFill style={{ fontSize: 20 }} />
            </div>
          </div>
          <div style={{ padding: 15, fontSize: 12, opacity: 0.5 }}>
            <p>This name will be visible to your whatsapp contacts</p>
          </div>
          <div className="profileWhiteCard">
            <p className="greenText">About</p>
            <div className="flexedRow">
              <p className="profileOutputText">Available</p>
              <RiPencilFill style={{ fontSize: 20 }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
