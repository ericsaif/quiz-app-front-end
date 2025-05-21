export interface SignalRHookResult {
    connection: signalR.HubConnection | null;
    connectionId: string | null;
    error: Error | null;
    isConnected: boolean;
    startConnection: () => Promise<void>; // Function to initiate connection
    stopConnection: () => Promise<void>; // Optional: Function to stop manually
}