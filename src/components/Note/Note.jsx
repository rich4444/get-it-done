import styled from "styled-components";

function Note({ title, color, content, openNote, secondaryColor, opositeColor }) {
    return (
        <NoteDiv className="note component" color={color} secondaryColor={secondaryColor} opositeColor={opositeColor}>
            <div className="note-header">
                <h2>{title}</h2>
            </div>
            <div className="note-body" onClick={openNote}>
                <p>{content}</p>
            </div>
        </NoteDiv>
    );
}

const NoteDiv = styled.div`
    width: 100%;
    max-width: 300px;
    height: 250px;
    background-color: ${(props) => props.color};
    overflow: hidden;
    box-shadow: 5px 10px 10px 0 #00000075;
    clip-path: polygon(calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%, 0 0);

    .note-header {
        position: relative;
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
        padding: 5px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;

        ::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            border-style: solid;
            border-width: 0 40px 40px 0;
            border-color: rgba(0, 0, 0, 0.4) transparent rgba(0, 0, 0, 0.4)
                rgba(0, 0, 0, 0.4);
            box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.8);
        }

        button {
            border-radius: 50%;
            width: 25px;
            aspect-ratio: 1;
            cursor: pointer;
            border: none;
        }
    }

    .note-body {
        padding: 10px;
        word-break: normal;
        overflow-wrap: anywhere;
        hyphens: auto;
        cursor: pointer;
        height: calc(100% - 40px);
        overflow-y: scroll;

        ::-webkit-scrollbar-thumb {
            background: ${(props) => props.opositeColor};
        }

        ::-webkit-scrollbar-thumb:hover {
            background: ${(props) => props.secondaryColor};
        }
    }
`;

export default Note;
