import React, { useContext, useState } from "react";
import { DataContext } from "../../store/GlobalStore";
import { BsPersonCircle } from "react-icons/bs";
import { FiEdit, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function TopNav({ setProfile }) {
  const { state, dispatch } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const [friend, setFriend] = useState("");

  const handleSignout = async () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "AUTH", payload: {} });
      })
      .catch((err) => {
        dispatch({ type: "NOTIFY", payload: { error: err.message } });
      });
  };

  const handleSetFriend = () => {
    setAddFriend(!addFriend);
    setDropDown(false);
  };

  const handleSearch = (async = (e) => {});

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className={addFriend ? "overlay" : undefined}></div>
      <div className="topInfo">
        <div onClick={() => setProfile("profile")}>
          <BsPersonCircle className="imgIcon" />
        </div>
        <div className="dropDownDiv">
          <FiEdit className="imgIcons" />

          <FiChevronDown
            className="imgIcons"
            onClick={() => setDropDown(!dropDown)}
          />
          {dropDown && (
            <div className="dropDown">
              <ul>
                <li onClick={handleSetFriend}>Add Friend</li>
                <li onClick={handleSignout}>Log out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="formSearch">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search or start a new chat"
        />
      </div>
      {addFriend && (
        <div className="addFriendCard">
          <div>
            <h3>Search friends and add</h3>
            <h5
              onClick={() => setAddFriend(false)}
              style={{
                color: "grey",
                fontWeight: "bold",
                marginLeft: 60,
                cursor: "pointer",
              }}
            >
              X
            </h5>
          </div>
          <form>
            <input
              value={friend}
              onChange={(e) => handleSearch(e)}
              placeholder="Search friends by their emails"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default TopNav;
