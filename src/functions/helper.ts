






export const discountPriceCalc = (onSale: boolean, discount: number, price: number) => {
  if(onSale && discount > 0){
    return price - price * discount / 100
  }
  return price   
}
  