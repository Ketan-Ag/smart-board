"use client"

import Image from 'next/image'
import { useOrganization } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const EmptyBoards = () => {
  const router = useRouter();
  const {mutate, pending} = useApiMutation(api.board.create);
  const {organization} = useOrganization();

  const onClick = () => {
    if(!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled"
    })
    .then((id)=>{
      toast.success("Board Created");
      router.push(`/board/${id}`);
    })
    .catch(()=>toast.error("Failed to create board"))
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <Image src="/logo.svg" height={110} width={110} alt="Empty"/>
        <h2 className='text-2xl font-semibold mt-6'>
            Create your first board!
        </h2>
        <p className='text-muted-foreground text-sm mt-2'>
            Start by creating a board for your organisation
        </p>
        <div className="mt-6">
          <Button disabled={pending} onClick={onClick} size="lg">
            Create Board
          </Button>
        </div>
    </div>
  )
}

export default EmptyBoards