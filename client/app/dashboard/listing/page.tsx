import ProductModal from "@/components/dashboard/product-listing-modal";

export default function ListingPage() {
  return (
    <div>
      <div className="flex items-cente pl-5">
        <h1 className="font-semibold text-2xl">Your products</h1>
        <ProductModal/>\
      </div>
    </div>
  )
}
