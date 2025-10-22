import { ShoppingCart, MessageCircle, CheckCircle, Info } from "lucide-react";

interface PurchaseSectionProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  totalValue: number;
  currentPrice: number;
  currentSize: any;
  onWhatsAppClick: () => void;
  isMobile?: boolean;
  isSetBased?: boolean;
  setMultiplier?: number;
}

export function PurchaseSection({
  quantity,
  onQuantityChange,
  totalValue,
  currentPrice,
  currentSize,
  onWhatsAppClick,
  isMobile = false,
  isSetBased = false,
  setMultiplier = 1
}: PurchaseSectionProps) {
  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    onQuantityChange(Math.max(1, value));
  };

  const totalMagnets = quantity * setMultiplier;

  return (
    <div className="space-y-6">
      {/* Set-based info banner */}
      {isSetBased && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-rose-500 mb-1">Calendar Magnets - Sold in Sets</p>
            <p className="text-rose-500">
              Each set contains <span className="font-bold">{setMultiplier} magnets</span> (1 for each month). 
              Quantity represents the number of sets you want to order.
            </p>
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-neutral-800 text-md flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-rose-500" />
          {isSetBased ? 'Sets:' : 'Quantity:'}
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-beige-200 rounded-2xl overflow-hidden bg-beige-50">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityInput}
              min="1"
              className="p-2 min-w-[4rem] text-center font-semibold border-none outline-none focus:bg-rose-50/30 transition-colors duration-200 bg-transparent"
            />
          </div>
          <div className="text-sm text-neutral-700">
            {isSetBased && (
              <span className="bg-lavender-100 text-lavender-700 px-3 py-1.5 rounded-full text-xs font-medium">
                = {totalMagnets} magnets total
              </span>
            )}
            {!isSetBased && quantity > 10 && (
              <span className="bg-sage-100 text-sage-600 px-3 py-1.5 rounded-full text-xs font-medium">
                Bulk Order Discount Available!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Total Value Display */}
      <div className="bg-gradient-to-br from-rose-50 to-lavender-50 rounded-3xl p-6 border-2 border-rose-200/50 shadow-soft">
        <div className="flex justify-between items-center mb-2">
          <span className="text-neutral-700 font-semibold text-lg">Total Value:</span>
          <div className="text-right">
            <div className="text-lg text-neutral-400 line-through">
              ₹{(totalValue * 1.25).toFixed(2)}
            </div>
            <span className="text-3xl font-bold text-neutral-800">₹{totalValue.toFixed(2)}</span>
          </div>
        </div>
        <div className="text-sm text-neutral-600 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-sage-500" />
          {isSetBased ? (
            <>
              {quantity} {quantity === 1 ? 'set' : 'sets'} × {currentSize?.name || 'Size'} (₹{currentPrice.toFixed(2)} per set) = {totalMagnets} magnets
            </>
          ) : (
            <>
              {quantity} × {currentSize?.name || 'Size'} (₹{currentPrice.toFixed(2)} each)
            </>
          )}
        </div>
        <div className="text-sm text-green-600 font-bold mt-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          💰 You're saving ₹{(totalValue * 0.25).toFixed(2)} with this order!
        </div>
      </div>

      {/* Action Buttons - Desktop only */}
      {!isMobile && (
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="group relative overflow-hidden bg-rose-400 hover:bg-rose-500 text-white rounded-2xl p-4 font-bold text-md transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg flex items-center justify-center gap-3">
            <ShoppingCart className="h-6 w-6" />
            Buy Now
          </button>
          <button
            onClick={onWhatsAppClick}
            className="group bg-sage-400 hover:bg-sage-500 text-white rounded-2xl p-4 font-bold text-md transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg flex items-center justify-center gap-3"
          >
            <MessageCircle className="h-6 w-6" />
            WhatsApp Order
          </button>
        </div>
      )}
    </div>
  );
}

// Mobile Sticky Footer Component
export function MobileStickyFooter({
  totalValue,
  onWhatsAppClick,
  isSetBased = false,
  totalMagnets = 0
}: {
  totalValue: number;
  onWhatsAppClick: () => void;
  isSetBased?: boolean;
  totalMagnets?: number;
}) {
  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-beige-50/95 backdrop-blur-sm border-t border-beige-200 p-4 z-40 shadow-soft">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <div className="text-sm text-neutral-600">
              Total{isSetBased && totalMagnets > 0 ? ` (${totalMagnets} magnets)` : ''}:
            </div>
            <div className="text-xl font-bold text-neutral-800">₹{totalValue.toFixed(2)}</div>
          </div>
          <button
            onClick={onWhatsAppClick}
            className="bg-sage-400 hover:bg-sage-500 text-white rounded-2xl px-6 py-3 font-bold flex items-center gap-2 transition-all duration-300 shadow-soft"
          >
            <MessageCircle className="h-5 w-5" />
            Order Now
          </button>
          <button className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-2xl px-6 py-3 font-bold transition-all duration-300 shadow-soft">
            Buy Now
          </button>
        </div>
      </div>
      <div className="lg:hidden h-20"></div>
    </>
  );
}
