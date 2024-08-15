"use client"

import { useOthers, useSelf } from "@/liveblocks.config";

import UserAvatar from "./user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USER = 2;

const Participants = () => {

  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USER;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        <div className="flex gap-x-2">
          {users.slice(0, MAX_SHOWN_USER)
            .map(({connectionId, info}) => {
              return(
                <UserAvatar
                  borderColor={connectionIdToColor(connectionId)}
                  key={connectionId}
                  src = {info?.avatar}
                  name={info?.name}
                  fallback={info?.name?.[0] || "T"}
                />
              )
          })}

          {currentUser && (
            <UserAvatar 
            borderColor={connectionIdToColor(currentUser.connectionId)}
              src={currentUser.info?.avatar}
              name={`${currentUser.info?.name} (You)`}
              fallback={currentUser.info?.name?.[0]}
            />
          )}

          {hasMoreUsers && (
            <UserAvatar 
              name={`${users.length - MAX_SHOWN_USER} more`}
              fallback={`+${users.length - MAX_SHOWN_USER}`}
            />
          )}
        </div>
    </div>
  )
}

export default Participants;

export const ParticipantsSkeleton = () => {
  return(
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full w-full bg-muted"/>
    </div>
  )
}