export const calcSalePrice = (listedPrice, promoType, promoValue) => {
    switch (promoType) {
        case 'price-value': {
            return Math.round(listedPrice - promoValue)
        }
        case 'percent': {
            return Math.round(listedPrice - (promoValue * listedPrice / 100))
        }
        default: return listedPrice
    }
}

export const calcPromoPercent = (listedPrice, promoType, promoValue) => {
    switch (promoType) {
        case 'price-value': {
            return Math.round(promoValue / listedPrice * 100)
        }
        case 'percent': {
            return promoValue
        }
        default: return 0
    }
}