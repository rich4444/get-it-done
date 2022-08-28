import styled from "styled-components";

const AddNewDiv = styled.div`
    max-width: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .new-task-form {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 15px;
        border: 10px solid var(--main-color);
        border-radius: 15px;

        #colorLabel {
            display: flex;
            width: 100%;
            margin: 5px 0 5px 0;
            span {
                margin-right: 20px;
            }
            input {
                width: 100%;
                cursor: pointer;
            }
            input[type="color"]::-webkit-color-swatch-wrapper {
                padding: 0;
            }
            input[type="color"]::-webkit-color-swatch {
                border: 1px solid var(--main-color);
            }
        }

        input,
        select,
        textarea {
            padding: 5px;
            outline: none;
            border: none;
            margin-bottom: 5px;
            &:first-child {
                border-bottom: 1px solid var(--main-color);
                text-align: center;
            }
        }

        select {
            cursor: pointer;
        }

        select,
        textarea {
            border: 1px solid var(--main-color);
        }

        textarea {
            resize: none;
            border: 1px solid var(--main-color);
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
                background-color: red;
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
                    background-color: var(--main-color);
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
    }
`;

export default AddNewDiv;
