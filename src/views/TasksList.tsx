import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {addTask, deleteTask, fetchTasks, taskInfo} from "../utils/TasksListUtils.ts";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import "../styles/TasksList/TasksListView.scss"
import {TextField} from "@mui/material";
import TasksListElement from "../components/TasksList/TasksListElement.tsx"



function TasksList() {
    const [tasks_list, setTasksList] = useState<taskInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [list_reload, setListReload] = useState<boolean>(true);
    const [task_data, setTaskData] = useState<string>("");

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;

        setTaskData(value)
    }

    const handleNewTask = () => {
        setLoading(true);
        addTask(task_data)
            .finally(() => {
                setTaskData("")
                setLoading(false);
                setListReload(!list_reload);
            })
    }

    function handleDelete(id: string){
        deleteTask(id)
            .then(() => {
                setListReload(!list_reload)
            })
    }

    useEffect(() => {
        setLoading(true);
        fetchTasks()
            .then((result_list: taskInfo[]) => {
                setTasksList(result_list);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [list_reload]);

    if (loading) {
        return (
            <Container>
                <span>Cargando ...</span>
            </Container>
        );
    }

    return (
        <>
            <Container className="task-list-container">
                <h1>Lista de tareas</h1>

                <div className="new-task-container">
                    <TextField
                        required
                        margin="dense"
                        id="task"
                        name="task"
                        placeholder="Nueva tarea"
                        value={task_data}
                        fullWidth
                        onChange={handleFormChange}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleNewTask()
                        }}
                    >
                        Añadir
                    </Button>
                </div>

                <div className="list-body">
                    <Grid container spacing={2} direction="column">
                        <>
                            {tasks_list.map((item: taskInfo) => (
                                <TasksListElement
                                    key={item.id}
                                    id={item.id}
                                    action={item.action}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

export default TasksList;