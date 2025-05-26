export interface Category {

    categoryId: string,
    categoryName: string,
    subCategories: SubCategory[]
}

export interface SubCategory {

    subCategoryId: string,
    subCategoryName: string,
    categoryId: string
}