import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/app/actions'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative bg-muted">
          {product.imageUrls?.[0] ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-indigo-600">
            ₦{(product.price / 100).toFixed(2)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ₦{(product.compareAtPrice / 100).toFixed(2)}
            </span>
          )}
        </div>
        <Button
          className="w-full mt-3"
          onClick={async () => {
            await addToCart(product.id, 1)
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}