import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { getAllSharesByUserId } from "./api/share.api";
import { SHARE_TYPE } from "./_types/types";
import SharesList from "./_components/_list/SharesList";

export default async function Home() {
  // feeds
  const user_shares = await getAllSharesByUserId()
  console.log("shares:", user_shares)
  
  return (
    <div className="flex bg-zinc-50 font-sans dark:bg-black">
     
       <div className="text-center mx-auto flex flex-col justify-center">
        <div className="mx-auto ">
          <Tabs defaultValue="notes" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
               <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              {
                user_shares && <SharesList shares={user_shares} state="Note" />
              }
            </TabsContent>
            <TabsContent value="folders">
              {
                user_shares && <SharesList shares={user_shares} state="Folder"/>
              }
            </TabsContent>
            <TabsContent value="photos">
              {
                user_shares && <SharesList shares={user_shares} state="Photo" />
              }
            </TabsContent>
          </Tabs>
          </div>
      </div>
    </div>
  );
}
