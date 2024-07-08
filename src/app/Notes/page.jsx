"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./notes.css";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import axios from "axios";
import Line from "@/component/Line.jsx";



// icons
import { TbPointFilled } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";




function Page() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [noteId, setNoteid] = useState();
  const [showModal, setshowModal] = useState(false);
  const [showModaledite, setshowModaledite] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_CRUD);
        console.log("notes", response.data);
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
   }, []);



  const user = useSelector((state) => state.user.user);
  if (!user) {
    return (
      <div className="notepage">
        <div className="naviget">
          <div className="navigetpr">
            <Link href={"/notes"} className="iconlink">
              <FaUserAlt />
              Dashboard
            </Link>
            <span
              onClick={() => {
                setshowModal(true);
              }}
              href={"/dashboard"}
              className="iconlink"
            >
              <MdAdd />
              Add Note
            </span>
            <span href={"/notes"} className="iconlink">
              <FaPen />
              Edit Note
            </span>
            <Link href={"/Notes"} className="iconlink">
              <FaListUl />
              View Notes
            </Link>
          </div>
        </div>
        <div className="notesclass">
          <div className="headerNotes">
            <h1>Notes</h1>
            <div className="flex gap">
              <div className="flex">
                <span className="uppercase">
                  <Link href={"/signIn"} className="iconlink">
                    <GrLogin />
                    login
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <Line />
        </div>
      </div>
    );
  }
  function extractNameFromIdToken(idToken) {
    // Decode the idToken to get the payload
    const decodedToken = jwt.decode(idToken.jwtToken, { complete: true });

    const name = decodedToken.payload.name;

    return name;
  }
  const name = extractNameFromIdToken(user?.idToken);

  const handeledit = () => {
    const body = { title, note, category, name, noteId };
    axios
      .put(
        process.env.NEXT_PUBLIC_API_CRUD,
        body
      )
      .then(function (response) {
        setshowModaledite(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const handelsave = async (e) => {
    const body = { title, note, category, name };
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_CRUD,
        body
      )
      .then(function (response) {
        setshowModal(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const handeldelete = () => {
    axios
      .delete(
        process.env.NEXT_PUBLIC_API_CRUD,
        { data: { noteId } }
      )
      .then((response) => {
        setshowDelete(false);
      })
      .catch((error) => {});
  };




  return (
    <div className="notepage">
      <div className="naviget">
        <div className="navigetpr">
          <Link href={"/notes"} className="iconlink">
            <FaUserAlt />
            Dashboard
          </Link>

          <span
            onClick={() => {
              setshowModal(true);
            }}
            className="iconlink"
          >
            <MdAdd />
            Add Note
          </span>

          <Link href={"/Notes"} className="iconlink">
            <FaListUl />
            View Notes
          </Link>
          <Link href={"/signIn"} className="iconlink">
            <IoLogOut />
            logout
          </Link>
        </div>
      </div>
      <div className="notesclass">
        <div className="headerNotes">
          <h1>Notes</h1>
          <div className="flex gap">
            <div className="flex">
              <Image
                src={"/image.jpg"}
                alt="image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="uppercase">
                {" "}
                {user ? (
                  <p className="uppercase">
                    {" "}
                    {/* {extractNameFromIdToken(user.idToken)} */ name}
                  </p>
                ) : (
                  <p>note</p>
                )}
              </span>
            </div>
          
          </div>
        </div>
        <Line />
        <div className="allcard">
          <div className="card">
            <h1 className="titleCrad">Today&apos;s Notes</h1>
            <br></br>
            <div>
              {notes.map((notes) => {
                if (notes.category === "Today's Notes" && notes.name == name) {
                  return (
                    <>
                      {/* <ListOfNotes notes={notes} props={setshowDelete} /> */}
                      <div className="flex padding">
                        <div className="flex gap1">
                          <TbPointFilled />
                          <p className="text-on-list">{notes.title}</p>
                        </div>
                        <p className="">{notes.note}</p>

                        <span
                          onClick={() => {
                            setNoteid(notes.noteId);
                            setshowModaledite(true);
                          }}
                          className="text"
                        >
                          Edit
                        </span>
                        <button
                          onClick={() => {
                            setNoteid(notes.noteId);
                            setshowDelete(true);
                          }}
                          className="text"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
          <div className="card">
            <h1 className="titleCrad">Tomorrow&apos;s Notes</h1>
            <br></br>
            <div>
              {notes.map((notes) => {
                if (
                  notes.category === "Tomorrow's Notes" &&
                  notes.name == name
                ) {
                  return (
                    <>
                      {/* <ListOfNotes notes={notes} props={setshowDelete} /> */}
                      <div className="flex padding">
                        <div className="flex gap1">
                          <TbPointFilled />
                          <p className="text-on-list">{notes.title}</p>
                        </div>
                        <p className="">{notes.note}</p>

                        <span
                          onClick={() => {
                            setNoteid(notes.noteId);
                            setshowModaledite(true);
                          }}
                          className="text"
                        >
                          Edit
                        </span>
                        <button
                          onClick={() => {
                            setNoteid(notes.noteId);
                            setshowDelete(true);
                          }}
                          className="text"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
          <div className="card">
            <h1 className="titleCrad">This Week&apos;s Notes</h1>
            <br></br>
            <div>
              {notes.map((notes) => {
                if (
                  notes.category === "This Week's Notes" &&
                  notes.name == name
                ) {
                  return (
                    <>
                      {/* <ListOfNotes notes={notes} props={setshowDelete} /> */}
                      <div className="flex padding">
                        <div className="flex gap1">
                          <TbPointFilled />
                          <p className="text-on-list">{notes.title}</p>
                        </div>
                        <p className="">{notes.note}</p>

                        <span
                          onClick={() => {
                            setNoteid(notes.noteId);
                            setshowModaledite(true);
                          }}
                          className="text"
                        >
                          Edit
                        </span>
                        <button
                          onClick={() => {
                            setNoteid(notes.noteId);
                            setshowDelete(true);
                          }}
                          className="text"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className=" fixed">
          <div className="addNotes">
            <div className="flex titladdnote ">
              <button
                className="closeButton"
                onClick={() => {
                  setshowModal(false);
                }}
              >
                <IoCloseSharp />
              </button>
            </div>
            <h3 className="titledes">Title :</h3>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title"
              className="titleinput"
            />
            <span className="date ">
              <h1>category:</h1>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="Today's Notes">please select</option>
                <option value="Today's Notes">Today&apos;s Notes</option>
                <option value="Tomorrow's Notes">Tomorrow&apos;s Notes</option>
                <option value="This Week's Notes">This Week&apos;s Notes</option>
              </select>
            </span>
            <h3 className="titledes">Description :</h3>
            <input
              onChange={(e) => setNote(e.target.value)}
              type="text"
              className="inputdes"
              placeholder="Description"
            />
            <button onClick={handelsave} className="save">
              Save
            </button>
          </div>
        </div>
      )}
      {showModaledite && (
        <div className=" fixed">
          <div className="addNotes">
            <div className="flex titladdnote ">
              <button
                className="closeButton"
                onClick={() => {
                  setshowModaledite(false);
                }}
              >
                <IoCloseSharp />
              </button>
            </div>
            <h3 className="titledes">Title :</h3>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title"
              className="titleinput"
            />
            <span className="date ">
              <h1>category:</h1>
              <select
                onChange={(e) => setCategory(e.target.value)}
            
              >  <option value="Today's Notes">pleasee select</option>
                <option value="Today's Notes">Today&apos;s Notes</option>
                <option value="Tomorrow's Notes">Tomorrow&apos;s Notes</option>
                <option value="This Week's Notes">This Week&apos;s Notes</option>
              </select>
            </span>
            <h3 className="titledes">Description :</h3>
            <input
              onChange={(e) => setNote(e.target.value)}
              type="text"
              className="inputdes"
              placeholder="Description"
            />
            <button onClick={handeledit} className="save">
              Save
            </button>
          </div>
        </div>
      )}
      {showDelete && (
        <div className="fixed">
          <div className="deletecard">
            <p className="DELETENOTE">Delete Note</p>
            <div className="buttonyesorno">
              <button onClick={handeldelete} className="YES">
                YES
              </button>
              <button
                onClick={() => {
                  setshowDelete(false);
                }}
                className="NO"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
