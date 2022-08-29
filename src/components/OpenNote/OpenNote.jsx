import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Status from "../Status/Status";

function OpenNote({
    closeNote,
    session,
    brk,
    settings,
    deleteNote,
    secondaryColor,
    opositeColor,
}) {
    const current = useSelector((state) => state.notes.current);
    const { title, content, color } = current;

    const [sessionTime, setSessionTime] = useState(session);
    const [brkTime, setBrkTime] = useState(brk);
    const [onBrk, setOnBrk] = useState(false);
    const [tomatoes, setTomatoes] = useState(6);
    const [timerOn, setTimerOn] = useState(false);

    const aud = document.getElementById("buzzer");

    const timer = window.setInterval(function () {
        timerFunc();
    }, 1000);

    function timerFunc() {
        clearInterval(timer);
        if (timerOn) {
            if (onBrk) {
                setBrkTime(brkTime - 1);
                if (brkTime <= 0) {
                    //Break is over, reset break time and start session length
                    aud.play();
                    setBrkTime(brk);
                    setOnBrk(false);
                }
            } else {
                setSessionTime(sessionTime - 1);
                if (sessionTime <= 0) {
                    aud.play();
                    //Session is over, check if we reach amount of tomatos, else reset session time and start break
                    setTomatoes(tomatoes - 1);
                    if (tomatoes <= 1) {
                        //well done you finish your pomdoro
                        //show well done message(in this message ask if the task is complete and offer to delete it)
                        //reset all states
                        setOnBrk(false);
                        setSessionTime(session);
                        setBrkTime(brk);
                        setTomatoes(6);
                        setTimerOn(false);
                        alert("Well done, you finish your pomdoro session");
                    } else {
                        setSessionTime(session);
                        setOnBrk(true);
                    }
                }
            }
        }
    }

    function tomatoesHandler(t) {
        setTomatoes(t);
    }

    return (
        <OpenNoteDiv
            className="component"
            id="open-note-container"
            color={color}
            secondaryColor={secondaryColor}
            opositeColor={opositeColor}
        >
            <button className="noteDelete" onClick={deleteNote}>
                🗑️
            </button>
            <button className="noteSettings" onClick={settings}>
                ⚙️
            </button>
            <h1 id="openNoteTitle">{title}</h1>
            <div className="open-note-body">
                <p>{content}</p>
            </div>
            <div className="fadeText"></div>
            <Status
                tomatoesHandler={tomatoesHandler}
                onBrk={onBrk}
                brkTime={brkTime}
                sessionTime={sessionTime}
                closeNote={closeNote}
                setTimerOn={setTimerOn}
                tomatoes={tomatoes}
                bgColor={opositeColor}
                timerOn={timerOn}
            />
            <audio
                id="buzzer"
                preload="auto"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ></audio>
        </OpenNoteDiv>
    );
}

const OpenNoteDiv = styled.div`
    box-shadow: 0 0 0 10000px ${(props) => props.color};
    background-color: ${(props) => props.color};

    width: 100%;
    max-width: 600px;
    height: 100%;

    position: relative;
    display: flex;
    flex-direction: column;

    overflow: hidden;
    word-break: normal;
    overflow-wrap: anywhere;
    hyphens: auto;
    margin-bottom: 20px;
    margin-top: 20px;

    color: ${(props) => props.secondaryColor};

    .open-note-body {
        height: 100%;
        overflow-y: scroll;
        padding: 30px;
        cursor: text;

        p {
            font-size: 1.1rem;
            line-height: 1.45;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(props) => props.opositeColor};
        }

        ::-webkit-scrollbar-thumb:hover {
            background: ${(props) => props.secondaryColor};
        }

        @media (max-width: 300px) {
            padding: 10px;
            p {
                font-size: 0.9rem;
            }
        }
    }

    h1 {
        text-align: center;
        margin-bottom: 10px;
        border-bottom: 2px solid ${(props) => props.opositeColor};

        @media (max-width: 400px) {
            text-align: left;
        }

        @media (max-width: 300px) {
            font-size: 1.1rem;
            margin: 0 10px 10px 10px;
        }
    }

    .fadeText {
        margin-top: -10px;
        width: 100%;
        height: 50px;
        background: ${(props) => props.color};
        box-shadow: 0 10px 0 10px ${(props) => props.color},
            0 -20px 40px 15px ${(props) => props.color};
        transform: translateY(20px);
    }

    .noteSettings,
    .noteDelete {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 1.5rem;
        background-color: transparent;
        border: none;
        cursor: pointer;

        &:first-child {
            right: 50px;
        }

        @media (max-width: 300px) {
            width: 20px;
            height: 20px;
            font-size: 1rem;
            &:first-child {
                right: 40px;
            }
        }
    }
`;

export default OpenNote;
