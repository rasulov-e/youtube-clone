import axios from "axios";
import { url } from "./index";

export const leaveLike = (videoId) => axios.get(url + "/likes");
