// All 8 farm activities. Each activity is a page built from this data.
// Put your real photos in /public/activities/ with the filenames below.

export const activities = [
  {
    slug: "pruning",
    title: "Pruning",
    tagline: "Keeping mango trees healthy and strong",
    image: "/activities/pruning.jpg",
    intro:
      "Pruning means cutting off dead, sick, or extra branches. This keeps our mango trees healthy and helps them give more fruit.",
    points: [
      "Lets more sunlight and air reach the tree.",
      "Removes sick branches so disease does not spread.",
      "Helps strong new branches grow.",
      "Keeps the tree in a good shape for easy picking.",
    ],
  },
  {
    slug: "mulching",
    title: "Mulching",
    tagline: "Protecting and feeding the soil naturally",
    image: "/activities/mulching.jpg",
    intro:
      "We cover the soil around each tree with leaves and natural waste. This keeps the soil moist and healthy.",
    points: [
      "Keeps water in the soil, so we use less water.",
      "Stops weeds from growing, with no chemicals.",
      "Keeps the soil cool for healthy roots.",
      "Turns into natural food for the soil over time.",
    ],
  },
  {
    slug: "irrigation",
    title: "Irrigation",
    tagline: "Drip watering, no waste",
    image: "/activities/irrigation.jpg",
    intro:
      "We use drip irrigation. This gives the right amount of water straight to each tree's roots.",
    points: [
      "Water goes right to the roots, so very little is wasted.",
      "Saves a lot of water compared to normal watering.",
      "Keeps the soil evenly wet and trees healthy.",
      "We can mix plant food into the water too.",
    ],
  },
  {
    slug: "pest-management",
    title: "Pest Management & Organic Pesticides",
    tagline: "Natural protection, no harmful chemicals",
    image: "/activities/pest-management.jpg",
    intro:
      "We keep insects away using natural and organic sprays. We never use harmful chemical pesticides.",
    points: [
      "We use neem and other natural sprays.",
      "We let helpful insects protect the trees.",
      "We check the trees often to catch problems early.",
      "The fruit stays safe and clean for your family.",
    ],
  },
  {
    slug: "organic-fertilizers",
    title: "Organic Fertilizers",
    tagline: "Feeding trees the natural way",
    image: "/activities/organic-fertilizers.jpg",
    intro:
      "We feed each tree with Gaumutra from our own Gir cows, natural manure and vermicompost. All natural, no chemicals.",
    points: [
      "Gaumutra (cow urine) from our own Gir cows.",
      "Natural manure and vermicompost.",
      "Makes the soil rich and healthy for many years.",
      "Gives mangoes a sweet taste and good smell.",
    ],
  },
  {
    slug: "green-manure",
    title: "Green Manure",
    tagline: "Green plants that feed the soil",
    image: "/activities/green-manure.jpg",
    intro:
      "We grow special green plants and mix them back into the soil. This adds natural food to the soil.",
    points: [
      "Adds natural nitrogen to the soil.",
      "Makes the soil better at holding water.",
      "We need fewer outside fertilizers.",
      "Helps us do true organic farming.",
    ],
  },
  {
    slug: "mango-tree-grafting",
    title: "Mango Tree Grafting",
    tagline: "Making strong, true Kesar trees",
    image: "/activities/mango-tree-grafting.jpg",
    intro:
      "Grafting joins a good Kesar branch to a strong root. This makes sure every tree gives real, tasty Kesar mangoes.",
    points: [
      "Every tree gives real Kesar mangoes.",
      "Trees give fruit faster than seed-grown trees.",
      "Strong roots and good fruit in one tree.",
      "Makes strong and healthy young plants.",
    ],
  },
  {
    slug: "grafted-sapling-plantation",
    title: "Grafted Mango Sapling Plantation",
    tagline: "Planting strong saplings for more fruit",
    image: "/activities/grafted-sapling-plantation.jpg",
    intro:
      "We plant young grafted trees with the right space between them. This helps them grow well and give more fruit.",
    points: [
      "Right spacing helps trees grow healthy.",
      "Strong young trees give good fruit.",
      "Easy to care for, prune and pick.",
      "Many farmers nearby have followed our way.",
    ],
  },
];

export const getActivity = (slug) => activities.find((a) => a.slug === slug);