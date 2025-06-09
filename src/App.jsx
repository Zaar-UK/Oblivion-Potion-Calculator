
import { useState, useMemo } from 'react'
import './App.css'

// Oblivion ingredients database with effects
const INGREDIENTS = [
  { name: "Alkanet Flower", effects: ["Restore Intelligence", "Resist Poison", "Light", "Damage Fatigue"] },
  { name: "Aloe Vera Leaves", effects: ["Restore Fatigue", "Restore Health", "Damage Magicka", "Invisibility"] },
  { name: "Ambrosia", effects: ["Restore Health", "Damage Fatigue", "Damage Luck", "Fortify Health"] },
  { name: "Arrowroot", effects: ["Restore Agility", "Damage Luck", "Fortify Strength", "Burden"] },
  { name: "Bergamot Seeds", effects: ["Restore Fatigue", "Dispel", "Damage Magicka", "Silence"] },
  { name: "Blackberry", effects: ["Restore Fatigue", "Resist Shock", "Fortify Endurance", "Restore Health"] },
  { name: "Bloodgrass", effects: ["Chameleon", "Resist Paralysis", "Burden", "Fortify Health"] },
  { name: "Boar Meat", effects: ["Restore Health", "Damage Speed", "Fortify Health", "Burden"] },
  { name: "Cairn Bolete Cap", effects: ["Restore Health", "Damage Intelligence", "Resist Paralysis", "Shock Damage"] },
  { name: "Carrot", effects: ["Restore Fatigue", "Night Eye", "Fortify Intelligence", "Damage Endurance"] },
  { name: "Cinnabar Polypore Red Cap", effects: ["Restore Magicka", "Damage Health", "Reflect Spell", "Resist Disease"] },
  { name: "Cinnabar Polypore Yellow Cap", effects: ["Restore Stamina", "Damage Health", "Burden", "Fire Shield"] },
  { name: "Clannfear Claws", effects: ["Cure Disease", "Resist Disease", "Paralyze", "Damage Health"] },
  { name: "Clouded Funnel Cap", effects: ["Restore Intelligence", "Fortify Intelligence", "Damage Endurance", "Damage Magicka"] },
  { name: "Columbine Root Pulp", effects: ["Restore Health", "Restore Luck", "Fortify Luck", "Cure Paralysis"] },
  { name: "Corn", effects: ["Restore Fatigue", "Restore Intelligence", "Damage Agility", "Lightning Shield"] },
  { name: "Crab Meat", effects: ["Restore Endurance", "Resist Shock", "Lightning Shield", "Damage Fatigue"] },
  { name: "Daedra Heart", effects: ["Restore Health", "Damage Magicka", "Silence", "Paralyze"] },
  { name: "Daedroth Teeth", effects: ["Night Eye", "Frost Shield", "Burden", "Chameleon"] },
  { name: "Dragon's Tongue", effects: ["Resist Fire", "Damage Health", "Fire Shield", "Spell Absorption"] },
  { name: "Ectoplasm", effects: ["Restore Magicka", "Detect Life", "Damage Luck", "Fortify Agility"] },
  { name: "Elf Cup Cap", effects: ["Cure Disease", "Resist Paralysis", "Frost Damage", "Fortify Intelligence"] },
  { name: "Emetic Russula Cap", effects: ["Restore Agility", "Shield", "Fortify Agility", "Silence"] },
  { name: "Fennel Seeds", effects: ["Restore Fatigue", "Damage Intelligence", "Damage Magicka", "Paralyze"] },
  { name: "Fire Salts", effects: ["Fire Damage", "Fire Shield", "Resist Frost", "Restore Magicka"] },
  { name: "Flax Seeds", effects: ["Restore Magicka", "Feather", "Shield", "Damage Health"] },
  { name: "Fly Amanita Cap", effects: ["Restore Health", "Fortify Strength", "Burden", "Paralyze"] },
  { name: "Foxglove Nectar", effects: ["Resist Poison", "Resist Paralysis", "Restore Luck", "Resist Disease"] },
  { name: "Frost Salts", effects: ["Frost Damage", "Frost Shield", "Resist Fire", "Silence"] },
  { name: "Garlic", effects: ["Resist Disease", "Damage Agility", "Frost Shield", "Fortify Strength"] },
  { name: "Ginkgo Leaf", effects: ["Restore Speed", "Fortify Magicka", "Damage Luck", "Shock Damage"] },
  { name: "Ginseng", effects: ["Damage Luck", "Cure Poison", "Burden", "Fortify Magicka"] },
  { name: "Grapes", effects: ["Restore Fatigue", "Water Walking", "Dispel", "Damage Health"] },
  { name: "Green Stain Cup Cap", effects: ["Restore Luck", "Fortify Luck", "Damage Health", "Invisibility"] },
  { name: "Green Stain Shelf Cap", effects: ["Restore Luck", "Fortify Luck", "Damage Fatigue", "Chameleon"] },
  { name: "Ham", effects: ["Restore Fatigue", "Restore Health", "Damage Magicka", "Damage Luck"] },
  { name: "Harrada", effects: ["Damage Health", "Damage Magicka", "Silence", "Paralyze"] },
  { name: "Imp Gall", effects: ["Cure Paralysis", "Damage Health", "Paralyze", "Silence"] },
  { name: "Iron Ore", effects: ["Burden", "Water Walking", "Shield", "Damage Agility"] },
  { name: "Lady's Mantle Leaves", effects: ["Restore Health", "Damage Endurance", "Night Eye", "Feather"] },
  { name: "Lady's Smock Leaves", effects: ["Restore Luck", "Cure Paralysis", "Paralyze", "Damage Fatigue"] },
  { name: "Lavender Sprig", effects: ["Restore Health", "Fortify Willpower", "Fortify Stamina", "Damage Luck"] },
  { name: "Leek", effects: ["Restore Fatigue", "Fortify Agility", "Damage Personality", "Damage Strength"] },
  { name: "Lettuce", effects: ["Restore Fatigue", "Restore Luck", "Fire Shield", "Damage Personality"] },
  { name: "Lumber", effects: ["Burden", "Shield", "Damage Speed", "Light"] },
  { name: "Mandrake Root", effects: ["Cure Disease", "Resist Disease", "Damage Health", "Fortify Willpower"] },
  { name: "Milk Thistle Seeds", effects: ["Light", "Frost Damage", "Cure Paralysis", "Paralyze"] },
  { name: "Minotaur Horn", effects: ["Restore Willpower", "Burden", "Fortify Endurance", "Lightning Shield"] },
  { name: "Monkshood Root Pulp", effects: ["Restore Strength", "Damage Intelligence", "Frost Damage", "Burden"] },
  { name: "Morning Glory Root Pulp", effects: ["Burden", "Damage Willpower", "Frost Shield", "Damage Magicka"] },
  { name: "Mort Flesh", effects: ["Damage Fatigue", "Damage Luck", "Fortify Health", "Silence"] },
  { name: "Motherwort Sprig", effects: ["Resist Poison", "Damage Fatigue", "Silence", "Invisibility"] },
  { name: "Mutton", effects: ["Restore Health", "Damage Fatigue", "Dispel", "Damage Magicka"] },
  { name: "Nightshade", effects: ["Damage Health", "Burden", "Damage Luck", "Fortify Magicka"] },
  { name: "Nirnroot", effects: ["Cure Disease", "Resist Magic", "Damage Health", "Invisibility"] },
  { name: "Ogre's Teeth", effects: ["Damage Intelligence", "Resist Paralysis", "Shock Damage", "Fortify Strength"] },
  { name: "Onion", effects: ["Restore Fatigue", "Water Breathing", "Detect Life", "Damage Health"] },
  { name: "Orange", effects: ["Restore Fatigue", "Detect Life", "Damage Health", "Lightning Shield"] },
  { name: "Painted Troll Fat", effects: ["Restore Health", "Resist Paralysis", "Damage Intelligence", "Chameleon"] },
  { name: "Peony Seeds", effects: ["Restore Health", "Damage Speed", "Damage Luck", "Light"] },
  { name: "Potato", effects: ["Restore Fatigue", "Shield", "Burden", "Frost Damage"] },
  { name: "Primrose Leaves", effects: ["Restore Intelligence", "Restore Luck", "Damage Endurance", "Spell Absorption"] },
  { name: "Pumpkin", effects: ["Restore Health", "Damage Agility", "Damage Endurance", "Water Walking"] },
  { name: "Radish", effects: ["Restore Health", "Shield", "Damage Endurance", "Light"] },
  { name: "Rat Meat", effects: ["Damage Health", "Detect Life", "Silence", "Chameleon"] },
  { name: "Redwort Flower", effects: ["Resist Disease", "Cure Disease", "Damage Fatigue", "Invisibility"] },
  { name: "Rice", effects: ["Restore Fatigue", "Shield", "Damage Strength", "Lightning Shield"] },
  { name: "Root Pulp", effects: ["Cure Poison", "Cure Disease", "Damage Health", "Silence"] },
  { name: "Sacred Lotus Seeds", effects: ["Resist Disease", "Dispel", "Cure Poison", "Damage Health"] },
  { name: "Scales", effects: ["Water Breathing", "Damage Health", "Burden", "Fortify Health"] },
  { name: "Scamp Skin", effects: ["Damage Magicka", "Resist Shock", "Reflect Damage", "Damage Health"] },
  { name: "Sheep Cheese", effects: ["Restore Fatigue", "Dispel", "Resist Fire", "Damage Speed"] },
  { name: "Sheperd's Pie", effects: ["Restore Health", "Cure Poison", "Damage Agility", "Fortify Agility"] },
  { name: "Skooma", effects: ["Damage Health", "Fortify Speed", "Fortify Strength", "Drain Intelligence"] },
  { name: "St. Jahn's Wort Nectar", effects: ["Restore Health", "Damage Stamina", "Silence", "Chameleon"] },
  { name: "Steel-Blue Entoloma Cap", effects: ["Restore Magicka", "Resist Fire", "Spell Absorption", "Damage Health"] },
  { name: "Strawberry", effects: ["Restore Health", "Cure Poison", "Damage Health", "Invisibility"] },
  { name: "Summer Bolete Cap", effects: ["Restore Stamina", "Damage Health", "Damage Stamina", "Silence"] },
  { name: "Sweetcake", effects: ["Restore Fatigue", "Damage Endurance", "Fortify Luck", "Damage Agility"] },
  { name: "Tiger Lily Nectar", effects: ["Restore Endurance", "Dispel", "Damage Endurance", "Water Walking"] },
  { name: "Tobacco", effects: ["Restore Fatigue", "Resist Disease", "Ravage Health", "Calm"] },
  { name: "Tomato", effects: ["Restore Fatigue", "Shield", "Burden", "Fire Damage"] },
  { name: "Troll Fat", effects: ["Damage Health", "Fortify Personality", "Damage Willpower", "Fire Shield"] },
  { name: "Unicorn Horn", effects: ["Restore Health", "Cure Disease", "Cure Poison", "Resist Poison"] },
  { name: "Vampire Dust", effects: ["Silence", "Resist Disease", "Frost Shield", "Invisibility"] },
  { name: "Venison", effects: ["Restore Health", "Feather", "Damage Health", "Chameleon"] },
  { name: "Void Salts", effects: ["Restore Magicka", "Dispel", "Damage Health", "Silence"] },
  { name: "Water Hyacinth Nectar", effects: ["Restore Stamina", "Damage Luck", "Damage Fatigue", "Spell Absorption"] },
  { name: "Wheat Grain", effects: ["Restore Fatigue", "Damage Magicka", "Fortify Health", "Damage Personality"] },
  { name: "White Seed Pod", effects: ["Restore Endurance", "Detect Life", "Damage Magicka", "Night Eye"] },
  { name: "Wisp Stalk Caps", effects: ["Damage Health", "Damage Willpower", "Chameleon", "Damage Intelligence"] },
  { name: "Wormwood Leaves", effects: ["Damage Magicka", "Invisibility", "Fortify Fatigue", "Damage Health"] }
];

