import { useState } from "react";
// Styles and images
import "./App.css";
import Logo from "./images/getitdone.png";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateNotes, currentNote } from "./slices/notesSlice.js";
import { changeRender } from "./slices/renderSlice.js";
// Components
import Note from "./components/Note/Note";
import AddNew from "./components/AddNew/AddNew";
import OpenNote from "./components/OpenNote/OpenNote";
import NoteSettings from "./components/NoteSettings/NoteSettings";
import AppSettings from "./components/AppSettings/AppSettings";
import DeleteNote from "./components/DeleteNote/DeleteNote";

function App() {
    const [sessionLength, setSessionLength] = useState(1500);
    const [brkLength, setBrkLength] = useState(300);

    //Load from redux state
    const notes = useSelector((state) => state.notes.notes);
    const current = useSelector((state) => state.notes.current);
    const render = useSelector((state) => state.render.render);
    const dispatch = useDispatch();

    function changeSessionLength(e) {
        let newValue = e.target.value * 60;
        if (newValue < 0) newValue = 1;
        setSessionLength(newValue);
    }
    function changeBreakLength(e) {
        let newValue = e.target.value * 60;
        if (newValue < 0) newValue = 60;
        setBrkLength(newValue);
    }

    function saveNewNotesState(arr) {
        //sort state before save
        const high = arr.filter((a) => a.priority === "high");
        const normal = arr.filter((a) => a.priority === "normal");
        const low = arr.filter((a) => a.priority === "low");

        const sortedArr = [...high, ...normal, ...low];

        localStorage.setItem("storedNotes", JSON.stringify(sortedArr));
        dispatch(updateNotes(sortedArr));
    }

    const addTask = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const currentNotesTitles = notes.map((note) => note.title);
        if (currentNotesTitles.includes(data.get("title"))) {
            alert(
                "There is already a task with that title. Please choose a different one."
            );
            return;
        }

        const newNote = {
            title: data.get("title"),
            color: data.get("color"),
            priority: data.get("priority"),
            content: data.get("content"),
        };

        const newNotes = [...notes, newNote];
        document.getElementById("add-new-task-form").reset();

        dispatch(changeRender("main"));
        saveNewNotesState(newNotes);
    };

    function openNote(title) {
        const note = notes.find((note) => note.title === title);

        dispatch(currentNote(note));
        dispatch(changeRender("openNote"));
    }

    function editNote(event) {
        event.preventDefault();

        //Delete Task
        const index = notes.findIndex((note) => note.title === current.title);
        let newArr = [...notes];
        newArr.splice(index, 1);

        //Add edited task
        event.preventDefault();
        const data = new FormData(event.target);

        const currentTaskTitles = newArr.map((task) => task.title);
        if (currentTaskTitles.includes(data.get("title"))) {
            alert(
                "There is already a task with that title. Please choose a different one."
            );
            return;
        }

        const newTask = {
            title: data.get("title"),
            color: data.get("color"),
            priority: data.get("priority"),
            content: data.get("content"),
        };

        const newTest = newArr.concat(newTask);
        saveNewNotesState(newTest);

        //Change current note
        const note = newTest.find((note) => note.title === newTask.title);
        dispatch(currentNote(note));

        //Close settings
        dispatch(changeRender("openNote"));
    }

    function deleteNote() {
        const checkName = document.getElementById("deleteTaskName");

        if (checkName.value !== current.title) {
            alert("Type the name of the task to delete it please");
            return;
        }

        //Delete Task
        const index = notes.findIndex((note) => note.title === current.title);
        let newArr = [...notes];
        newArr.splice(index, 1);
        saveNewNotesState(newArr);

        //Close Delete Menu
        dispatch(changeRender("main"));
    }

    function ComplementaryColor(c, bw = true) {
        //Remove the #
        if (c === undefined) return "#ffffff";
        c = c.slice(1);

        //Get the complementary color
        const complementaryColor = (Number(`0x1${c}`) ^ 0x888888)
            .toString(16)
            .slice(1)
            .toUpperCase();

        //Return black or white unless asked for oposite color
        if (bw) {
            const rgbSum =
                parseInt(c.slice(0, 2), 16) * 0.3 +
                parseInt(c.slice(2, 4), 16) * 0.6 +
                parseInt(c.slice(4, 6), 16) * 0.1;
            return rgbSum > 150 ? "#000000" : "#FFFFFF";
        }

        //Return the new color
        return "#" + complementaryColor;
    }

    function whatToRender() {
        switch (render) {
            case "addNew":
                return (
                    <AddNew
                        submitHandler={addTask}
                        cancelHandler={() => dispatch(changeRender("main"))}
                    />
                );
            case "noteSettings":
                return (
                    <NoteSettings
                        note={current}
                        cancelHandler={() => dispatch(changeRender("openNote"))}
                        submitHandler={editNote}
                    />
                );
            case "openNote":
                return (
                    <OpenNote
                        closeNote={() => dispatch(changeRender("main"))}
                        session={sessionLength}
                        brk={brkLength}
                        settings={() => dispatch(changeRender("noteSettings"))}
                        deleteNote={() => dispatch(changeRender("deleteNote"))}
                        secondaryColor={ComplementaryColor(current.color)}
                        opositeColor={ComplementaryColor(current.color, false)}
                    />
                );
            case "settings":
                return (
                    <AppSettings
                        setSession={changeSessionLength}
                        currentSession={sessionLength}
                        setBreak={changeBreakLength}
                        currentBreak={brkLength}
                        closeSettings={() => dispatch(changeRender("main"))}
                    />
                );
            case "deleteNote":
                return (
                    <DeleteNote
                        cancelHandler={() => dispatch(changeRender("openNote"))}
                        submitHandler={deleteNote}
                    />
                );
            default:
                return (
                    <>
                        <div className="mainButtonsContainer">
                            <button
                                className="add-task"
                                onClick={() => dispatch(changeRender("addNew"))}
                            >
                                ADD NEW TASK
                            </button>

                            <button
                                id="openSettingsButton"
                                onClick={() =>
                                    dispatch(changeRender("settings"))
                                }
                            >
                                ⚙️
                            </button>
                        </div>

                        <div className="notes-container">
                            {notes.map((note) => (
                                <Note
                                    key={note.title}
                                    title={note.title}
                                    color={note.color}
                                    priority={note.priority}
                                    content={note.content}
                                    openNote={() => openNote(note.title)}
                                    secondaryColor={ComplementaryColor(
                                        note.color
                                    )}
                                    opositeColor={ComplementaryColor(
                                        note.color,
                                        false
                                    )}
                                />
                            ))}
                        </div>
                    </>
                );
        }
    }

    return (
        <div className="App">
            <img className="logo" src={Logo} alt="React Logo" />

            {whatToRender()}
        </div>
    );
}

export default App;
