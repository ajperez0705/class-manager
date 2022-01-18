// Trophies
import moneyBag from "../images/trophies/money-bag.png";
import bomb from "../images/trophies/bomb.png";
import sword from "../images/trophies/sword.png";

export const trophies = [
  {
    id: 1,
    image: moneyBag,
    name: "Marvin Moneybags",
    className: "trophy-card-money",
    symbol: "a",
    description:
      "Marvin Moneybags allows you to chew gum in class for one week.",
    pointValue: "10",
    btnColor: "purple",
  },
  {
    id: 2,
    image: sword,
    name: "Stanley Swordington",
    className: "trophy-card-sword",
    symbol: "b",
    description:
      "Stanley Swordington allows you to pick from the class treasure chest.",
    pointValue: "20",
    btnColor: "blue",
  },
  {
    id: 3,
    image: bomb,
    name: "Bradley Bomberman",
    className: "trophy-card-bomb",
    symbol: "c",
    description:
      "Bradley Bomberman allows you to get rid of your lowest test score.",
    pointValue: "30",
    btnColor: "green",
  },
];
