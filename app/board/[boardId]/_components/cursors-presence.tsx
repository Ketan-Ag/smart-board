"use client"

import { memo } from "react"

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config" 
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./path";
import { colorToCSS } from "@/lib/utils";

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return(
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    );
};

const Drafts = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor : other.presence.pencilColor,
    }), shallow);

    return(
        <>
            {others.map(([key, other]) => {
                if(other.pencilDraft){
                    return(
                        <Path
                            key={key}
                            points={other.pencilDraft}
                            fill={other.penColor ? colorToCSS(other.penColor) : "#000"}
                            x={0}
                            y={0}
                        />
                    )
                }

                return null;
            })}
        </>
    )
}

export const CursorsPresence = memo(() => {
  return (
    <>
        <Drafts/>
        <Cursors/>
    </>
  )
})

CursorsPresence.displayName = "CursorsPresence";