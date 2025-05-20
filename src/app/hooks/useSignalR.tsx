// src/hooks/useSignalR.ts (or .js)
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import * as signalR from "@microsoft/signalr";

interface SignalRHookResult {
    connection: signalR.HubConnection | null;
    connectionId: string | null;
    error: Error | null;
    isConnected: boolean;
    startConnection: () => Promise<void>; // Function to initiate connection
    stopConnection: () => Promise<void>; // Optional: Function to stop manually
}

const useSignalR = (hubUrl: string): SignalRHookResult => {
    // State remains mostly the same
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    // Ref is still useful for accessing the latest connection instance in callbacks
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    // --- Function to Start the Connection ---
    const startConnection = useCallback(async () => {
        const currentConnection = connectionRef.current;
        if (!currentConnection) {
            console.error("SignalR connection object not initialized.");
            setError(new Error("SignalR connection object not initialized."));
            return;
        }

        // Prevent multiple start attempts if already connected or connecting
        if (currentConnection.state !== signalR.HubConnectionState.Disconnected) {
            console.warn(`SignalR connection is already in state: ${currentConnection.state}. Cannot start.`);
            return;
        }

        console.log("Attempting to start SignalR connection...");
        setError(null); // Clear previous errors before trying again
        try {
            console.log("current connection - ", currentConnection)
            await currentConnection.start();
            
            console.log("SignalR Connected. Connection ID:", currentConnection.connectionId);
            
            setIsConnected(true);
            setConnectionId(currentConnection.connectionId);

        } catch (err) {
            console.error("SignalR Connection Error during start: ", err);
            setError(err instanceof Error ? err : new Error(String(err)));
            setIsConnected(false);
            setConnectionId(null);
        }
    }, []); // No dependencies needed as it uses the ref

    // --- Function to Stop the Connection (Optional but good practice) ---
    const stopConnection = useCallback(async () => {
        const currentConnection = connectionRef.current;
        if (currentConnection && currentConnection.state === signalR.HubConnectionState.Connected) {
            console.log("Attempting to stop SignalR connection manually...");
            try {
                await currentConnection.stop();
                console.log("SignalR connection stopped manually.");
                // State updates (isConnected=false, connectionId=null) are handled by the 'onclose' handler
            } catch (err) {
                console.error("Error stopping SignalR connection:", err);
                setError(err instanceof Error ? err : new Error("Error stopping connection"));
            }
        } else {
            console.warn("SignalR connection is not connected or doesn't exist.");
        }
    }, []); // No dependencies needed as it uses the ref


    // --- Effect for Initialization and Cleanup ---
    useEffect(() => {
        if (!hubUrl) {
            console.error("SignalR Hub URL is not configured.");
            setError(new Error("SignalR Hub URL is not configured."));
            return;
        }

        if (connectionRef.current) {
            console.log("HubConnection already exists, skipping creation.");
            return;
        }

        console.log("Creating new SignalR HubConnection...");
        // Create the connection object only once
        const newConnection = new signalR.HubConnectionBuilder()
            .withHubProtocol(new signalR.JsonHubProtocol())
            .configureLogging(signalR.LogLevel.Debug) 
            .withUrl(hubUrl)
            // .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        setConnection(newConnection);
        connectionRef.current = newConnection; // Store in ref

        // --- Define Lifecycle Event Handlers ---
        // These handlers are attached when the connection is created
        // and manage state based on connection events.

        const handleReconnecting = (error?: Error) => {
            console.warn(`SignalR connection lost. Attempting to reconnect...`, error);
            setIsConnected(false);
            setError(error ?? new Error('Connection lost during reconnect attempt'));
        };

        const handleReconnected = (newConnectionId?: string) => {
            console.log(`SignalR connection reestablished. Connection ID: ${newConnectionId}`);
            setConnectionId(newConnectionId ?? null);
            setIsConnected(true);
            setError(null); // Clear errors on successful reconnect
        };

        const handleClose = (error?: Error) => {
            console.log("SignalR connection closed.", error);
            setIsConnected(false);
            setConnectionId(null);
            if (error) {
                setError(error);
            }
             // Optional: Decide if you want to nullify the connection object itself
             // setConnection(null);
             // connectionRef.current = null;
             // Or keep it to allow manual restart via startConnection()
        };

        newConnection.onreconnecting(handleReconnecting);
        newConnection.onreconnected(handleReconnected);
        newConnection.onclose(handleClose);

        // --- Cleanup on component unmount ---
        return () => {
            console.log("Cleaning up SignalR connection hook...");
            // Remove event handlers
            newConnection.off("reconnecting", handleReconnecting);
            newConnection.off("reconnected", handleReconnected);
            newConnection.off("close", handleClose);

            // Stop the connection if it's running
            if (newConnection.state !== signalR.HubConnectionState.Disconnected) {
                 newConnection.stop()
                    .then(() => console.log("SignalR connection stopped during cleanup."))
                    .catch(err => console.error("Error stopping SignalR connection during cleanup:", err));
            }
            connectionRef.current = null; // Clear the ref
        };
    }, [hubUrl]); // Re-run effect only if hubUrl changes

    // Return the connection state and the manual control functions
    return { connection, connectionId, error, isConnected, startConnection, stopConnection };
};

export default useSignalR;