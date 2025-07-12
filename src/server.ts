import { Server } from "http";
import { connect } from "http2";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config()

let server: Server



const PORT = 5001;

async function main() {
    try {
        await mongoose.connect(
            "mongodb+srv://libraryApp:aIA2YInIMNxNkyge@cluster0.ptptzcl.mongodb.net/library_management_api?retryWrites=true&w=majority&appName=Cluster0"
            );
        
        console.log("Connected to mongodbusng mongooosde");

        server = app.listen(PORT, () => {
            console.log(`App listen in port ${PORT}`);
            
        } )
        
    } catch (error) {
        console.log("Database connection failed", error);
        
    }
}

main()