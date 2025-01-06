import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import "../../styles/TasksList/TaskElement.scss"

function TasksListElement({id,action, handleDelete}){
    function deleteListItem() {
        handleDelete(id)
    }

    return (
        <div className="task-list-element">
            <div>
                <span className="item-name">{action}</span>
            </div>
            <div>
                <IconButton
                    onClick={deleteListItem}
                    color="error"
                    aria-label="delete"
                    size="large"
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

TasksListElement.propTypes = {
    id: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default TasksListElement;