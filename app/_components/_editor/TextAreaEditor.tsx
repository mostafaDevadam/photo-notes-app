"use client";

import { useSocket } from '@/app/_hooks/useSocket';
import { getID } from '@/app/_lib/id';
import { USER_TYPE } from '@/app/_types/types';
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
//import caretPosition from 'textarea-caret-position';
import caretPosition from 'textarea-caret';

// Simple hash function to generate consistent color per userId
const getUserColor = (userId: string): string => {
    let hash = 0;
    for (let i = 0; i < userId!!.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        '#FF6B6B', // Red
        '#4ECDC4', // Teal
        '#45B7D1', // Blue
        '#96CEB4', // Mint
        '#FFEAA7', // Yellow
        '#DDA0DD', // Plum
        '#98D8C8', // Aquamarine
        '#F7DC6F', // Gold
        '#BB8FCE', // Lavender
        '#85C1E9', // Sky Blue
    ];
    return colors[Math.abs(hash) % colors.length];
};

const getUserAvatarUrl = (): string => {
    return `https://avatars.dicebear.com/api/avataaar`;
};

// Generate a simple display name based on userId hash (e.g., "Alex", "Jordan")
const getDisplayName = (userId: string): string => {
    const names = [
        'Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Jamie', 'Quinn', 'Avery', 'Cameron'
    ];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return names[Math.abs(hash) % names.length];
};


type Props = {
    userId: any
    noteContent: string
    members: USER_TYPE[]
}
export default function TextAreaEditor({ userId,noteContent, members }: Props) {
    console.log("userId:", userId)
    const { content, isBold, isItalic, isUnderline, emitEdit, toggleBold, toggleItalic, toggleUnderline, isConnected,
        otherCursorIndices,
        emitCursorIndex,
        emitTypingStart,
        emitTypingStop,
        otherTypingStates,
        activeUsers,
        setUserId,
        socket,

    } = useSocket();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [lastLocalCursor, setLastLocalCursor] = useState(0);
    // Compute local user color for consistent cursor styling
    const localColor = getUserColor(userId as string);
    const avatarUrl = getUserAvatarUrl();
    const localDisplayName = getDisplayName(userId);
    const containerRef = useRef(null);
    const mirrorRef = useRef<any | null>(null);
    const resizeObserverRef = useRef<any | null>(null);
    const [textareaBounds, setTextareaBounds] = useState<DOMRect | null>(null); // New: Track textarea bounds for clamping

    useEffect(() => {
        setUserId(userId)
          
        if(socket){
            socket.on('requestJoin', () => {
                socket.emit('join', { userId });
            })
        }

      
    
}, [userId, socket])

useEffect(() => {

      return(() => {
            if(socket){
                socket.emit('onLeave', { userId });
            }
        })

}, [])



const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    emitEdit(newContent);
    // Trigger selectionchange indirectly via setTimeout for immediate rebuild
    handleInput(e)

};

// Handle keydown for immediate cursor updates during typing
const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Emit cursor position immediately for typing keys (letters, numbers, space, etc.)
    // Skip navigation keys to avoid spam
    const isTypingKey =
        (e.key.length === 1) || // Single char (a-z, 0-9, symbols)
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Enter' ||
        e.key === 'Tab' ||
        e.key === 'Space';

    if (isTypingKey && textareaRef.current) {
        const idx = textareaRef.current.selectionStart;
        setLastLocalCursor(idx);
        emitCursorIndex(idx);
        emitTypingStart(); // Start typing indicator
    }
}, [emitCursorIndex, emitTypingStart]);


// Preserve local cursor position after remote content updates (best-effort)
useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
        const targetPos = Math.min(lastLocalCursor, content.length);
        ta.setSelectionRange(targetPos, targetPos);
    }
}, [content, lastLocalCursor]);

// Debounced cursor index emission and local tracking
useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleSelectionChange = () => {
        const ta = textareaRef.current;
        if (ta) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const idx = ta.selectionStart;
                setLastLocalCursor(idx);
                emitCursorIndex(idx);
                emitTypingStop(); // Stop typing on selection change (e.g., mouse)
            }, 100); // Debounce to reduce network spam
        }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
        if (timeout) clearTimeout(timeout);
    };
}, [emitCursorIndex, emitTypingStop]);

// Track textarea bounds for clamping overlays
useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
        const updateBounds = () => setTextareaBounds(ta.getBoundingClientRect());
        updateBounds(); // Initial
        window.addEventListener('resize', updateBounds);
        return () => window.removeEventListener('resize', updateBounds);
    }
}, [content]); // Recompute on content change (may affect size)

