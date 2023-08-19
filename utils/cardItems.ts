export type ItemData = {
  id: string;
  tag: string;
  title: string;
  subTitle: string;
  img: string;
  amount: number;
  discount?: number;
};

export const DATA: ItemData[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    tag: "New",
    title: "T-Shirt Sailing",
    subTitle: "Mango Boy",
    img: require("../assets/card-1.png"),
    amount: 10,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    tag: "-20%",
    title: "Evening Dress",
    subTitle: "Dorothy Perkins",
    img: require("../assets/card-2.png"),
    amount: 15,
    discount: 12,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    tag: "New",
    title: "Evening Dress",
    subTitle: "Dorothy Perkins",
    img: require("../assets/card-1.png"),
    amount: 0,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f62",
    tag: "-20%",
    title: "Evening Dress",
    subTitle: "Dorothy Perkins",
    img: require("../assets/card-2.png"),
    amount: 15,
    discount: 12,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    tag: "New",
    title: "Evening Dress",
    subTitle: "Dorothy Perkins",
    img: require("../assets/card-1.png"),
    amount: 0,
  },
];

export const DATA2: ItemData[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    tag: "-20%",
    title: "Evening Dress",
    subTitle: "Dorathy Perkins",
    img: require("../assets/sale_img_1.png"),
    amount: 15,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    tag: "-20%",
    title: "Sport Dress",
    subTitle: "Sitlly",
    img: require("../assets/sale_img_2.png"),
    amount: 15,
    discount: 12,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    tag: "New",
    title: "Evening Dress",
    subTitle: "Dorothy Perkins",
    img: require("../assets/card-1.png"),
    amount: 0,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f62",
    tag: "-20%",
    title: "Evening Dress",
    subTitle: "Dorothy Perkins",
    img: require("../assets/card-2.png"),
    amount: 21,
    discount: 19,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    tag: "New",
    title: "Evening Dress",
    subTitle: "Dorothy Perkins",
    img: require("../assets/card-1.png"),
    amount: 0,
  },
];
