export type categoryType = {
  id: string;
  name: string;
  is_hidden: boolean;
  parent_id;
  created_at: string;
  updated_at: string;
};

export type brandType = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type productType = {
  id: string;
  name: string;
  description: string;
  qty: number;
  qty_uom: number;
  final_unit_price: number;
  unit_discount_price: number;
  image_url: string;
  status: string;
  size: string;
  color: string;
  rating_score: 0;
  final_total_rating;
  category_id: string;
  brand_id: string;
  created_at: string;
  updated_at: string;
};
export type cartType = {
  id: string;
  status: string;
};

export type cartItemType = {
  id: string;
  qty: number;
  qty_uom: string;
  final_unit_price: number;
  unit_discount_pct: number;
  status: string;
  product_id: string;
};