// Compute pixel positions for other cursors
const otherCursorPositions = useMemo(() => {
    const positions: Record<string, { top: number; left: number }> = {};
    const ta = textareaRef.current;
    if (ta && textareaBounds) {
        const paddingLeft = 10; // Match textarea padding
        const paddingTop = 10;
        const innerWidth = textareaBounds.width - (paddingLeft * 2);
        const innerHeight = textareaBounds.height - (paddingTop * 2);
        const scrollTop = ta.scrollTop;
        const scrollLeft = ta.scrollLeft;

        Object.entries(otherCursorIndices).forEach(([id, idx]) => {
            if (idx >= 0 && idx <= content.length) {
                const rawPos = caretPosition(ta, idx);
                // Adjust for scroll to get visible position
                let pos = {
                    top: rawPos.top - scrollTop,
                    left: rawPos.left - scrollLeft,
                };
                // Clamp to inner textarea bounds (prevent overflow)
                pos.left = Math.max(paddingLeft, Math.min(pos.left, innerWidth - 2)); // -2 for cursor width
                pos.top = Math.max(paddingTop, Math.min(pos.top, innerHeight - 20)); // -20 for cursor height
                positions[id] = pos;
            }
        });
    }
    return positions;
}, [content, otherCursorIndices, textareaBounds]);

// Optional: Apply styles to the textarea
const textareaStyle = {
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderline ? 'underline' : 'none',
    caretColor: localColor,
    caretWidth: '20px',
    caretShape: 'bar',
} as React.CSSProperties;