const EQUIPMENT = {
  "Mortar & Pestle": [
    { name: "None", multiplier: 1.0 },
    { name: "Novice Mortar & Pestle", multiplier: 1.0 },
    { name: "Apprentice Mortar & Pestle", multiplier: 1.2 },
    { name: "Journeyman Mortar & Pestle", multiplier: 1.4 },
    { name: "Expert Mortar & Pestle", multiplier: 1.6 },
    { name: "Master Mortar & Pestle", multiplier: 2.0 }
  ],
  "Alembic": [
    { name: "None", multiplier: 1.0 },
    { name: "Novice Alembic", multiplier: 1.0 },
    { name: "Apprentice Alembic", multiplier: 1.2 },
    { name: "Journeyman Alembic", multiplier: 1.4 },
    { name: "Expert Alembic", multiplier: 1.6 },
    { name: "Master Alembic", multiplier: 2.0 }
  ],
  "Calcinator": [
    { name: "None", multiplier: 1.0 },
    { name: "Novice Calcinator", multiplier: 1.0 },
    { name: "Apprentice Calcinator", multiplier: 1.2 },
    { name: "Journeyman Calcinator", multiplier: 1.4 },
    { name: "Expert Calcinator", multiplier: 1.6 },
    { name: "Master Calcinator", multiplier: 2.0 }
  ],
  "Retort": [
    { name: "None", multiplier: 1.0 },
    { name: "Novice Retort", multiplier: 1.0 },
    { name: "Apprentice Retort", multiplier: 1.2 },
    { name: "Journeyman Retort", multiplier: 1.4 },
    { name: "Expert Retort", multiplier: 1.6 },
    { name: "Master Retort", multiplier: 2.0 }
  ]
};

