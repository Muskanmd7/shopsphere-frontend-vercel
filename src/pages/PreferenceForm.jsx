import React, { useState } from "react";
import { savePreferences,getPreferences } from "../services/preferenceService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const GENDER_OPTIONS = ["Female", "Male", "Non-binary", "Prefer not to say"];
const SKIN_TYPE_OPTIONS = ["Oily", "Dry", "Combination", "Normal", "Sensitive"];
const UNDERTONE_OPTIONS = ["Warm", "Cool", "Neutral"];
const HAIR_TYPE_OPTIONS = ["Straight", "Wavy", "Curly", "Coily"];
const BODY_TYPE_OPTIONS = ["Pear", "Apple", "Hourglass", "Rectangle", "Inverted Triangle"];
const PREFERRED_STYLE_OPTIONS = ["Classic", "Boho", "Minimalist", "Edgy", "Romantic", "Streetwear", "Glam"];
const PREFERRED_FIT_OPTIONS = ["Slim Fit", "Regular Fit", "Relaxed Fit", "Oversized"];
const CLOTHING_SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const FAVORITE_CATEGORY_OPTIONS = ["Dresses", "Tops", "Bottoms", "Outerwear", "Activewear", "Loungewear", "Accessories"];
const BUDGET_OPTIONS = ["Budget-Friendly", "Mid-Range", "Premium", "Luxury"];
const OCCASION_OPTIONS = ["Everyday", "Work", "Party", "Wedding", "Vacation", "Festive"];
const SKIN_CONCERN_OPTIONS = [
  "Acne",
  "Dark Spots",
  "Pigmentation",
  "Dryness",
  "Sensitive Skin",
  "Wrinkles",
  "Dullness",
];

const baseFieldClasses =
  "w-full rounded-2xl border border-pink-100 bg-white/70 px-4 py-3 text-sm text-stone-700 placeholder-stone-400 shadow-sm backdrop-blur-md transition-all duration-300 focus:border-pink-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100";

function FieldLabel({ children, required }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">
      {children}
      {required && <span className="ml-1 text-pink-400">*</span>}
    </label>
  );
}

function TextInput({ label, required, ...props }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input className={baseFieldClasses} {...props} />
    </div>
  );
}