// Handle onChange to update value if controlled
const handleInput = (e: any) => {
    // Trigger selectionchange indirectly via setTimeout for immediate rebuild
    setTimeout(() => {
        if (mirrorRef.current) {
            const event = new Event('selectionchange');
            document.dispatchEvent(event);
        }
    }, 0);
};
/*
    useEffect(() => {
        const tx = document.getElementById('textarea') as HTMLTextAreaElement;
        const containerEl = document.getElementById('container') as HTMLDivElement;
        const mirroredEle = document.getElementById('mirror') as HTMLDivElement;
 
        if (!mirroredEle) return
 
        tx.setSelectionRange(0, 0);
        tx.scrollTop = 0;
 
        //const mirroredEle = document.createElement('div');
        mirroredEle.textContent = tx.value;
        mirroredEle.classList.add('container__mirror');
        containerEl.prepend(mirroredEle);
 
        const textareaStyles = window.getComputedStyle(tx);
        [
            'border',
            'boxSizing',
            'fontFamily',
            'fontSize',
            'fontWeight',
            'letterSpacing',
            'lineHeight',
            'padding',
            'textDecoration',
            'textIndent',
            'textTransform',
            'whiteSpace',
            'wordSpacing',
            'wordWrap',
        ].forEach((property: any) => {
            mirroredEle.style[property] = textareaStyles[property];
        });
        mirroredEle.style.borderColor = 'transparent';
 
        const parseValue = (v: any) => v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0;
        const borderWidth = parseValue(textareaStyles.borderWidth);
 
        const ro = new ResizeObserver((entries) => {
            mirroredEle.style.width = `${tx.clientWidth + 2 * borderWidth}px`;
            mirroredEle.style.height = `${tx.clientHeight + 2 * borderWidth}px`;
        })
 
        ro.observe(tx);
 
        tx.addEventListener('scroll', () => {
            mirroredEle.scrollTop = tx.scrollTop;
        });
 
        const handleSelectionChange = () => {
            if (document.activeElement !== tx) {
                return;
            }
            const cursorPos = tx.selectionStart;
            const textBeforeCursor = tx.value.substring(0, cursorPos);
            const textAfterCursor = tx.value.substring(cursorPos);
 
            const pre = document.createTextNode(textBeforeCursor);
            const post = document.createTextNode(textAfterCursor);
            const caretEle = document.createElement('span');
            caretEle.classList.add('container__cursor');
            caretEle.innerHTML = '&nbsp;';
 
            mirroredEle.innerHTML = '';
            mirroredEle.append(pre, caretEle, post);
        };
 
        document.addEventListener('selectionchange', handleSelectionChange);
 
 
 
    }, [])
*/
return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Collaborative Text Editor</h1>
        <div style={{ marginBottom: '10px' }}>
            Connection Status: {isConnected ? 'Connected' : 'Disconnected'} |
            Your Name: <span style={{ color: localColor, fontWeight: 'bold' }}>{localDisplayName}</span> |
            Your Color: <span style={{ color: localColor }}>●</span> |
            Your Avatar: <img src={avatarUrl} alt="Your Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', verticalAlign: 'middle' }} />
           
            {/* Debug: Active Users */}
            <div style={{ marginTop: '5px', fontSize: '12px', color: '#888' }}>
                Active Users: {activeUsers.length} (IDs: {activeUsers.slice(0, 3).join(', ')}{activeUsers.length > 3 ? '...' : ''})
            </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
            Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
        </div>
        <div style={{ marginBottom: '10px' }}>
            <button onClick={toggleBold} style={{ marginRight: '10px', fontWeight: isBold ? 'bold' : 'normal' }}>
                Bold {isBold ? 'ON' : 'OFF'}
            </button>
            <button onClick={toggleItalic} style={{ marginRight: '10px', fontStyle: isItalic ? 'italic' : 'normal' }}>
                Italic {isItalic ? 'ON' : 'OFF'}
            </button>
            <button onClick={toggleUnderline} style={{ marginRight: '10px', textDecoration: isUnderline ? 'underline' : 'none' }}>
                Underline {isUnderline ? 'ON' : 'OFF'}
            </button>
        </div>

        <div ref={containerRef} id="container" className="custom-textarea-container"
            style={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                overflow: 'hidden', // Clip overlays to stay inside textarea bounds
                border: '1px solid #ccc', // Match textarea border
                borderRadius: '4px',
            }}
        >

            <textarea

                id="textarea"
                name="content"
                ref={textareaRef}
                value={content}
                defaultValue={noteContent}
                onChange={handleContentChange}
                onKeyDown={handleKeyDown} // Added for immediate typing cursor sync
                placeholder="Start editing here..."
                style={{
                    ...textareaStyle,
                    width: '100%',
                    height: '400px',
                    padding: '10px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '4px',
                    resize: 'vertical',
                    position: 'relative',
                    zIndex: 1,
                }}
            />
        </div>

        <div>
            {Object.entries(otherCursorPositions).map(([id, pos]) => {
                const color = getUserColor(userId);
                const isTyping = otherTypingStates[id] || false;
                return (
                    <div key={id} style={{ position: 'relative' }}>
                        <div
                            key={id}
                            style={{
                                position: 'absolute',
                                top: `${pos.top}px`,
                                left: `${pos.left}px`,
                                width: isTyping ? '4px' : '3px', // Wider when typing for emphasis
                                height: '20px', // Approximate line height
                                backgroundColor: color,
                                pointerEvents: 'none',
                                zIndex: 10,
                                borderLeft: '2px solid transparent',
                                borderRadius: isTyping ? '2px' : '1px',
                                // Animation: Blinking effect (fade in/out opacity)

                                animation: isTyping ? 'blinkFast 0.5s infinite' : 'blink 1s infinite',
                            }}
                            title={`Other user cursor (ID: ${id.slice(0, 8)}...) at position ${otherCursorIndices[id]} (Color: ${color})`} />

                        {/* Typing Indicator: Small pulsing dot below cursor */}

                        {isTyping && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: `${pos.top + 22}px`, // Below cursor line
                                    left: `${pos.left - 4}px`, // Centered on cursor
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    pointerEvents: 'none',
                                    zIndex: 11,
                                    animation: 'pulseDot 1s infinite',
                                }}
                            />
                        )}

                        {/* User Avatar: Small circular image next to cursor */}
                        <img
                            src={avatarUrl}
                            alt={`User ${userId.slice(0, 8)}... avatar`}
                            style={{
                                position: 'absolute',
                                top: `${Math.max(0, pos.top - 500)}px`, // Clamp top to 0
                                left: `${Math.min(pos.left + 4, textareaBounds?.width || 0 - 24)}px`, // Clamp right edge
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: `2px solid ${color}`,
                                pointerEvents: 'none',
                                zIndex: 12,
                                animation: isTyping ? 'pulseAvatar 2s infinite' : 'none', // Subtle pulse when typing
                            }}
                            onError={(e) => {
                                // Fallback to initials if avatar fails to load
                                e.currentTarget.style.display = 'none';
                                const fallback = document.createElement('div');
                                fallback.style.position = 'absolute';
                                fallback.style.top = `${Math.max(0, pos.top - 32)}px`;
                                fallback.style.left = `${Math.min(pos.left + 4, textareaBounds?.width || 0 - 24)}px`;
                                fallback.style.width = '24px';
                                fallback.style.height = '24px';
                                fallback.style.borderRadius = '50%';
                                fallback.style.border = `2px solid ${color}`;
                                fallback.style.backgroundColor = color;
                                fallback.style.color = 'white';
                                fallback.style.fontSize = '10px';
                                fallback.style.fontWeight = 'bold';
                                fallback.style.display = 'flex';
                                fallback.style.alignItems = 'center';
                                fallback.style.justifyContent = 'center';
                                fallback.style.pointerEvents = 'none';
                                fallback.style.zIndex = '12';
                                fallback.textContent = id.slice(0, 1).toUpperCase();
                                e.currentTarget.parentNode?.appendChild(fallback);
                            }}


                        />
                        {/* Typing Name Label: Small bubble with name when typing */}
                        {isTyping && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: `${Math.max(0, pos.top - 16)}px`, // Clamp top
                                    left: `${Math.min(pos.left + 32, textareaBounds?.width || 0 - 100)}px`, // Clamp right (approx label width)
                                    padding: '4px 8px',
                                    backgroundColor: color,
                                    color: 'white',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none',
                                    zIndex: 13,
                                    maxWidth: '100px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    animation: 'fadeIn 0.3s ease-out',
                                }}
                            >
                                {localDisplayName} typing...
                            </div>
                        )}



                    </div>
                )
            })}
            <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        @keyframes blinkFast {
          0%, 30% { opacity: 1; }
          31%, 100% { opacity: 0.3; }
        }
        @keyframes pulse {
          0%, 100% { width: 2px; }
          50% { width: 4px; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes pulseAvatar {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }


      `}</style>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                Changes are broadcast to all connected clients in real-time. Styles apply to the entire textarea content.
            </p>

            <div className='flex justify-end mt-3'>
                
            </div>
        </div>
    </div>
);
}