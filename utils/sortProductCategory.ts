import {productType} from '../type/model';
export const sortProductCategory = (
  productCategory: productType[],
  option:
    | 'low to high'
    | 'high to low'
    | 'newest'
    | 'popular'
    | 'customer_review'
) => {
  switch (option) {
    case 'low to high':
      return productCategory
        .slice()
        .sort((a, b) => a.final_unit_price! - b.final_unit_price!);
    case 'high to low':
      return productCategory
        .slice()
        .sort((a, b) => b.final_unit_price! - a.final_unit_price!);
    case 'newest':
      return productCategory
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at!).getTime() -
            new Date(a.created_at!).getTime()
        );
    case 'popular':
      return productCategory
        .slice()
        .sort((a, b) => b.rating_score! - a.rating_score!);
    case 'customer_review':
      return productCategory
        .slice()
        .sort((a, b) => b.final_total_rating! - a.final_total_rating!);
    default:
      return productCategory;
  }
};
