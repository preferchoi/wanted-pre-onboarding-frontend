import axios from "axios";

export const instance = axios.create({
    baseURL: "http://www.pre-inboarding-selection-task.shop",
    headers: {"Content-Type": "application/json",},
})