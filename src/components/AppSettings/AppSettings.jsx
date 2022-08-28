import React from "react";
import tomato from "../../images/TOMATO.webp";
import styled from "styled-components";
import InputTime from "./InputTime.jsx";

const AppSettings = ({
    setSession,
    currentSession,
    setBreak,
    currentBreak,
    closeSettings,
}) => {
    return (
        <AppSettingsDiv className="component">
            <h1>SETTINGS </h1>
            <div className="line"></div>

            <div className="tomato-settings">
                <img src={tomato} alt="pomdoro logo" id="tomato-settings" />

                <div className="tomato-settings-container">
                    <InputTime
                        className={"session-settings"}
                        handleChange={setSession}
                        current={currentSession}
                        text={"session"}
                    />
                    <InputTime
                        className={"break-settings"}
                        handleChange={setBreak}
                        current={currentBreak}
                        text={"break"}
                    />
                </div>
            </div>

            <button onClick={closeSettings}>CLOSE</button>
        </AppSettingsDiv>
    );
};

const AppSettingsDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.5);
    max-width: 95%;

    border: 10px solid var(--main-color);
    border-radius: 15px;

    h1 {
        font-size: 1.5rem;
        position: relative;
        font-weight: bolder;
        &::after {
            content: "";
            width: 100%;
            height: 2px;
            background-color: red;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .makeItRed {
            color: red;
        }
    }

    .tomato-settings {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        @media (max-width: 300px) {
            flex-direction: column;
            align-items: center;
        }
    }

    #tomato-settings {
        max-width: 80px;
        padding: 20px;
        filter: drop-shadow(5px 5px 5px #222);
        margin-left: -20px;
        @media (max-width: 300px) {
            margin-left: 0;
            margin-top: -20px;
        }
    }

    .tomato-settings-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .session-settings,
        .break-settings {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            font-weight: bolder;
            input {
                max-width: 80px;
                padding: 5px 10px;
                outline: none;
                border: none;
                background-color: #55555571;
                font-weight: bold;
                text-align: right;
                ::-webkit-inner-spin-button {
                    margin-left: 10px;
                }
            }
        }
    }

    button {
        margin: auto;
        margin-top: 20px;
        width: 90%;
        background-color: red;
        font-size: 1rem;
        padding: 5px 15px;
        font-weight: bold;
        color: white;
        border: none;
        border-radius: 20px;
        transition: all 0.3s ease;
        :hover {
            transform: translateY(-2px);
            box-shadow: 5px 5px 10px 0 black;
        }
        :active {
            transform: translateY(2px);
            box-shadow: none;
        }
    }
`;

export default AppSettings;
