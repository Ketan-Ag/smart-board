"use client"

import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"


import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import ConfirmModal from "./confirm-modal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"


interface ActionProps {
    children: React.ReactNode
    side?: DropdownMenuContentProps["side"]
    sideOffSet?: DropdownMenuContentProps["sideOffset"]
    id: string
    title: string
}


const Actions = ({
    children,
    side,
    sideOffSet,
    id,
    title
}: ActionProps) => {
    const {onOpen} = useRenameModal();

    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
            .then(() => toast.success("Link copied to clipboard"))
            .catch(() => toast.error("Failed to copy link"))
    };

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Board Deleted"))
            .catch(() => toast.error("Failed to delete board"));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffSet}
                className="w-60"
                onClick={(e) => { e.stopPropagation() }}
            >
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={()=>{onOpen(id, title)}}
                    className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete Board?"
                    description="This will delete board and all of its contents"
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button
                        variant="ghost"
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                        </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions