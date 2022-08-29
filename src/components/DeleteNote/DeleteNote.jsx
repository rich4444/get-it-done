import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function DeleteNote({ submitHandler, cancelHandler }) {
    const current = useSelector((state) => state.notes.current);

    return (
        <DeleteNoteDiv
            color={current !== undefined ? current.color : "transparent"}
        >
            <h1>Delete Task?</h1>
            <div className="line"></div>
            <label htmlFor="deleteTask">
                Enter the task name:
                <br />(
                <span>{current !== undefined ? current.title : "NOMBRE"}</span>)
            </label>
            <input
                name="deleteTask"
                id="deleteTaskName"
                type="text"
                placeholder="TASK NAME"
                required
            />
            <div className="buttons-container">
                <button onClick={cancelHandler}>X</button>
                <button onClick={submitHandler} type="submit">
                    DELETE
                </button>
            </div>
        </DeleteNoteDiv>
    );
}

const DeleteNoteDiv = styled.div`
    background-color: green;
    box-shadow: 0 0 0 10000px ${(props) => props.color};
    max-width: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border: 10px solid red;
    border-radius: 15px;

    h1 {
        font-size: 1.6rem;
        text-align: center;
        color: red;
        margin-bottom: 15px;
    }

    label {
        font-weight: bolder;
        margin-bottom: 15px;
        span {
            color: red;
        }
    }

    input {
        padding: 5px;
        outline: none;
        border: none;
        margin-bottom: 5px;
        border-bottom: 1px solid red;
        text-align: center;
        font-size: 1rem;
    }

    .buttons-container {
        width: 100%;
        display: flex;
        gap: 5px;

        @media (max-width: 300px) {
            flex-direction: column;
        }

        button {
            margin-top: 10px;
            padding: 5px 30px;
            outline: none;
            border: none;
            border-radius: 30px 0 0 30px;
            background-color: var(--main-color);
            color: white;
            font-weight: bolder;
            font-size: 1rem;
            cursor: pointer;
            flex: 1;

            transition: all 0.3s ease;
            :hover {
                transform: translateY(-1px);
                box-shadow: 0 5px 10px 0 black;
            }
            :active {
                transform: translateY(1px);
                box-shadow: none;
            }

            &:last-child {
                background-color: red;
                border-radius: 0 30px 30px 0;
                flex: 10;
            }

            @media (max-width: 300px) {
                border-radius: 30px;
                &:last-child {
                    border-radius: 30px;
                }
            }
        }
    }
`;

export default DeleteNote;
