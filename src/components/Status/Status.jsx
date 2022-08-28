import React from "react";
import "./styles.css";
import styled from "styled-components";
import { useState } from "react";
import tomatoImage from "../../images/TOMATO.webp";

function Status({
    tomatoesHandler,
    onBrk,
    brkTime,
    sessionTime,
    closeNote,
    setTimerOn,
    timerOn,
    tomatoes,
    bgColor,
}) {
    const [initial, setInitial] = useState([brkTime, sessionTime]);

    function tomatoesToShow() {
        let arr = new Array(6);
        arr.fill(0);
        for (let i = 0; i < tomatoes; i++) {
            arr[i] = 1;
        }
        return arr.map((a, index) => (
            <button
                className={a != 1 ? "tomato" : "tomato activeTomato"}
                key={"tomato" + index + 1}
                onClick={() => {
                    if (!timerOn) return tomatoesClickHandler(index + 1);
                }}
            ></button>
        ));
    }

    const tomatoesClickHandler = (i) => {
        if (timerOn) return;
        tomatoesHandler(i);
    };

    return (
        <StatusDiv
            statusBg={onBrk ? "#1932b0" : "#8a0c1d"}
            statusWidth={
                onBrk
                    ? (brkTime / initial[0]) * 100
                    : (sessionTime / initial[1]) * 100
            }
            opositeColor={bgColor}
        >
            <div className="tomatoes-container">{tomatoesToShow()}</div>

            <div className="bottomButtons">
                <button className="cancel-button" onClick={closeNote}>
                    ❌
                </button>

                <button id="startButton" onClick={() => setTimerOn(true)}>
                    <div className="progressBar">
                        <div className={timerOn ? "status" : ""}></div>
                        <span>
                            {timerOn
                                ? onBrk
                                    ? "On Break"
                                    : "On Session"
                                : "START"}
                        </span>
                    </div>
                </button>
            </div>
        </StatusDiv>
    );
}

const StatusDiv = styled.div`
    width: 50%;
    margin: auto;

    @media (max-width: 500px) {
        width: 95%;
    }

    .tomatoes-container {
        height: 30px;
        display: flex;
        justify-content: space-between;
        .tomato {
            border: none;
            height: 30px;
            aspect-ratio: 1;
            background-color: transparent;
            background-image: url(${tomatoImage});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
            filter: grayscale(1);
            &.activeTomato {
                filter: grayscale(0);
            }
        }
    }

    .bottomButtons {
        display: flex;
        margin-top: 10px;
        width: 100%;

        .cancel-button {
            width: 30px;
            height: 30px;
            border-radius: 30px 0 0 30px;
            border: none;
            border-right: 2px solid black;
            cursor: pointer;
            background-color: ${(props) => props.opositeColor};
        }

        #startButton {
            width: 100%;
            border: none;
            background-color: transparent;
            cursor: pointer;
            .progressBar {
                height: 30px;
                width: 100%;
                border-radius: 0 30px 30px 0;
                position: relative;
                background-color: ${(props) => props.opositeColor};
                span {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(255, 255, 255, 0.85);
                    padding: 0 10px;
                    border-radius: 30px;

                    @media (max-width: 500px) {
                        width: 65%;
                    }
                }

                .status {
                    height: 30px;
                    border: none;
                    background-color: ${(props) => props.statusBg};
                    background-image: linear-gradient(
                        -45deg,
                        rgba(255, 255, 255, 0.2) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(255, 255, 255, 0.2) 50%,
                        rgba(255, 255, 255, 0.2) 75%,
                        transparent 75%,
                        transparent
                    );
                    background-size: 40px 40px;
                    animation: move 2s linear infinite;
                    width: ${(props) => props.statusWidth}%;
                    border-radius: 0
                        calc(30px * calc(${(props) => props.statusWidth} / 100))
                        calc(30px * calc(${(props) => props.statusWidth} / 100))
                        0;
                    transition: all 0.3s ease;

                    @keyframes move {
                        0% {
                            background-position: 0 0;
                        }
                        100% {
                            background-position: 40px 40px;
                        }
                    }
                }
            }
        }
    }
`;

export default Status;
