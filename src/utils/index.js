import { productCategoryList } from "../constants"

export const getCategoryName = (categorySlug) => {
    if(!categorySlug) {
        return
    }

    const category = productCategoryList.find((productCategory) => {
        return productCategory.category === categorySlug
    })

    return category.name
}