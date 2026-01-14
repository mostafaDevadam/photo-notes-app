"use client";

// hooks/useSocket.ts
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // Adjust to your NestJS server URL
const TYPING_TIMEOUT = 2000; // Stop typing indicator after 2s inactivity

export interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  content: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  emitEdit: (newContent: string) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  otherCursorIndices: Record<string, number>;
  otherTypingStates: Record<string, boolean>; // New: Per-user typing status
  activeUsers: string[]; // New: Track active users
  emitCursorIndex: (index: number) => void;
  //userID: string;
  emitTypingStart: () => void; // New
  emitTypingStop: () => void; // New
  setUserId: (val: any) => void;
}

type Props = {
    userId: any
}

export const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [otherCursorIndices, setOtherCursorIndices] = useState<Record<string, number>>({});
const [otherTypingStates, setOtherTypingStates] = useState<Record<string, boolean>>({}); // New
  const [userID, setUserID] = useState();
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For local typing timeout
  const [activeUsers, setActiveUsers] = useState<string[]>([]); // New

  console.log("useSocket userId:", userID)

  useEffect(() => {
    // Connect to Socket.IO server
    const socketInstance = io(SOCKET_SERVER_URL, {
       autoConnect: true,
    });

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    // Listen for join request and respond
    socketInstance.on('requestJoin', () => {
      socketInstance.emit('join', { userId: userID });
    });

    // Listen for other users joining
    socketInstance.on('userJoined', (data: { userId: string, name: string }) => {
      console.log("userJoined data:", data)
      if (data.userId !== userID) {
        setActiveUsers((prev) => [...new Set([...prev, data.name])]);
        console.log(`User joined: ${data.userId} ${data.name}`);
      }
    });

    // Listen for users leaving and clear their states
    socketInstance.on('userLeft', (data: { userId: string, name: string }) => {
      console.log("userLeft data:", data)
      if (data.userId !== userID) {
        setOtherCursorIndices((prev) => {
          const newState = { ...prev };
          delete newState[data.userId];
          return newState;
        });
        setOtherTypingStates((prev) => {
          const newState = { ...prev };
          delete newState[data.userId];
          return newState;
        });
        setActiveUsers((prev) => prev.filter((id) => id !== data.userId));
        console.log(`User left: ${data.userId} ${data.name}`);
      }
    });

    // Listen for updates
    socketInstance.on('updateContent', (newContent: string) => {
      setContent(newContent);
    });

    socketInstance.on('updateStyleBold', (bold: boolean) => {
      setIsBold(bold);
    });

    socketInstance.on('updateStyleItalic', (italic: boolean) => {
      setIsItalic(italic);
    });

    socketInstance.on('updateStyleUnderline', (underline: boolean) => {
      setIsUnderline(underline);
    });

    socketInstance.on('cursorUpdate', (data: { userId: string; index: number }) => {
      if (data.userId !== userID) {
        setOtherCursorIndices((prev) => ({ ...prev, [data.userId]: data.index }));
        // Ensure active if cursor moves
        setActiveUsers((prev) => [...new Set([...prev, data.userId])]);
      }
    });

    // New: Listen for typing updates
    socketInstance.on('typingUpdate', (data: { userId: string; isTyping: boolean }) => {
      if (data.userId !== userID) {
        setOtherTypingStates((prev) => ({ ...prev, [data.userId]: data.isTyping }));
        // Ensure active on typing
        setActiveUsers((prev) => [...new Set([...prev, data.userId])]);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    setSocket(socketInstance);
    socketRef.current = socketInstance;

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const emitEdit = useCallback((newContent: string) => {
    if (socketRef.current) {
      socketRef.current.emit('edit', newContent);
    }
  }, []);

  const toggleBold = useCallback(() => {
    const newBold = !isBold;
    setIsBold(newBold);
    if (socketRef.current) {
      socketRef.current.emit('bold', newBold);
    }
  }, [isBold]);

  const toggleItalic = useCallback(() => {
    const newItalic = !isItalic;
    setIsItalic(newItalic);
    if (socketRef.current) {
      socketRef.current.emit('italic', newItalic);
    }
  }, [isItalic]);

  const toggleUnderline = useCallback(() => {
    const newUnderline = !isUnderline;
    setIsUnderline(newUnderline);
    if (socketRef.current) {
      socketRef.current.emit('underline', newUnderline);
    }
  }, [isUnderline]);

  const emitCursorIndex = useCallback((index: number) => {
    if (socketRef.current) {
      socketRef.current.emit('cursorUpdate', { userId: userID, index });
    }
  }, [userID]);

  // New: Typing emitters
  const emitTypingStart = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('typingStart', { userId: userID, isTyping: true });
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => emitTypingStop(), TYPING_TIMEOUT);
  }, [userID]);

  const emitTypingStop = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('typingStop', { userId: userID, isTyping: false });
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, [userID]);

  return {
    socket,
    isConnected,
    content,
    isBold,
    isItalic,
    isUnderline,
    emitEdit,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    otherCursorIndices,
    otherTypingStates,
    activeUsers, // Exposed
    emitCursorIndex,
    
    emitTypingStart,
    emitTypingStop,
    setUserId: setUserID,
  };
};