import ProductModal from "@/components/product-modal";

export default function ListingPage() {
  return (
    <div className="pt-6 px-10">
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl">Your products</h1>
    <ProductModal/>
    </div>
    </div>
  )
}
