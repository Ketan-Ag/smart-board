import { Kalam } from "next/font/google";
import ContenetEditable, {ContentEditableEvent} from "react-contenteditable";

import { cn, colorToCSS } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnWidth = width * scaleFactor;
    const fontSizeBasedOnHeight = height * scaleFactor;

    return Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize);
}

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor
} : TextProps) => {

    const {x, y, width, height, fill, value} = layer;

    const updateValue = useMutation((
        {storage},
        newValue: string
    ) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    },[])

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }

    return(
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            }}
        >
            <ContenetEditable 
                html={value || "Hello World"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                    font.className
                )}
                style={{
                    fontSize: calculateFontSize(width, height),
                    color: fill ? colorToCSS(fill) : "#000"
                }}
            />
        </foreignObject>
    )
}