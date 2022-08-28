import "./App.css";
import Note from "./components/Note/Note";
import { useState } from "react";
import Logo from "./images/getitdone.png";
import AddNew from "./components/AddNew/AddNew";
import OpenNote from "./components/OpenNote/OpenNote";
import NoteSettings from "./components/NoteSettings/NoteSettings";
import AppSettings from "./components/AppSettings/AppSettings";
import DeleteNote from "./components/DeleteNote/DeleteNote";

function App() {
    const initialTask = [
        {
            title: "Initial Task",
            color: "#efaefa",
            priority: "high",
            content:
                "Hello there, welcome to GetItDone. Click on this note to open. With this app you can set up tasks in notes, then when you open a task you can start pomdoro timmers until complete it. Once you are done with a task you can simply delete it from the options button  next to the title note. You can setup background music from youtube videos on the app settings. To create a new task simple press 'ADD NEW TASK', you can setup its color and priority. Tasks with higher priority will be shown first. Delete this note when you are ready, and start adding your own!",
        },
    ];

    const [tasks, setTasks] = useState(initialNotes());
    const [showAddNew, setShowAddNew] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const [showOpenNote, setShowOpenNote] = useState(false);
    const [currentNote, setCurrentNote] = useState("");
    const [sessionLength, setSessionLength] = useState(1500);
    const [brkLength, setBrkLength] = useState(300);
    const [showNoteSettings, setShowNoteSettings] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    function initialNotes() {
        const retrievedObject = localStorage.getItem("storedTasks");
        if (retrievedObject) return JSON.parse(retrievedObject);
        else return initialTask;
    }

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

    function saveNewTasksState(arr) {
        //sort state before save
        const high = arr.filter((a) => a.priority === "high");
        const normal = arr.filter((a) => a.priority === "normal");
        const low = arr.filter((a) => a.priority === "low");

        const sortedArr = [...high, ...normal, ...low];

        localStorage.setItem("storedTasks", JSON.stringify(sortedArr));
        setTasks(sortedArr);
    }

    const addTask = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const currentTaskTitles = tasks.map((task) => task.title);
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

        const newTest = tasks.concat(newTask);
        document.getElementById("add-new-task-form").reset();

        setShowAddNew(false);
        saveNewTasksState(newTest);
    };

    function openNote(title) {
        const note = tasks.find((note) => note.title === title);
        setCurrentNote(note);
        setShowOpenNote(true);
    }

    function openNoteSettings() {
        setShowNoteSettings((showNoteSettings) => !showNoteSettings);
        setShowOpenNote(!showOpenNote);
    }

    function openDeleteNote() {
        setShowDeleteTask((showDeleteTask) => !showDeleteTask);
        setShowOpenNote(!showOpenNote);
    }

    function editNote(event) {
        event.preventDefault();

        //Delete Task
        const index = tasks.findIndex(
            (note) => note.title === currentNote.title
        );
        let newArr = [...tasks];
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
        saveNewTasksState(newTest);

        //Change current note
        const note = newTest.find((note) => note.title === newTask.title);
        setCurrentNote(note);

        //Close settings
        openNoteSettings();
    }

    function deleteNote() {
        const checkName = document.getElementById("deleteTaskName");

        if (checkName.value !== currentNote.title) {
            alert("Type the name of the task to delete it please");
            return;
        }

        //Delete Task
        const index = tasks.findIndex(
            (note) => note.title === currentNote.title
        );
        let newArr = [...tasks];
        newArr.splice(index, 1);
        saveNewTasksState(newArr);

        //Close Delete Menu
        setShowDeleteTask(false);
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
        if (showAddNew) {
            return (
                <AddNew
                    submitHandler={addTask}
                    cancelHandler={() => setShowAddNew(false)}
                />
            );
        } else if (showNoteSettings) {
            return (
                <NoteSettings
                    note={currentNote}
                    cancelHandler={openNoteSettings}
                    submitHandler={editNote}
                />
            );
        } else if (showOpenNote) {
            return (
                <OpenNote
                    closeNote={() => setShowOpenNote(false)}
                    note={currentNote}
                    session={sessionLength}
                    brk={brkLength}
                    settings={() => openNoteSettings()}
                    deleteNote={() => openDeleteNote()}
                    secondaryColor={ComplementaryColor(currentNote.color)}
                    opositeColor={ComplementaryColor(currentNote.color, false)}
                />
            );
        } else if (showSettings) {
            return (
                <AppSettings
                    setSession={changeSessionLength}
                    currentSession={sessionLength}
                    setBreak={changeBreakLength}
                    currentBreak={brkLength}
                    closeSettings={() => setShowSettings(false)}
                />
            );
        } else if (showDeleteTask) {
            return (
                <DeleteNote
                    note={currentNote}
                    cancelHandler={openDeleteNote}
                    submitHandler={deleteNote}
                />
            );
        } else {
            return (
                <>
                    <div className="mainButtonsContainer">
                        <button
                            className="add-task"
                            onClick={() => setShowAddNew(true)}
                        >
                            ADD NEW TASK
                        </button>

                        <button
                            id="openSettingsButton"
                            onClick={() => setShowSettings(true)}
                        >
                            ⚙️
                        </button>
                    </div>

                    <div className="notes-container">
                        {tasks.map((note) => (
                            <Note
                                key={note.title}
                                title={note.title}
                                color={note.color}
                                priority={note.priority}
                                content={note.content}
                                openNote={() => openNote(note.title)}
                                secondaryColor={ComplementaryColor(note.color)}
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
