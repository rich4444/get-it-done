import React from "react";
import EditNoteDiv from "../AddNew/AddNewStyles";

function AddNew({ note, submitHandler, cancelHandler }) {
    const { title, content, color, priority } = note;

    return (
        <EditNoteDiv className="component">
            <form
                id="add-new-task-form"
                className="new-task-form"
                onSubmit={submitHandler}
                style={{
                    boxShadow: `0 0 0 10000px ${color}`,
                }}
            >
                <input
                    name="title"
                    type="text"
                    placeholder="NAME"
                    defaultValue={title}
                    required
                />

                <label id="colorLabel">
                    <span>COLOR</span>
                    <input name="color" type="color" defaultValue={color} />
                </label>

                <label htmlFor="priority">PRIORITY</label>
                <select name="priority" id="" defaultValue={priority}>
                    <option value="low">LOW</option>
                    <option value="normal">NORMAL</option>
                    <option value="high">HIGH</option>
                </select>

                <label htmlFor="content">CONTENT</label>
                <textarea
                    name="content"
                    id=""
                    cols="30"
                    rows="10"
                    defaultValue={content}
                />
                <div className="buttons-container">
                    <button onClick={cancelHandler}>X</button>
                    <button type="submit">EDIT</button>
                </div>
            </form>
        </EditNoteDiv>
    );
}

export default AddNew;
