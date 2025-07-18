import { useRef, useState } from 'react';

export default function useTilt(maxTilt = 15) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setTilt({ x: y * maxTilt, y: x * maxTilt });
    }
    function handleMouseLeave() {
        setTilt({ x: 0, y: 0 });
    }
    return {
        ref,
        tilt,
        handleMouseMove,
        handleMouseLeave,
    };
} 