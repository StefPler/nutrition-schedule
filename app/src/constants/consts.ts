import { FoodEntry } from "../types/foods";

export const breakfast: FoodEntry[] = [
  {
    id: 1,
    wFrequency: 7,
    category: "mixed",
    description: "αράβικη τοστ (χαμηλά λιπαρά τυρι + κοτοπουλο ψητό)\n φρούτο",
  },
];

export const lunch: FoodEntry[] = [
  {
    id: 1,
    wFrequency: 2,
    category: "legumes",
    description:
      "ρεβύθια με το ρύζι\n ψωμί ολικής\n σαλάτα εποχής\n 50 γρ τυρί (λίγα λιπαρά, μεχρι 14% αλλιώς 25 γρ)",
  },
  {
    id: 2,
    wFrequency: 2,
    category: "legumes",
    description:
      "γίγαντες στον φούρνο\n ψωμί ολικής\n σαλάτα εποχής\n 50 γρ τυρί (λίγα λιπαρά, μεχρι 14% αλλιώς 25 γρ)",
  },
  {
    id: 3,
    wFrequency: 2,
    category: "legumes",
    description:
      "μαυρομάτικα σαλάτα\n 2-3 μαξιμάδια\n 50 γρ τυρί (λίγα λιπαρά, μεχρι 14% αλλιώς 25 γρ)",
  },
  {
    id: 4,
    wFrequency: 1,
    category: "vegetarian",
    description: "μπάμιες\n τυρι\n ψωμί",
  },
  {
    id: 5,
    wFrequency: 1,
    category: "vegetarian",
    description: "μανητάρια / μπριαμ\n τυρί\n ψωμι",
  },
  {
    id: 6,
    wFrequency: 1,
    category: "vegetarian",
    description: "μελιτζάνες ιμαμ\n τυρί / γιαούρτι\n ψωμί",
  },
  {
    id: 7,
    wFrequency: 1,
    category: "vegetarian",
    description: "σπανακόρυζο\n  ψωμί\n τυρί",
  },
  {
    id: 8,
    wFrequency: 3,
    category: "white_meats",
    description:
      "2 μπιφτέκια (κοτόπουλο / γαλοπούλα)\n σαλάτα εποχής\n 2 κ.γ γιαούρτι",
  },
  {
    id: 9,
    wFrequency: 3,
    category: "white_meats",
    description: "κοτόπουλο στο φούρνο με λαχανικά\n σαλάτα\n τυρί",
  },
  {
    id: 10,
    wFrequency: 3,
    category: "white_meats",
    description: "μπουκιές κοτόπουλου με κάρυ\n ρύζι\n σαλάτα\n τυρί",
  },
  {
    id: 11,
    wFrequency: 1,
    category: "fish",
    description: "ψάρι επιλογής (σολωμός, φαγκρί ορ σαμθινγκ)\n σαλάτα",
  },
  {
    id: 12,
    wFrequency: 1,
    category: "fish",
    description: "τονοσαλάτα (100γρ κονσέρβα)\n ψωμί (τορτίγια) ή μακαρόνι",
  },
  {
    id: 13,
    wFrequency: 1,
    category: "mixed",
    description: "ομελέτα\n σαλάτα\n τυρί\n ψωμί",
  },
];

export const dinner: FoodEntry[] = [
  {
    id: 1,
    wFrequency: 3,
    category: "salad_meal",
    description: "κριτική / εποχιακή σαλάτα (φέτα / flair)",
  },
  {
    id: 2,
    wFrequency: 2,
    category: "repeat_lunch",
    description: "[ίδιο με μεσημέρι σε μικρότερη ποσότητα]",
  },
  {
    id: 3,
    wFrequency: 1,
    category: "white_meats",
    description: "3 καλαμάκι κοτόπουλο\n σαλάτα\n τυρί",
  },
  {
    id: 4,
    wFrequency: 1,
    category: "mixed",
    description: "ομελέτα\n σαλάτα\n τυρί\n ψωμί",
  },
];

export const snacks: FoodEntry[] = [
  {
    id: 1,
    wFrequency: 3,
    category: "nuts_n_fruits",
    description: "3 κ.γ ανάλατους, ωμούς ξηρούς καρπούς",
  },
  {
    id: 1,
    wFrequency: 4,
    category: "nuts_n_fruits",
    description: "μπάρα χωρίς ή με λίγη ζάχαρη έως 200 cal\n φρούτο (ίσως)",
  },
  {
    id: 1,
    wFrequency: 4,
    category: "dairy",
    description: "ρυζόγαλο / vitaline",
  },
  {
    id: 1,
    wFrequency: 3,
    category: "dairy",
    description: "γιαούρτι 1,5% - 2%\n 2 κ.γ φυστικοβούτυρο\n 1 κ.γ μέλι",
  },
];