function SelectInput({ label, required, options, ...props }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <select className={`${baseFieldClasses} appearance-none`} {...props}>
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PreferenceForm() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bustSize, setBustSize] = useState("");
  const [waistSize, setWaistSize] = useState("");
  const [hipSize, setHipSize] = useState("");
  const [skinType, setSkinType] = useState("");
  const [skinConcern, setSkinConcern] = useState([]);
  const [undertone, setUndertone] = useState("");
  const [hairType, setHairType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [preferredFit, setPreferredFit] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [clothingSize, setClothingSize] = useState("");
  const [favoriteCategory, setFavoriteCategory] = useState("");
  const [favoriteBrand, setFavoriteBrand] = useState("");
  const [budget, setBudget] = useState("");
  const [occasion, setOccasion] = useState("");
  const [preferredStyle, setPreferredStyle] = useState("");

  const toggleSkinConcern = (concern) => {
    setSkinConcern((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };
  useEffect(()=>{
    loadPreferences();
  },[]);
  const loadPreferences = async () => {
    console.log("load called");
    try {
        const response = await getPreferences();
        const data = response.data;

        setGender(data.gender || "");
        setAge(data.age || "");
        setHeight(data.height || "");
        setWeight(data.weight || "");
        setBustSize(data.bustSize || "");
        setWaistSize(data.waistSize || "");
        setHipSize(data.hipSize || "");
        setSkinType(data.skinType || "");
        setSkinConcern(data.skinConcern ? data.skinConcern.split(", ") : []);
        setUndertone(data.undertone || "");
        setHairType(data.hairType || "");
        setBodyType(data.bodyType || "");
        setPreferredFit(data.preferredFit || "");
        setFavoriteColor(data.favoriteColor || "");
        setClothingSize(data.clothingSize || "");
        setFavoriteCategory(data.favoriteCategory || "");
        setFavoriteBrand(data.favoriteBrand || "");
        setBudget(data.budget || "");
        setOccasion(data.occasion || "");
        setPreferredStyle(data.preferredStyle || "");

    } catch (error) {
         console.log("status:",error.response?.status);
         console.log("data:",response?.data);
         console.log(error);
    }
};

  const handleSave = async () => {
    const preferences = {
      gender,
      age,
      height,
      weight,
      bustSize,
      waistSize,
      hipSize,
      skinType,
      skinConcern:skinConcern.join(", "),
      undertone,
      hairType,
      bodyType,
      preferredFit,
      favoriteColor,
      clothingSize,
      favoriteCategory,
      favoriteBrand,
      budget,
      occasion,
      preferredStyle,
    };

    try {
        console.log(preferences);
      await savePreferences(preferences);
      alert("Preferences saved successfully!");
      navigate("/");
    } catch (error) {
     console.log(error.response);
     console.log(error.response?.data);
     console.log(error.response?.status);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-800 sm:text-4xl">
            ✨ Discover Your Match
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone-500 sm:text-base">
            Tell us a little about yourself so ShopSphere AI can personalize every
            recommendation.
          </p>
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/60 px-4 py-2 text-xs text-stone-500 shadow-sm backdrop-blur-md">
            <span>🔒</span>
            <span>
              Your information is private and is only used to personalize your shopping
              experience.
            </span>
          </div>
        </div>

        {/* Required Section */}
        <div className="rounded-3xl border border-white/60 bg-white/50 p-6 shadow-xl shadow-pink-100/50 backdrop-blur-xl sm:p-8">
          <h2 className="mb-1 font-serif text-xl font-semibold text-stone-800">
            About You
          </h2>
          <p className="mb-6 text-sm text-stone-500">
            These details help us tailor your style profile.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <SelectInput
              label="Gender"
              required
              options={GENDER_OPTIONS}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <TextInput
              label="Age"
              required
              type="number"
              min="0"
              placeholder="e.g. 22"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextInput
              label="Height"
              required
              placeholder="e.g. 165 cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <TextInput
              label="Weight"
              required
              placeholder="e.g. 58 kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <SelectInput
              label="Skin Type"
              required
              options={SKIN_TYPE_OPTIONS}
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
            />
            <SelectInput
              label="Undertone"
              required
              options={UNDERTONE_OPTIONS}
              value={undertone}
              onChange={(e) => setUndertone(e.target.value)}
            />
            <SelectInput
              label="Hair Type"
              required
              options={HAIR_TYPE_OPTIONS}
              value={hairType}
              onChange={(e) => setHairType(e.target.value)}
            />
            <SelectInput
              label="Body Type"
              required
              options={BODY_TYPE_OPTIONS}
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
            />
            <SelectInput
              label="Preferred Style"
              required
              options={PREFERRED_STYLE_OPTIONS}
              value={preferredStyle}
              onChange={(e) => setPreferredStyle(e.target.value)}
            />
          </div>
        </div>

        {/* Optional Section */}
        <div className="mt-8 rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl shadow-purple-100/40 backdrop-blur-xl sm:p-8">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <h2 className="font-serif text-xl font-semibold text-stone-800">
              Optional Personal Details
            </h2>
          </div>
          <p className="mb-6 text-sm text-stone-500">
            Sharing these helps improve recommendations but is completely optional.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextInput
              label="Bust Size"
              placeholder="e.g. 34B"
              value={bustSize}
              onChange={(e) => setBustSize(e.target.value)}
            />
            <TextInput
              label="Waist Size"
              placeholder="e.g. 28 in"
              value={waistSize}
              onChange={(e) => setWaistSize(e.target.value)}
            />
            <TextInput
              label="Hip Size"
              placeholder="e.g. 38 in"
              value={hipSize}
              onChange={(e) => setHipSize(e.target.value)}
            />
            <SelectInput
              label="Preferred Fit"
              options={PREFERRED_FIT_OPTIONS}
              value={preferredFit}
              onChange={(e) => setPreferredFit(e.target.value)}
            />
            <TextInput
              label="Favorite Color"
              placeholder="e.g. Blush Pink"
              value={favoriteColor}
              onChange={(e) => setFavoriteColor(e.target.value)}
            />
            <SelectInput
              label="Clothing Size"
              options={CLOTHING_SIZE_OPTIONS}
              value={clothingSize}
              onChange={(e) => setClothingSize(e.target.value)}
            />
            <SelectInput
              label="Favorite Category"
              options={FAVORITE_CATEGORY_OPTIONS}
              value={favoriteCategory}
              onChange={(e) => setFavoriteCategory(e.target.value)}
            />
            <TextInput
              label="Favorite Brand"
              placeholder="e.g. Zara"
              value={favoriteBrand}
              onChange={(e) => setFavoriteBrand(e.target.value)}
            />
            <SelectInput
              label="Budget"
              options={BUDGET_OPTIONS}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <SelectInput
              label="Occasion"
              options={OCCASION_OPTIONS}
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            />
          </div>

          {/* Skin Concern Chips */}
          <div className="mt-6">
            <FieldLabel>Skin Concern</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {SKIN_CONCERN_OPTIONS.map((concern) => {
                const selected = skinConcern.includes(concern);
                return (
                  <button
                    key={concern}
                    type="button"
                    onClick={() => toggleSkinConcern(concern)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                      selected
                        ? "border-pink-300 bg-gradient-to-r from-pink-200 to-purple-200 text-stone-800 shadow-md"
                        : "border-pink-100 bg-white/70 text-stone-500 hover:border-pink-200 hover:bg-pink-50"
                    }`}
                  >
                    {selected ? "✓ " : ""}
                    {concern}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleSave}
            className="w-full max-w-md rounded-full bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 px-8 py-4 text-base font-semibold tracking-wide text-white shadow-lg shadow-purple-200/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-300/60 active:scale-[0.98] sm:text-lg"
          >
            ✨ Save My Preferences
          </button>
        </div>
      </div>
    </div>
  );
}