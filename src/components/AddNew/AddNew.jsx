import React from "react";
import AddNewDiv from "./AddNewStyles";

function AddNew({ submitHandler, cancelHandler }) {
    return (
        <AddNewDiv className="component">
            <form
                id="add-new-task-form"
                className="new-task-form"
                onSubmit={submitHandler}
            >
                <input name="title" type="text" placeholder="NAME" required />

                <label id="colorLabel">
                    <span>COLOR</span>
                    <input name="color" type="color" defaultValue="#fff333" />
                </label>

                <label htmlFor="priority">PRIORITY</label>
                <select name="priority" id="">
                    <option value="low">LOW</option>
                    <option value="normal">NORMAL</option>
                    <option value="high">HIGH</option>
                </select>

                <label htmlFor="content">CONTENT</label>
                <textarea name="content" id="" cols="30" rows="10" />
                <div className="buttons-container">
                    <button onClick={cancelHandler}>X</button>
                    <button type="submit">ADD</button>
                </div>
            </form>
        </AddNewDiv>
    );
}

export default AddNew;