export default function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [alchemyLevel, setAlchemyLevel] = useState(25);
  const [selectedEquipment, setSelectedEquipment] = useState({
    "Mortar & Pestle": EQUIPMENT["Mortar & Pestle"][0],
    "Alembic": EQUIPMENT["Alembic"][0],
    "Calcinator": EQUIPMENT["Calcinator"][0],
    "Retort": EQUIPMENT["Retort"][0]
  });
  const [sortBy, setSortBy] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleEquipmentChange = (category, equipment) => {
    setSelectedEquipment(prev => ({
      ...prev,
      [category]: equipment
    }));
  };

  const createPotion = (ingredients, equipmentMult, skillMult) => {
    // Find common effects
    const commonEffects = ingredients[0].effects.filter(effect =>
      ingredients.every(ingredient => ingredient.effects.includes(effect))
    );

    if (commonEffects.length === 0) {
      return { ingredients, effects: [], duration: 0, value: 0 };
    }

    const duration = Math.floor(30 * skillMult * equipmentMult);
    const baseValue = commonEffects.length * 10 * ingredients.length;
    const value = Math.floor(baseValue * skillMult * equipmentMult);

    return {
      ingredients,
      effects: commonEffects,
      duration,
      value
    };
  };

  const calculatePotions = useMemo(() => {
    if (selectedIngredients.length < 2) return [];

    const potions = [];
    const equipmentMultiplier = Object.values(selectedEquipment).reduce((acc, eq) => acc * eq.multiplier, 1);
    const skillMultiplier = 1 + (alchemyLevel / 100);

    // Generate all possible combinations of 2-4 ingredients
    for (let i = 0; i < selectedIngredients.length; i++) {
      for (let j = i + 1; j < selectedIngredients.length; j++) {
        const combination = [selectedIngredients[i], selectedIngredients[j]];
        
        // Check for 3-ingredient combinations
        for (let k = j + 1; k < selectedIngredients.length; k++) {
          const combo3 = [...combination, selectedIngredients[k]];
          
          // Check for 4-ingredient combinations
          for (let l = k + 1; l < selectedIngredients.length; l++) {
            const combo4 = [...combo3, selectedIngredients[l]];
            const potion4 = createPotion(combo4, equipmentMultiplier, skillMultiplier);
            if (potion4.effects.length > 0) potions.push(potion4);
          }
          
          const potion3 = createPotion(combo3, equipmentMultiplier, skillMultiplier);
          if (potion3.effects.length > 0) potions.push(potion3);
        }
        
        const potion2 = createPotion(combination, equipmentMultiplier, skillMultiplier);
        if (potion2.effects.length > 0) potions.push(potion2);
      }
    }

    // Filter potions based on search term
    const filteredPotions = potions.filter(potion => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      
      // Search in ingredients
      const ingredientMatch = potion.ingredients.some(ingredient => 
        ingredient.name.toLowerCase().includes(searchLower)
      );
      
      // Search in effects
      const effectMatch = potion.effects.some(effect => 
        effect.toLowerCase().includes(searchLower)
      );
      
      return ingredientMatch || effectMatch;
    });

    return filteredPotions.sort((a, b) => {
      if (sortOrder === 'asc') {
        return sortBy === 'value' ? a.value - b.value : 
               sortBy === 'effects' ? a.effects.length - b.effects.length :
               a.duration - b.duration;
      } else {
        return sortBy === 'value' ? b.value - a.value : 
               sortBy === 'effects' ? b.effects.length - a.effects.length :
               b.duration - a.duration;
      }
    });
  }, [selectedIngredients, alchemyLevel, selectedEquipment, sortBy, sortOrder, searchTerm]);

  const clearAll = () => {
    setSelectedIngredients([]);
    setSelectedEquipment({
      "Mortar & Pestle": EQUIPMENT["Mortar & Pestle"][0],
      "Alembic": EQUIPMENT["Alembic"][0],
      "Calcinator": EQUIPMENT["Calcinator"][0],
      "Retort": EQUIPMENT["Retort"][0]
    });
    setAlchemyLevel(25);
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1 className="app-title-main">OBLIVION</h1>
        <h2 className="app-title-sub">ALCHEMY CALCULATOR</h2>
        <p>Calculate potions based on your ingredients, skill level, and equipment</p>
      </header>

      <div className="app-content">
        <section className="character-section">
          <h2>Character Setup</h2>
          <div className="character-controls">
            <div className="alchemy-level">
              <label htmlFor="alchemy-level">Alchemy Level: {alchemyLevel}</label>
              <input
                id="alchemy-level"
                type="range"
                min="5"
                max="100"
                value={alchemyLevel}
                onChange={(e) => setAlchemyLevel(parseInt(e.target.value))}
              />
            </div>
          </div>
        </section>

        <section className="equipment-section">
          <h2>Equipment</h2>
          <div className="equipment-dropdowns">
            {Object.entries(EQUIPMENT).map(([category, items]) => (
              <div key={category} className="equipment-dropdown">
                <label htmlFor={category}>{category}:</label>
                <select
                  id={category}
                  value={selectedEquipment[category].name}
                  onChange={(e) => {
                    const selected = items.find(item => item.name === e.target.value);
                    handleEquipmentChange(category, selected);
                  }}
                  className="equipment-select"
                >
                  {items.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} ({item.multiplier}x)
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className="ingredients-section">
          <h2>Ingredients ({selectedIngredients.length} selected)</h2>
          <div className="ingredients-grid">
            {INGREDIENTS.map((ingredient) => (
              <div
                key={ingredient.name}
                className="ingredient-item"
                onClick={() => toggleIngredient(ingredient)}
                title={ingredient.effects.join(', ')}
              >
                <input
                  type="checkbox"
                  className="ingredient-checkbox"
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => toggleIngredient(ingredient)}
                />
                <label className="ingredient-label">
                  {ingredient.name}
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="results-section">
          <div className="results-header">
            <h2>Craftable Potions ({calculatePotions.length})</h2>
            <div className="results-controls">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search ingredients or effects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="sort-controls">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="value">Value</option>
                  <option value="effects">Effects</option>
                  <option value="duration">Duration</option>
                </select>
                <button 
                  className="sort-order"
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="potions-list">
            {calculatePotions.map((potion, index) => (
              <div key={index} className="potion-item">
                <div className="potion-left">
                  <h4>Ingredients:</h4>
                  <div className="potion-ingredients-list">
                    {potion.ingredients.map((ingredient, idx) => (
                      <div key={idx} className="potion-ingredient-item">
                        <input
                          type="checkbox"
                          className="potion-ingredient-checkbox"
                          checked={selectedIngredients.includes(ingredient)}
                          onChange={() => toggleIngredient(ingredient)}
                        />
                        <label className="potion-ingredient-label">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="potion-right">
                  <div className="potion-effects">
                    <strong>Effects:</strong> {potion.effects.join(', ')}
                  </div>
                  <div className="potion-stats">
                    <div className="potion-stat">
                      <strong>Value:</strong> {potion.value} gold
                    </div>
                    <div className="potion-stat">
                      <strong>Duration:</strong> {potion.duration}s
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
