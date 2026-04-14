import { axiosClient } from "./apiClient";


export const getTasks = async () => {
    try {
        const config = {
            url: `/tasks`,
            method: "get"
        };
        const res = await axiosClient.request(config);
        return res.data;
    } catch (err) {
        return err.response.data.message ?? "Can't get tasks"
    }
}

export const updateTask = async (id, data) => {
    try {
        const config = {
            url: `/tasks/${id}`,
            method: "put",
            data: data
        };
        const res = await axiosClient.request(config);
        return res.data;
    } catch (err) {
        return err.response.data.message ?? "Can't update task"
    }
}

export const addTask = async (data) => {
    try {
        const config = {
            url: `/tasks`,
            method: "post",
            data: data
        };
        const res = await axiosClient.request(config);
        return res.data;
    } catch (err) {
        return err.response.data.message ?? "Can't add task"
    }
}

export const deleteTask = async (id) => {
    try {
        const config = {
            url: `/tasks/${id}`,
            method: "delete"
        };
        const res = await axiosClient.request(config);
        return res.data;
    } catch (err) {
        return err.response.data.message ?? "Can't delete task"
    }
}