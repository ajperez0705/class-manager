// Negative Images
import bullying from "../images/point-icons/bullying.png";
import rules from "../images/point-icons/breaking-rules.png";
import phone from "../images/point-icons/phone-use.png";

// Positive Images
import helping from "../images/point-icons/helping-others.png";
import work from "../images/point-icons/stellar-work.png";
import participation from "../images/point-icons/participation.png";

export const positiveCards = [
  {
    id: 1,
    image: work,
    name: "Helping Others",
  },
  {
    id: 2,
    image: helping,
    name: "Stellar Work",
  },
  {
    id: 3,
    image: participation,
    name: "Participation",
  },
];

export const negativeCards = [
  {
    id: 1,
    image: bullying,
    name: "Bullying Others",
  },
  {
    id: 2,
    image: rules,
    name: "Breaking Rules",
  },
  {
    id: 3,
    image: phone,
    name: "Phone Use",
  },
];
