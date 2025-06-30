import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBfPYXLxXDPqLfVL0WERNoirI9KVPY8p3w");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;