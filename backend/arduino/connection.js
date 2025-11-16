import { SerialPort } from "serialport";

let arduino = null;

export function initSerial() {
    const runningInDocker = process.env.DOCKER_ENV === "true";

    if (runningInDocker) {
        console.log("Serial disabled → running in Docker");
        return;
    }

    if (process.env.USE_SERIAL !== "true") {
        console.log("Serial disabled (USE_SERIAL=false)");
        return;
    }

    const serialPath = process.env.SERIAL_PORT || "COM5";

    try {
        arduino = new SerialPort({ path: serialPath, baudRate: 9600 });

        arduino.on("open", () => {
            console.log(`SerialPort ${serialPath} opened`);
        });

        arduino.on("error", (err) => {
            console.error(`SerialPort error:`, err.message);
        });

    } catch (err) {
        console.error("Serial init error:", err.message);
    }
}

export { arduino };
