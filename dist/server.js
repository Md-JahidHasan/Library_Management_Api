"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let server;
const PORT = 5001;
async function main() {
    try {
        await mongoose_1.default.connect("mongodb+srv://libraryApp:aIA2YInIMNxNkyge@cluster0.ptptzcl.mongodb.net/library_management_api?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to mongodbusng mongooosde");
        server = app_1.default.listen(PORT, () => {
            console.log(`App listen in port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Database connection failed", error);
    }
}
main();
