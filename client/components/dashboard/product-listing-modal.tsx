'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function ProductModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    allowsInstallment: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 bg-green-0 text-primary-foreground shadow-lg rounded-full py-2 px-10 hover:bg-green-2 transition-colors"
      >
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 pt-6">
              <h2 className="text-2xl font-semibold text-foreground">Add New Product</h2>
              <div className="flex justify-between items-center">
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                  required
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowsInstallment"
                  name="allowsInstallment"
                  checked={formData.allowsInstallment}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <label htmlFor="allowsInstallment" className="ml-2 block text-sm text-foreground">
                  Allows Installment
                </label>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-green-0 text-white py-2 px-4 rounded-md hover:bg-green-2 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
