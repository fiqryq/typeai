import { ContentRender } from "@/components/layout/contentRender";
import { AddForm } from "@/components/layout/addForm";
import { TokenDrawer } from "@/components/layout/drawer";
export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-6 h-screen">
      <div className="md:col-span-2 p-5">
        <AddForm />
      </div>
      <div className="md:col-span-4 p-5">
        <ContentRender />
      </div>
      <TokenDrawer />
    </main>
  )
}
