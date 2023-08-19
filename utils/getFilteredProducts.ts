import {productType, categoryType, brandType} from '../type/model';

export type FilterCriteria = {
  price: number[];
  color: string;
  size: string[];
  category: string[];
  brand: string[];
};

export default function getFilteredProducts(
  products: productType[],
  filterCriteria: FilterCriteria,
  categories: categoryType[],
  brands: brandType[]
): productType[] {
  const {color, size, category, price, brand} = filterCriteria;

  const categoryMapping = Object.fromEntries(
    categories
      .filter(cat => cat.parent_id === null)
      .map(cat => [cat.name.toLowerCase(), cat.id])
  );

  // console.log(categoryMapping);

  //Map category names to IDs
  const categoryId = (
    category.length > 0
      ? [...category].filter(catName => categoryMapping[catName.toLowerCase()])
      : []
  ) as string[];

  const brandMapping = Object.fromEntries(
    brands.map(brand => [brand.name.toLowerCase(), brand.id])
  );

  const brandId = (
    brand.length > 0
      ? [...brand].filter(brandName => brandMapping[brandName.toLowerCase()])
      : []
  ) as string[];
  console.log('brandId', brandId);
  //filter based on price range
  const filteredByPrice = products.filter(
    product =>
      product.final_unit_price &&
      product.final_unit_price >= price[0] &&
      product.final_unit_price <= price[1]
  );

  //filter based on color  (if selected) attribute not product.id
  const filteredByColor = color
    ? filteredByPrice.filter(product => product.color === color)
    : filteredByPrice;

  //filter based on sizes (if selected)
  const filteredBySizes = size
    ? filteredByColor.filter(product => size.includes(product.size))
    : filteredByColor;

  //filter based on categories (if selected)

  const filteredByCategories =
    categoryId.length > 0
      ? filteredBySizes.filter(product =>
          categoryId.includes(product.category_id)
        )
      : filteredBySizes;

  const filteredByBrands =
    brand.length > 0
      ? filteredByCategories.filter(product =>
          brandId.includes(product.brand_id)
        )
      : filteredByCategories;
  console.log('filteredByBrands', filteredByBrands);
  return filteredByBrands;
}
