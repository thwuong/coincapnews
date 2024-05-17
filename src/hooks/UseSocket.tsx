"use client";
import { useEffect, useState } from "react";
import { connectSocket } from "../socket/client";
function UseSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [stream, setStream] = useState<any>({});
    const [scInstance, setScInstance] = useState<WebSocket>();

    useEffect(() => {
        const socket = connectSocket();
        function onConnect(this: WebSocket) {
            setScInstance(this);
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }
        function getMessage(this: WebSocket, ev: MessageEvent<any>) {
            const streamData = JSON.parse(ev.data);
            setStream((preStream: any) => ({
                ...preStream,
                [streamData.data.s]: {
                    price: parseFloat(streamData.data.c),
                    change24: parseFloat(streamData.data.P),
                },
            }));
        }

        socket.onopen = onConnect;
        socket.onmessage = getMessage;

        return () => {
            socket.onclose = onConnect;
            socket.onclose = onDisconnect;
        };
    }, []);
    return {
        isConnected,
        stream,
        scInstance,
    };
}

export default UseSocket;
